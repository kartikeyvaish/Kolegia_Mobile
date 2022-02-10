// Packages Imports
import { useEffect, useLayoutEffect, useReducer, useRef } from "react";
import { View, FlatList, Keyboard } from "react-native";
import { connect } from "react-redux";

// Component Imports
import AppLoading from "../../components/AppLoading";
import ChatsAPI from "../../api/ChatsAPI";
import ChatHeader from "../../components/ChatHeader";
import ChatKeyboard from "../../components/ChatKeyboard";
import Helper from "../../utils/Helper";
import MessageCard from "../../components/MessageCard";
import ScreenNames from "../../navigation/ScreenNames";
import SelectFileModal from "../../components/SelectFileModal";
import ToastMessages from "../../constants/Messages";
import ViewFileModal from "../../components/ViewFileModal";

// custom hooks imports
import useCamera from "../../hooks/useCamera";
import useDocumentPicker from "./../../hooks/useDocumentPicker";
import useFileViewer from "./../../hooks/useFileViewer";
import useLoading from "./../../hooks/useLoading";
import useSocket from "../../hooks/useSocket";

// useReducers imports
import chatRoomReducer, {
  chatRoomInitialState,
} from "../../store/chatRoom/reducer";
import ChatRoomActionCreators from "../../store/chatRoom/actions";

