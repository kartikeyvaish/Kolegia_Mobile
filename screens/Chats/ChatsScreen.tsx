// Packages Imports
import { useContext, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useDispatch } from "react-redux";

// components imports
import AppLoading from "./../../components/AppLoading";
import ChatsAPI from "../../api/ChatsAPI";
import ChatsCard from "../../components/ChatsCard";
import GlobalActionCreators from "./../../store/global/actions";
import GlobalContext from "./../../contexts/GlobalContext";
import Helper from "./../../utils/Helper";
import ToastMessages from "./../../constants/Messages";
import ScreenNames from "../../navigation/ScreenNames";

// function component for chats screen
function ChatsScreen({ navigation }) {
  // Contexts
  const { User } = useContext(GlobalContext);

  // Local States
  const [Loading, SetLoading] = useState(true);
  const [Refreshing, SetRefreshing] = useState(false);
  const [Chats, SetChats] = useState([]);

  // Dispatcher to update store
  const dispatch = useDispatch();

  // useEffect to get chats
  useEffect(() => {
    InitialCall();
  }, []);

  // Initial call to get chats
  const InitialCall = async () => {
    try {
      SetLoading(true);
      await GetChats();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  //  API call to get chats
  const GetChats = async () => {
    try {
      const apiResponse = await ChatsAPI.GetChats(User?.auth_token);

      if (apiResponse.ok) {
        if (apiResponse.data.Chats.length > 0) {
          SetChats(apiResponse.data.Chats);

          // Count number of chats whose last message is not read
          const UnreadMessagesCount = apiResponse.data.Chats.reduce(
            (acc, chat) => {
              if (
                chat.last_message.reciever_id === User?._id &&
                chat.last_message.read === false
              )
                acc++;
              return acc;
            },
            0
          );

          dispatch(GlobalActionCreators.UpdateUnreadCount(UnreadMessagesCount));
        }
      } else Helper.ShowToast(apiResponse.data.message);
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // function to call onRefresh
  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetChats();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // function to renderItem
  const renderItem = (chat: any) => (
    <ChatsCard
      key={chat._id}
      {...chat}
      current_user={User}
      onPress={() => navigation.navigate(ScreenNames.ChatRoomScreen, chat)}
    />
  );

  // render
  return (
    <ScrollView
      style={{ flex: 1, flexGrow: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      refreshControl={
        <RefreshControl refreshing={Refreshing} onRefresh={onRefresh} />
      }
    >
      {Loading && Chats?.length === 0 ? (
        <AppLoading loadingText="Getting Chats.." />
      ) : (
        Chats?.map(renderItem)
      )}
    </ScrollView>
  );
}

// Exports
export default ChatsScreen;
