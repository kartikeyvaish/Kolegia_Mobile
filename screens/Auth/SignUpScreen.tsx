// Packages imports
import { useState } from "react";
import { Image, Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import * as DocumentPicker from "expo-document-picker";

// components/screens imports
import AppForm from "../../components/AppForm";
import AppFormField from "../../components/AppFormField";
import AppCheckBoxFormField from "../../components/AppCheckBoxFormField";
import AppIcon from "../../components/AppIcon";
import AppRow from "../../components/AppRow";
import AppSubmitButton from "../../components/AppSubmitButton";
import AppText from "../../components/AppText";
import AuthAPI from "../../api/AuthAPI";
import AuthActionCreators from "./../../store/auth/actions";
import ColorPallete from "../../utils/ColorPallete";
import configurations from "../../config/config";
import Helper from "../../utils/Helper";
import IconNames from "../../constants/IconNames";
import FontNames from "../../constants/FontNames";
import JWT from "../../auth/JWT";
import KeyboardAwareContainer from "../../components/KeyboardAwareContainer";
import RegisterSchema from "./../../schema/SignUpSchema";
import ScreenNames from "../../navigation/ScreenNames";
import ToastMessages from "../../constants/Messages";
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
    route.params?.profile_picture ?? initial_picture;
  const props_initial_values = route.params ?? {};
  const initialValues = {
    ...RegisterSchema.RegisterInitialValues,
    ...props_initial_values,
  };

  // Local States
  const { Loading, SetLoading } = useLoading({ initialValue: false });
  const [Picture, SetPicture] = useState(initial_profile_picture);

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

      // If google image is present
      let isNetworkImage = Picture.uri.startsWith("http");
      if (isNetworkImage) {
        formData.append("remote_profile_picture", Picture.uri);
      } else {
        if (Picture.uri !== initial_profile_picture.uri) {
          // If user has chosen a Profile Picture then append it to the formData
          let profile_picture: any = {
            uri: Picture.uri,
            type: Picture.mimeType ?? "image/jpeg",
            name: Picture.name ?? "profile_picture.jpeg",
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

  // function to pick profile_picture
  const PickImage = async () => {
    try {
      const pickedFile = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });

      if (pickedFile.type === "success") SetPicture(pickedFile);
    } catch (error) {
      Helper.ShowToast("Some Error Occured while picking the image");
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
        <View style={styles.PicAndIconContainer}>
          <View style={styles.ImageContainer}>
            <Image
              source={{ uri: Picture.uri }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>

          <AppIcon
            family={IconNames.Entypo}
            name={"edit"}
            size={30}
            color={ColorPallete.primary}
            style={styles.EditIcon}
            onPress={PickImage}
          />
        </View>

        <AppForm
          initialValues={initialValues}
          onSubmit={(values) => SignUp(values)}
          validationSchema={RegisterSchema.RegisterValidationSchema}
        >
          <AppFormField
            label="Name"
            title="name"
            disabled={props_initial_values.name ? true : false}
            mode="outlined"
            controlled
            containerStyle={{ marginBottom: 0 }}
          />

          <AppFormField
            label="Email"
            title="email"
            showError={false}
            disabled={props_initial_values.email ? true : false}
            mode="outlined"
            controlled
          />

          <AppFormField
            label="Roll Number"
            title="roll_number"
            placeholder="2019-BCS***"
          />

          <AppRow>
            <View style={{ flex: 1, marginRight: 20 }}>
              <AppFormField
                label="Year"
                placeholder="2019, 2020..."
                title="year"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 20 }}>
              <AppFormField
                label="Batch"
                placeholder="BCS, IMG, IMT.."
                title="batch"
              />
            </View>
          </AppRow>

          <AppRow>
            <View style={{ flex: 1, marginRight: 20 }}>
              <AppFormField
                label="Hostel"
                placeholder="BH-1, BH-2, GH-1"
                title="hostel"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 20 }}>
              <AppFormField
                label="Room Number"
                placeholder="1, 2, 45, 56.."
                title="room_number"
              />
            </View>
          </AppRow>

          <AppFormField
            label="Phone"
            placeholder="Without country code"
            title="phone"
            keyboardType="phone-pad"
          />

          <AppFormField
            placeholder="Password"
            title="password"
            containerStyle={{ marginBottom: 10 }}
            secureTextEntry={true}
          />

          <AppFormField
            placeholder="Confirm Password"
            title="confirm_password"
            containerStyle={{ marginBottom: 10 }}
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
    marginTop: 30,
  },
  PicAndIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 15,
  },
  ImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  EditIcon: {
    position: "absolute",
    zIndex: 10,
    top: 10,
    right: 10,
  },
});