// function component for ChatRoomScreen
function ChatRoomScreen({ navigation, route, User }) {
  // Local States and Contexts
  const { Loading, SetLoading } = useLoading({ initialValue: false });

  // Route Parameters
  const chatting_with = route.params?.chatting_with;
  const room_id = route?.params?._id;
  const owner_id = User?._id;
  const reciever_id = chatting_with?._id;
  const receiver_name = chatting_with?.name;
  const reciever_profile_picture = chatting_with?.profile_picture;
  const reciever_phone = chatting_with?.phone;

  // Local Refs
  const FLatListRef = useRef<FlatList>(null);
  const Skip = useRef(0);

  // reducer and dispatcher for the chat room_id
  const [state, dispatch] = useReducer(chatRoomReducer, chatRoomInitialState);

  // Custom Hooks
  const { PickDocument, selectedFile, unselectFile, setSelectedFile } =
    useDocumentPicker({});
  const { viewing_file, view_file, stop_viewing } = useFileViewer();
  const { Capture } = useCamera({ onCapture: setSelectedFile });

  // Initial useEffect call
  useEffect(() => {
    InitialCall();
  }, []);

  // Initialize Socket
  const { SendToSocket } = useSocket({
    message: state.message,
    onMessageArrive: (data) => AddToChatThread(data),
    onTypeEnd: () => dispatch(ChatRoomActionCreators.SetTyping(false)),
    onTypeStart: () => dispatch(ChatRoomActionCreators.SetTyping(true)),
    onUsersCountUpdate: (count) => OtherUserEntered(count),
    owner_id,
    room_id,
  });

  // Changes in chat_thread
  useEffect(() => {
    Skip.current = state.chat_thread.length;
  }, [state.chat_thread]);

  // useLayoutEffect to update the user details in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      header: ({ navigation }) => (
        <ChatHeader
          subtitle={
            state.online_users > 1
              ? state.is_user_typing
                ? "Typing..."
                : "Online"
              : null
          }
          online={state.online_users > 1}
          imageUri={reciever_profile_picture}
          name={receiver_name}
          phone={reciever_phone}
          onBackPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation, state.online_users, state.is_user_typing, owner_id]);

  // initial call
  const InitialCall = async () => {
    try {
      SetLoading(true);
      await GetMessages();
      await MarkAsReadAPI();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // API call to get the chat thread
  const GetMessages = async () => {
    try {
      const apiResponse = await ChatsAPI.GetMessages(
        {
          room_id: room_id,
          skip: Skip.current,
        },
        User?.auth_token
      );

      if (apiResponse.ok) {
        if (apiResponse.data.messages.length) {
          let payload = [...state.chat_thread, ...apiResponse.data.messages];
          dispatch(ChatRoomActionCreators.SetChatThread(payload));
        }
      }
    } catch (error) {}
  };

  // API to call when current user joins the room_id
  const MarkAsReadAPI = async () => {
    try {
      await ChatsAPI.MarkAsRead(room_id, User?.auth_token);
      // MarkChatAsRead(room_id, owner_id);
    } catch (error) {}
  };

  // Add an item to the CHatThread array
  const AddToChatThread = (data) => {
    dispatch(ChatRoomActionCreators.SetMessage(""));
    dispatch(ChatRoomActionCreators.UpdateChatThread(data));
  };

  // When other user enters, mark all your send messages as true
  const OtherUserEntered = (count) => {
    try {
      dispatch(ChatRoomActionCreators.SetUsersCount(count));
      if (count > 1)
        dispatch(ChatRoomActionCreators.MarkMessageAsRead(owner_id));
    } catch (error) {}
  };

  // Send Message
  const SendMessage = async () => {
    // generate a unique id for the message
    const temp_id = Helper.GenerateUniqueID();

    try {
      // Dimsiss the keyboard and bring the Flatlist to the bottom
      Keyboard.dismiss();
      FLatListRef.current.scrollToOffset({ animated: false, offset: 0 });

      // get the current message and trim it.
      let message = state.message.trim();
      let newDateTime = new Date().toString();

      // if message is empty, return
      if (message.length === 0) return;

      // prepare the socket payload
      let socket_payload = {
        room_id: room_id,
        message: message,
        message_type: "text",
        sender_id: owner_id,
        reciever_id: reciever_id,
        delivered: false,
        read: state.online_users > 1 ? true : false,
        _id: temp_id,
        message_datetime: newDateTime,
      };

      // prepare the api payload
      const api_payload: any = new FormData();
      api_payload.append("room_id", room_id);
      api_payload.append("message", message);
      api_payload.append("read", state.online_users > 1 ? true : false);
      api_payload.append("message_datetime", newDateTime);

      // add the message to chat Thread
      AddToChatThread(socket_payload);

      // Call API
      const response = await ChatsAPI.SendMessage(api_payload, User.auth_token);

      // if response is ok, send the message to the socket
      // otherwise delete the message from chat thread
      if (response.ok) {
        SendToSocket(response.data.newMessage);
        dispatch(
          ChatRoomActionCreators.UpdateMessageItem(temp_id, {
            delivered: true,
            ...response.data.newMessage,
          })
        );
      } else {
        dispatch(ChatRoomActionCreators.RemoveMessageItem(temp_id));
        Helper.ShowToast(response.data.message);
      }
    } catch (error) {
      // Show Toast in case of error
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      dispatch(ChatRoomActionCreators.RemoveMessageItem(temp_id));
    }
  };

  // Send File
  const SendFileMessage = async () => {
    try {
      Keyboard.dismiss();
      let newDateTime = new Date().toString();

      const api_payload: any = new FormData();
      api_payload.append("room_id", room_id);
      api_payload.append("message", state.message);
      let file_payload: any = {
        uri: selectedFile.uri,
        type: selectedFile.mimeType,
        name: selectedFile.name,
      };
      api_payload.append("file", file_payload);
      api_payload.append("read", state.online_users > 1 ? true : false);
      api_payload.append("message_datetime", newDateTime);

      dispatch(ChatRoomActionCreators.SetSendLoading(true));
      const response = await ChatsAPI.SendMessage(api_payload, User.auth_token);
      dispatch(ChatRoomActionCreators.SetSendLoading(false));

      if (response.ok) {
        SendToSocket(response.data.newMessage);
        AddToChatThread(response.data.newMessage);
        unselectFile();
      } else {
        Helper.ShowToast(response.data.message);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      dispatch(ChatRoomActionCreators.SetSendLoading(false));
    }
  };

  // Render Item Function
  const renderItem = ({ item, index }: any) => (
    <MessageCard
      {...item}
      upper_date={Helper.get_top_date(
        item.message_datetime,
        index + 1 === state.chat_thread.length
          ? null
          : state.chat_thread[index + 1].message_datetime
      )}
      onMessagePress={() =>
        item.message_type === "file"
          ? item.message_file.mimeType.slice(0, 5) === "video"
            ? navigation.navigate(ScreenNames.VideoPlayerScreen, {
                ...item.message_file,
                headerTitle:
                  item?.sender_id === owner_id ? "You" : receiver_name,
              })
            : view_file({
                ...item.message_file,
                sender_id: item.sender_id,
                message: item.message,
              })
          : null
      }
    />
  );

  // render
  return (
    <View style={{ flex: 1 }}>
      {!Loading ? (
        <FlatList
          data={state.chat_thread}
          ref={FLatListRef}
          onEndReachedThreshold={0.5}
          onEndReached={GetMessages}
          inverted
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <AppLoading loadingText="Getting Messages..." />
      )}

      <ChatKeyboard
        value={state.message}
        loading={state.send_loading}
        onChangeText={(text) =>
          dispatch(ChatRoomActionCreators.SetMessage(text))
        }
        onSubmit={() => SendMessage()}
        onPickPress={PickDocument}
        onCameraPress={Capture}
      />

      <ViewFileModal
        isVisible={viewing_file !== null}
        mimeType={viewing_file?.mimeType}
        onBackButtonPress={stop_viewing}
        onDismiss={stop_viewing}
        uri={viewing_file?.uri}
        message={viewing_file?.message}
        headerTitle={
          viewing_file?.sender_id === owner_id ? "You" : receiver_name
        }
      />

      <SelectFileModal
        placeholder="Type a Message.."
        isVisible={selectedFile !== null}
        mimeType={selectedFile?.mimeType}
        onBackButtonPress={unselectFile}
        onChangeText={(text) =>
          dispatch(ChatRoomActionCreators.SetMessage(text))
        }
        onSubmit={() => SendFileMessage()}
        loading={state.send_loading}
        onDismiss={unselectFile}
        value={state.message}
        uri={selectedFile?.uri}
        message={selectedFile?.message}
        showKeyboard={viewing_file ? false : true}
        isHeaderVisible={viewing_file ? false : true}
      />
    </View>
  );
}

// Map State to Props
const mapStateToProps = (state: any) => ({
  User: state.AuthState.User,
});

// Connect and Export
export default connect(mapStateToProps)(ChatRoomScreen);
