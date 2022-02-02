// Packages Imports
import { useContext, useRef, useState } from "react";
import { StyleSheet, Keyboard } from "react-native";

// Local components imports
import AppContainer from "./../../components/AppContainer";
import AppText from "./../../components/AppText";
import AppForm from "../../components/AppForm";
import AppFormField from "./../../components/AppFormField";
import AppSubmitButton from "../../components/AppSubmitButton";
import AuthAPI from "./../../api/AuthAPI";
import ColorPallete from "../../utils/ColorPallete";
import EmailSignUpSchema from "./../../schema/EmailSignUp";
import FontNames from "../../constants/FontNames";
import GlobalContext from "./../../contexts/GlobalContext";
import Helper from "./../../utils/Helper";
import JWT from "../../auth/JWT";
import OTP_API from "./../../api/OTP";
import OTPSchema from "./../../schema/OTPSchema";
import ResetPasswordSchema from "../../schema/ResetPasswordSchema";
import ToastMessages from "./../../constants/Messages";
import useLoading from "./../../hooks/useLoading";

// function component for reset password screen
function ResetPasswordScreen({ navigation }) {
  // Local States
  const [CodeSent, SetCodeSent] = useState(false);
  const [CodeVerified, SetCodeVerified] = useState(false);
  const OTP_ID = useRef<string>("");
  const email = useRef<string>("");
  const reset_request_id = useRef<string>("");

  // Global Context
  const { SetUser, PushToken } = useContext(GlobalContext);

  // Custom Loading Hook
  const { Loading, SetLoading } = useLoading({ initialValue: false });

  // API call to send the OTP
  const SendCode = async (values) => {
    try {
      Keyboard.dismiss();

      SetLoading(true);

      const apiResponse = await AuthAPI.SendPasswordResetOTP(values);

      SetLoading(false);

      if (apiResponse.ok) {
        email.current = values.email;
        OTP_ID.current = apiResponse.data.otp_id;
        SetCodeSent(true);
      } else Helper.ShowToast(apiResponse.data.message);
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  // API Call to Verify the OTP
  const VerifyOTP = async (values) => {
    try {
      Keyboard.dismiss();

      SetLoading(true);

      const apiResponse = await OTP_API.VerifyOTP({
        otp_id: OTP_ID.current,
        otp: values.otp,
        verification_type: "FORGOT_PASSWORD",
      });

      SetLoading(false);

      if (apiResponse.ok) {
        SetCodeVerified(true);
        reset_request_id.current = apiResponse.data.reset_request_id;
      } else Helper.ShowToast(apiResponse.data.message);
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  // API call to reset the password
  const ResetPassword = async (values) => {
    try {
      SetLoading(true);

      let payload: any = {
        email: email.current,
        password: values.NewPassword,
        reset_request_id: reset_request_id.current,
      };

      if (PushToken) payload.push_notification_token = PushToken;

      const apiResponse = await AuthAPI.ResetPassword(payload);
      SetLoading(false);

      if (apiResponse.ok) {
        const decodedData = JWT.decodeToken(apiResponse.data.user_token);
        if (decodedData) {
          SetUser(decodedData);
          navigation.popToTop();
          Helper.ShowToast(ToastMessages.PasswordResetSuccess);
        } else {
          Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
        }
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  // Render
  return (
    <AppContainer style={styles.container}>
      <AppText
        text={
          CodeSent === false
            ? "An OTP will be sent to your Email address to verify your account"
            : CodeVerified === false
            ? "Enter the OTP sent to your Email address"
            : "Set a New Password"
        }
        size={20}
        family={FontNames.Inter_Bold}
        marginTop={10}
        marginBottom={10}
      />

      {!CodeVerified ? (
        <AppForm
          initialValues={EmailSignUpSchema.EmailSignUpInitialValues}
          onSubmit={SendCode}
          validationSchema={EmailSignUpSchema.EmailSignUpValidationSchema}
        >
          <AppFormField
            label="Email Address"
            keyboardType="email-address"
            disabled={CodeSent}
            title="email"
          />

          {!CodeSent ? (
            <AppSubmitButton
              title="Send OTP"
              backgroundColor={ColorPallete.dodgerblue}
              loading={Loading}
              marginTop={10}
              marginBottom={20}
            />
          ) : null}
        </AppForm>
      ) : null}

      {!CodeVerified && CodeSent ? (
        <AppForm
          initialValues={OTPSchema.OTPInitialValues}
          onSubmit={VerifyOTP}
          validationSchema={OTPSchema.OTPValidationSchema}
        >
          <AppFormField
            label="6-digit OTP"
            mode="outlined"
            title="otp"
            secureTextEntry={true}
            maxLength={6}
            keyboardType="numeric"
            containerStyle={{ marginTop: 10 }}
          />

          <AppSubmitButton
            title="Verify OTP"
            marginTop={10}
            loading={Loading}
          />
        </AppForm>
      ) : null}

      {CodeSent && CodeVerified ? (
        <AppForm
          initialValues={ResetPasswordSchema.ResetPasswordInitialValues}
          onSubmit={ResetPassword}
          validationSchema={ResetPasswordSchema.ResetPasswordValidationSchema}
        >
          <AppFormField
            label="New Password"
            mode="flat"
            secureTextEntry={true}
            title="NewPassword"
          />

          <AppFormField
            label="Confirm New Password"
            mode="flat"
            secureTextEntry={true}
            title="ConfirmPassword"
          />

          <AppSubmitButton
            title="Reset Password"
            marginTop={10}
            loading={Loading}
          />
        </AppForm>
      ) : null}
    </AppContainer>
  );
}

// Exports
export default ResetPasswordScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  RemainingBox: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 20,
  },
});
