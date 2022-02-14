// Packages Imports
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

// Local components imports
import AppContainer from "./../../components/AppContainer";
import AppLoading from "./../../components/AppLoading";
import ColorPallete from "../../utils/ColorPallete";
import FeedBackAPI from "../../api/Feedback";
import FeedbackCard from "../../components/FeedbackCard";
import GlobalContext from "./../../contexts/GlobalContext";
import Helper from "../../utils/Helper";
import IconNames from "../../constants/IconNames";
import RoundIconButton from "./../../components/RoundIconButton";
import ScreenNames from "../../navigation/ScreenNames";
import ToastMessages from "./../../constants/Messages";

// function component for FeedbackScreen
function FeedbackScreen({ navigation }: any) {
  // Local States
  const [Loading, SetLoading] = useState(false);
  const [Refreshing, SetRefreshing] = useState(false);
  const [FeedBacks, SetFeedBacks] = useState([]);

  // User
  const { User } = useContext(GlobalContext);

  // useEffect to call intial API
  useEffect(() => {
    InitialCall();
  }, []);

  // get all feedbacks initial call
  const InitialCall = async () => {
    try {
      SetLoading(true);
      await GetAllFeedBacks();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // get all feedbacks
  const GetAllFeedBacks = async () => {
    try {
      const apiResponse = await FeedBackAPI.GetFeedbacks();

      if (apiResponse.ok) {
        SetFeedBacks(apiResponse.data.feedbacks);
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // Function to call onRefresh
  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetAllFeedBacks();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // Render
  return Loading ? (
    <AppLoading loadingText="Getting Feedbacks..." />
  ) : (
    <AppContainer>
      <FlatList
        data={FeedBacks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <FeedbackCard {...item} />}
        refreshing={Refreshing}
        onRefresh={onRefresh}
      />

      <RoundIconButton
        family={IconNames.AntDesign}
        name="plus"
        size={40}
        color={ColorPallete.white}
        style={styles.addButton}
        onPress={() =>
          navigation.replace(User ? ScreenNames.NewFeedbackScreen : ScreenNames.IntroductionScreen)
        }
      />
    </AppContainer>
  );
}

// exports
export default FeedbackScreen;

// styles
const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 40,
    right: 40,
    elevation: 10,
  },
});
