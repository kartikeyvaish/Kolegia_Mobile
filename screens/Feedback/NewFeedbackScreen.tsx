// Packages Imports
import { useContext, useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";

// local components imports
import AppButton from "./../../components/AppButton";
import AppTextInput from "./../../components/AppTextInput";
import Helper from "../../utils/Helper";
import FeedBackAPI from "../../api/Feedback";
import GlobalContext from "./../../contexts/GlobalContext";
import ToastMessages from "./../../constants/Messages";

// function component for NewFeedbackScreen
function NewFeedbackScreen({ navigation }: any) {
  // local states
  const [feedback, Setfeedback] = useState("");
  const [Loading, SetLoading] = useState(false);

  // User
  const { User } = useContext(GlobalContext);

  // api call to create new feedback
  const PostFeedBack = async () => {
    try {
      Keyboard.dismiss();

      const wordCount = feedback.split(" ").length;

      if (wordCount < 2 || wordCount > 200) {
        Helper.ShowToast("Feedback must be between 2 and 200 words");
        return;
      }

      SetLoading(true);

      const apiResponse = await FeedBackAPI.PostFeedback(
        {
          feedback: feedback,
        },
        User.auth_token
      );

      SetLoading(false);
      Helper.ShowToast(apiResponse.data.message);

      if (apiResponse.ok) navigation.goBack();
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  // render
  return (
    <View style={styles.container}>
      <AppTextInput
        mode="outlined"
        multiline={true}
        placeholder="Write a feedback in less than 200 words."
        textInputStyle={{
          minHeight: 100,
          maxHeight: 200,
        }}
        onChangeText={Setfeedback}
        mandatory={true}
        label="Feedback"
      />

      <AppButton title="Submit Feedback" onPress={PostFeedBack} loading={Loading} />
    </View>
  );
}

// exports
export default NewFeedbackScreen;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
});
