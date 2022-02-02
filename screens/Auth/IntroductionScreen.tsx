// packages import
import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Components/Types/Utils imports
import AppButton from "../../components/AppButton";
import AppContainer from "./../../components/AppContainer";
import AppText from "../../components/AppText";
import AuthActionCreators from "./../../store/auth/actions";
import AuthAPI from "../../api/AuthAPI";
import configurations from "../../config/config";
import ColorPallete from "./../../utils/ColorPallete";
import FontNames from "./../../constants/FontNames";
import GlobalContext from "./../../contexts/GlobalContext";
import Helper from "../../utils/Helper";
import JWT from "../../auth/JWT";
import ScreenNames from "./../../navigation/ScreenNames";
import ToastMessages from "../../constants/Messages";
import useLoading from "../../hooks/useLoading";

// Google Constants
const googleApiClientID = configurations.googleClientID;

// Configuring the google signin
GoogleSignin.configure({
  webClientId: googleApiClientID,
});

// functional component for IntroductionScreen
function IntroductionScreen({ navigation, SetUser }: any) {
  // Custom Hooks
  const { Loading, SetLoading } = useLoading({ initialValue: false });
  const { PushToken } = useContext(GlobalContext);

  // Login function using Google
  const LoginWithGoogle = async () => {
    try {
      SetLoading(true);

      await GoogleSignin.signOut();
      const response = await GoogleSignin.signIn();

      const idToken = response.idToken;
      const user = response.user;

      let payload: any = {
        ID_Token: idToken,
        user: user,
      };

      if (PushToken) payload.push_notification_token = PushToken;

      const { data: apiResponse } = await AuthAPI.GoogleLogin(payload);

      SetLoading(false);

      if (apiResponse.isLoggedIn === false && apiResponse.partial_login) {
        // Navigate to other Screen
        navigation.navigate(ScreenNames.SignUpScreen, {
          ...apiResponse.user_details,
          profile_picture: {
            uri: apiResponse.user_details.profile_picture,
          },
        });
      } else if (apiResponse.isLoggedIn) {
        const decodedData = JWT.decodeToken(apiResponse.user_token);
        if (decodedData) {
          SetUser(decodedData);
          navigation.popToTop();
        } else {
          Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
        }
      } else {
        Helper.ShowToast("Something went wrong");
      }
    } catch (error) {
      SetLoading(false);
    }
  };

  // Render
  return (
    <AppContainer style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AppText
          text={configurations.application_name}
          family={FontNames.Mulish_Bold}
          size={50}
        />
        <AppText text={configurations.application_tag_line} size={20} />
      </View>

      <View style={styles.buttonsContainer}>
        <AppButton
          title="Login with Email"
          containerStyle={{ marginBottom: 15 }}
          onPress={() => navigation.navigate(ScreenNames.LoginScreen)}
        />
        <AppButton
          title="Continue with Google"
          backgroundColor={ColorPallete.googleColor}
          containerStyle={{ marginBottom: 15 }}
          onPress={LoginWithGoogle}
          loading={Loading}
        />
        <AppButton
          title="Sign Up"
          backgroundColor={ColorPallete.purple}
          containerStyle={{ marginBottom: 15 }}
          onPress={() => navigation.navigate(ScreenNames.EmailSignUpScreen)}
        />
      </View>
    </AppContainer>
  );
}

// Dispatchers that will change the states
const mapDispatchToProps = (dispatch) => {
  return {
    SetUser: (user: any) => dispatch(AuthActionCreators.Login(user)),
  };
};

// Exporting the IntroductionScreen component with the states and dispatchers
export default connect(null, mapDispatchToProps)(IntroductionScreen);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: { paddingLeft: 15, paddingRight: 15 },
});
