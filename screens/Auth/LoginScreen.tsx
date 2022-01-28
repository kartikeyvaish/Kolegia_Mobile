// Packages imports
import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

// components/screens imports
import AppFormField from "../../components/AppFormField";
import AppForm from "../../components/AppForm";
import AppRow from "../../components/AppRow";
import AppSubmitButton from "../../components/AppSubmitButton";
import AppText from "../../components/AppText";
import AuthAPI from "../../api/AuthAPI";
import AuthActionCreators from "./../../store/auth/actions";
import ColorPallete from "../../utils/ColorPallete";
import configurations from "../../config/config";
import FontNames from "../../constants/FontNames";
import KeyboardAwareContainer from "../../components/KeyboardAwareContainer";
import LoginSchema from "../../schema/LoginSchema";
import ScreenNames from "../../navigation/ScreenNames";
import useLoading from "../../hooks/useLoading";
import Helper from "./../../utils/Helper";
import ToastMessages from "./../../constants/Messages";
import JWT from "../../auth/JWT";

// functional components for LoginScreen
function LoginScreen({ navigation, SetUser }: any) {
  const { Loading, SetLoading } = useLoading({ initialValue: false });

  // API call to login
  const LoginAPICall = async (values: any) => {
    try {
      Keyboard.dismiss();

      SetLoading(true);
      const loginResponse = await AuthAPI.Login(values);
      SetLoading(false);

      if (loginResponse.ok) {
        const decodedData = JWT.decodeToken(loginResponse.data.user_token);
        if (decodedData) {
          SetUser(decodedData);
          navigation.popToTop();
        } else {
          Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
        }
      } else {
        Helper.ShowToast(loginResponse.data.message);
      }
    } catch (error) {
      SetLoading(false);
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // Render
  return (
    <KeyboardAwareContainer style={styles.container}>
      <AppText
        text={configurations.application_name}
        family={FontNames.Mulish_Bold}
        size={40}
      />
      <AppText text="Login to Continue" size={18} />

      <ScrollView
        style={{ flex: 1, marginTop: 15, flexGrow: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <AppForm
          initialValues={LoginSchema.LoginInitialValues}
          onSubmit={(values) => LoginAPICall(values)}
          validationSchema={LoginSchema.LoginValidationSchema}
        >
          <AppFormField
            title="email"
            placeholder="Email"
            keyboardType="email-address"
          />

          <AppFormField
            title="password"
            placeholder="Password"
            secureTextEntry={true}
          />

          <View style={styles.forgotPasswordContainer}>
            <AppText
              text="Forgot Password?"
              color={ColorPallete.dodgerblue}
              size={18}
              onPress={() =>
                navigation.navigate(ScreenNames.ResetPasswordScreen)
              }
            />
          </View>

          <AppSubmitButton title="Login" loading={Loading} marginTop={10} />
        </AppForm>

        <View style={styles.newUserContainer}>
          <AppRow>
            <AppText text="New to Kolegia?" size={20} />
            <AppText
              text="Sign Up"
              size={20}
              color={ColorPallete.primary}
              family={FontNames.Mulish_Bold}
              marginLeft={5}
              style={{ textDecorationLine: "underline" }}
              onPress={() => navigation.replace(ScreenNames.EmailSignUpScreen)}
            />
          </AppRow>
        </View>
      </ScrollView>
    </KeyboardAwareContainer>
  );
}

// Dispatchers that will change the states
const mapDispatchToProps = (dispatch: any) => {
  return {
    SetUser: (user: any) => dispatch(AuthActionCreators.Login(user)),
  };
};

// Exporting the LoginScreen component with the states and dispatchers
export default connect(null, mapDispatchToProps)(LoginScreen);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  GoogleIconConatainer: {
    borderColor: ColorPallete.googleColor,
    borderRadius: 50,
    borderWidth: 1,
    alignSelf: "center",
    padding: 10,
    marginTop: 30,
  },
  newUserContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: -12,
    marginBottom: 20,
  },
});
