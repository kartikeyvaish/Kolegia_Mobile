// Packages Imports
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useStore } from "react-redux";

// Local Components/Types imports
import AppLoading from "./../../components/AppLoading";
import AppText from "./../../components/AppText";
import FontNames from "./../../constants/FontNames";
import GlobalActionCreators from "./../../store/global/actions";
import Helper from "./../../utils/Helper";
import RaisedHandAPI from "./../../api/RaisedHands";
import RaisedHandsCard from "./../../components/RaisedHandsCard";
import ScreenNames from "../../navigation/ScreenNames";
import ToastMessages from "./../../constants/Messages";

// function component for MyResponsesScreen
function MyResponsesScreen({ navigation }) {
  // Store
  const { AuthState } = useStore().getState();
  const User = AuthState?.User || null;

  // Get the Dispatch function
  const dispatch = useDispatch();

  // Local States
  const [Responses, SetResponses] = useState([]);

  // Navigation Listener
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      GetResponses();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // API call to get list of responses
  const GetResponses = async () => {
    try {
      const response = await RaisedHandAPI.GetRaisedHands(User?.auth_token);
      if (response.ok) {
        SetResponses(response.data.raised_hands);
        dispatch(
          GlobalActionCreators.UpdateRaisedHandsCount(
            response.data.raised_hands.length
          )
        );
      } else {
        Helper.ShowToast(response.data.message);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // Delete Responses from the list
  const DeleteResponse = (_id: any) => {
    try {
      let responses = [...Responses];
      responses = responses.filter((response) => response._id !== _id);
      SetResponses(responses);

      dispatch(GlobalActionCreators.UpdateRaisedHandsCount(responses.length));
    } catch (error) {}
  };

  // Delete and Navigate
  const DeleteAndNavigate = async (data) => {
    try {
      DeleteResponse(data.item_id);
      navigation.navigate(ScreenNames.ChatRoomScreen, {
        _id: data.room_id,
        chatting_with: data.chatting_with,
      });
    } catch (error) {}
  };

  // Render
  return (
    <ScrollView
      style={{ flex: 1, flexGrow: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <AppText
        text="Responses"
        size={25}
        family={FontNames.Inter_Bold}
        marginLeft={20}
      />

      {!Responses.length ? (
        <AppLoading loadingText="No Responses as of now" loading={false} />
      ) : (
        Responses.map((item) => (
          <RaisedHandsCard
            {...item}
            key={item._id}
            onDeletePress={DeleteResponse}
            auth_token={User?.auth_token}
            onNavigatePress={DeleteAndNavigate}
          />
        ))
      )}
    </ScrollView>
  );
}

// exports
export default MyResponsesScreen;
