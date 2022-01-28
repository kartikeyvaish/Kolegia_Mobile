// Packages Imports
import { StyleSheet, View } from "react-native";

// Local components Imports and Types
import AppText from "../../components/AppText";
import AppForm from "./../../components/AppForm";
import AppFormField from "./../../components/AppFormField";
import AppSubmitButton from "./../../components/AppSubmitButton";
import ColorPallete from "../../utils/ColorPallete";
import EmailSignUpSchema from "./../../schema/EmailSignUp";
import IconNames from "../../constants/IconNames";
import RoundIconButton from "./../../components/RoundIconButton";
import ScreenNames from "../../navigation/ScreenNames";
import useLoading from "../../hooks/useLoading";
import Helper from "./../../utils/Helper";
import ToastMessages from "./../../constants/Messages";
import AuthAPI from "./../../api/AuthAPI";

// Constants
const InitialValues = EmailSignUpSchema.EmailSignUpInitialValues;
const ValidationSchema = EmailSignUpSchema.EmailSignUpValidationSchema();

// function component for EmailSignUpScreen
function EmailSignUpScreen({ navigation }) {
  // Local States
  const { Loading, SetLoading } = useLoading({ initialValue: false });

  // CheckEmailProceed
  const CheckEmailProceed = async (values) => {
    try {
      SetLoading(true);

      const apiResponse = await AuthAPI.SendEmailVerifyOTP({
        email: values.email,
      });

      SetLoading(false);

      if (apiResponse.ok) {
        navigation.replace(ScreenNames.EmailOTPScreen, {
          otp_id: apiResponse.data.otp_id,
          email: values.email,
        });
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      SetLoading(false);
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // Render
  return (
    <View style={styles.container}>
      <AppText text="What's your email?" size={22} />

      <AppForm
        initialValues={InitialValues}
        onSubmit={CheckEmailProceed}
        validationSchema={ValidationSchema}
      >
        <AppFormField
          title="email"
          label="Email"
          mode="flat"
          keyboardType="email-address"
        />

        <AppSubmitButton
          CustomButton={(props) => (
            <RoundIconButton
              onPress={props.onPress}
              family={IconNames.AntDesign}
              name="arrowright"
              size={25}
              color={ColorPallete.white}
              style={styles.roundButtonContainer}
              loading={Loading}
            />
          )}
        />
      </AppForm>
    </View>
  );
}

// Exports
export default EmailSignUpScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
  },
  roundButtonContainer: {
    alignSelf: "center",
  },
});
