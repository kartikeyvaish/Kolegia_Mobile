// Packages Imports
import { useEffect, useLayoutEffect, useReducer, useRef } from "react";
import { View, FlatList, Keyboard } from "react-native";
import { connect } from "react-redux";

// Component Imports
import AppLoading from "../../components/AppLoading";
import ChatsAPI from "../../api/ChatsAPI";
import ChatHeader from "../../components/ChatHeader";
import ChatKeyboard from "../../components/ChatKeyboard";
import FileModal from "../../components/FileModal";
import Helper from "../../utils/Helper";
import MessageCard from "../../components/MessageCard";
import ToastMessages from "../../constants/Messages";
import useDocumentPicker from "./../../hooks/useDocumentPicker";
import useLoading from "./../../hooks/useLoading";
import useSocket from "../../hooks/useSocket";

// useReducers imports
import chatRoomReducer, {
  chatRoomInitialState,
} from "../../store/chatRoom/reducer";
import ChatRoomActionCreators from "../../store/chatRoom/actions";
import useBackHandler from "./../../hooks/useBackHandler";

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
    useDocumentPicker();

  // Back Button Handler
  useBackHandler(() => {
    navigation.popToTop();
    return true;
  });

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

    if (state.chat_thread.length > 0) {
      // Update the last message in redux store
    }
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
          onBackPress={() => navigation.popToTop()}
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
        message_datetime: Date.now(),
      };

      // prepare the api payload
      const api_payload: any = new FormData();
      api_payload.append("room_id", room_id);
      api_payload.append("message", message);
      api_payload.append("read", state.online_users > 1 ? true : false);

      // add the message to chat Thread
      AddToChatThread(socket_payload);

      // Call API
      const response = await ChatsAPI.SendMessage(api_payload, User.auth_token);

      // if response is ok, send the message to the socket
      // otherwise delete the message from chat thread
      if (response.ok) {
        SendToSocket(response.data.newMessage);
        dispatch(
          ChatRoomActionCreators.UpdateMessageItem(
            temp_id,
            response.data.newMessage
          )
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
  const renderItem = ({ item }: any) => (
    <MessageCard
      {...item}
      upper_date={null}
      onMessagePress={() =>
        item.message_type === "file" ? setSelectedFile(item.message_file) : null
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
      />

      <FileModal
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
        showKeyboard={true}
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
