// Packages Imports
import { View, StyleSheet } from "react-native";

// Local components
import AppText from "../../components/AppText";
import FontNames from "../../constants/FontNames";
import AppForm from "./../../components/AppForm";
import AppFormField from "./../../components/AppFormField";
import AppSubmitButton from "./../../components/AppSubmitButton";
import Helper from "./../../utils/Helper";
import OTP_API from "./../../api/OTP";
import OTPSchema from "../../schema/OTPSchema";
import ScreenNames from "../../navigation/ScreenNames";
import ToastMessages from "./../../constants/Messages";
import useLoading from "../../hooks/useLoading";

// function component for EmailOTPScreen
function EmailOTPScreen({ navigation, route }) {
  // local States
  const { Loading, SetLoading } = useLoading({ initialValue: false });

  const VerifyOTP = async (values: any) => {
    try {
      SetLoading(true);

      let payload = {
        otp_id: route.params?.otp_id || "",
        otp: values.otp.toString(),
        verification_type: "EMAIL_VERIFICATION",
      };

      const apiResponse = await OTP_API.VerifyOTP(payload);
      SetLoading(false);

      if (apiResponse.ok) {
        navigation.replace(ScreenNames.SignUpScreen, {
          email: route.params?.email || "",
        });
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppText
        text={
          "An OTP has been sent to your Email address to verify your account. Please enter that OTP below"
        }
        size={20}
        family={FontNames.Inter_Bold}
        marginBottom={20}
      />

      <AppForm
        initialValues={OTPSchema.OTPInitialValues}
        validationSchema={OTPSchema.OTPValidationSchema}
        onSubmit={VerifyOTP}
      >
        <AppFormField
          title="otp"
          placeholder="OTP"
          label="OTP"
          mode="outlined"
          maxLength={6}
          keyboardType="number-pad"
        />

        <AppSubmitButton
          title="Verify OTP"
          height={55}
          marginTop={20}
          loading={Loading}
        />
      </AppForm>
    </View>
  );
}

export default EmailOTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
