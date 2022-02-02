// Packages imports
import { useContext } from "react";
import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

// components/screens imports
import AppForm from "../../components/AppForm";
import AppFormField from "../../components/AppFormField";
import AppCheckBoxFormField from "../../components/AppCheckBoxFormField";
import AppRow from "../../components/AppRow";
import AppSubmitButton from "../../components/AppSubmitButton";
import AppText from "../../components/AppText";
import AuthAPI from "../../api/AuthAPI";
import AuthActionCreators from "./../../store/auth/actions";
import ChoosePicture from "../../components/ChoosePicture";
import ColorPallete from "../../utils/ColorPallete";
import configurations from "../../config/config";
import FontNames from "../../constants/FontNames";
import GlobalContext from "../../contexts/GlobalContext";
import Helper from "../../utils/Helper";
import JWT from "../../auth/JWT";
import KeyboardAwareContainer from "../../components/KeyboardAwareContainer";
import RegisterSchema from "./../../schema/SignUpSchema";
import ScreenNames from "../../navigation/ScreenNames";
import ToastMessages from "../../constants/Messages";
import useDocumentPicker from "../../hooks/useDocumentPicker";
import useLoading from "../../hooks/useLoading";

// default picture
const initial_picture: any = {
  uri: configurations.default_profile_picture,
};

// SignUpScreen props
interface Props {
  navigation?: any;
  SetUser?: any;
  route?: {
    params?: {
      email?: string;
      name?: string;
      profile_picture?: string;
    };
  };
}

// functional components for SignUpScreen
function SignUpScreen({ navigation, SetUser, route }: Props) {
  // construct initial Values
  let initial_profile_picture =
    route?.params?.profile_picture ?? initial_picture;
  const props_initial_values = route?.params ?? {};
  const initialValues = {
    ...RegisterSchema.RegisterInitialValues,
    ...props_initial_values,
  };

  const { PushToken } = useContext(GlobalContext);

  // Custom Hooks
  const { Loading, SetLoading } = useLoading({ initialValue: false });
  const { PickDocument, selectedFile, unselectFile, SameAsInitial } =
    useDocumentPicker({
      initial_file: initial_profile_picture,
    });

  // API call for Register
  const SignUp = async (values: any) => {
    try {
      // close the Keyboard
      Keyboard.dismiss();

      // Prepare a formData object
      const formData = new FormData();

      // now append all the properties of the values object into the formData
      Object.keys(values).forEach((key) => {
        if (key !== "profile_picture") formData.append(key, values[key]);
      });

      if (PushToken) formData.append("push_notification_token", PushToken);

      // If google image is present
      let isNetworkImage = selectedFile.uri.startsWith("http");
      if (isNetworkImage) {
        formData.append("remote_profile_picture", selectedFile.uri);
      } else {
        if (selectedFile.uri !== initial_profile_picture.uri) {
          // If user has chosen a Profile selectedFile then append it to the formData
          let profile_picture: any = {
            uri: selectedFile.uri,
            type: selectedFile.mimeType ?? "image/jpeg",
            name: selectedFile.name ?? "profile_picture.jpeg",
          };

          formData.append("profile_picture", profile_picture);
        }
      }

      // Call the API
      SetLoading(true);
      const registerResponse = await AuthAPI.Register(formData);
      SetLoading(false);

      // Check the respponse
      if (registerResponse.ok) {
        const decodedData = JWT.decodeToken(registerResponse.data.user_token);
        if (decodedData) {
          SetUser(decodedData);
          navigation.popToTop();
        } else {
          Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
        }
      } else Helper.ShowToast(registerResponse.data?.message);
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  // Render
  return (
    <KeyboardAwareContainer style={styles.container}>
      <AppText text="Kolegia" family={FontNames.Mulish_Bold} size={40} />
      <AppText text="Register to continue" size={18} />

      <ScrollView
        style={{ flex: 1, marginTop: 15, flexGrow: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <ChoosePicture
          uri={selectedFile.uri}
          onPickPress={PickDocument}
          onRemovePress={unselectFile}
          showRemoveIcon={SameAsInitial}
        />

        <AppForm
          initialValues={initialValues}
          onSubmit={(values) => SignUp(values)}
          validationSchema={RegisterSchema.RegisterValidationSchema}
        >
          <AppFormField
            label="Name"
            title="name"
            disabled={props_initial_values.name ? true : false}
            controlled
          />

          <AppFormField
            label="Email"
            title="email"
            disabled={props_initial_values.email ? true : false}
            controlled
          />

          <AppFormField
            label="Roll Number"
            title="roll_number"
            placeholder="2019-BCS***"
          />

          <AppFormField label="Year" placeholder="2019, 2020..." title="year" />

          <AppFormField
            label="Batch"
            placeholder="BCS, IMG, IMT.."
            title="batch"
          />

          <AppFormField
            label="Hostel"
            placeholder="BH-1, BH-2, GH-1"
            title="hostel"
          />

          <AppFormField
            label="Room Number"
            placeholder="1, 2, 45, 56.."
            title="room_number"
          />

          <AppFormField
            label="Phone"
            placeholder="Without country code"
            title="phone"
            keyboardType="phone-pad"
          />

          <AppFormField
            placeholder="Password"
            title="password"
            secureTextEntry={true}
          />

          <AppFormField
            placeholder="Confirm Password"
            title="confirm_password"
            secureTextEntry={true}
          />

          <AppCheckBoxFormField
            label={RegisterSchema.TermsAndConditionsMessage}
            title="terms_accepted"
            containerStyle={{ marginBottom: 35 }}
          />

          <AppSubmitButton title="Sign Up" loading={Loading} />
        </AppForm>

        <View style={styles.newUserContainer}>
          <AppRow>
            <AppText text="Already a User?" size={20} />
            <AppText
              text="Log in"
              size={20}
              color={ColorPallete.primary}
              family={FontNames.Mulish_Bold}
              marginLeft={5}
              style={{ textDecorationLine: "underline" }}
              onPress={() => navigation.replace(ScreenNames.LoginScreen)}
            />
          </AppRow>
        </View>
      </ScrollView>
    </KeyboardAwareContainer>
  );
}

// Dispatchers that will change the states
const mapDispatchToProps = (dispatch) => {
  return {
    SetUser: (user: any) => dispatch(AuthActionCreators.Login(user)),
  };
};

// Exporting the SignUpScreen component with the states and dispatchers
export default connect(null, mapDispatchToProps)(SignUpScreen);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  newUserContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
  },
});
