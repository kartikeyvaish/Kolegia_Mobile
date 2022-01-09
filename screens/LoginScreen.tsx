// Packages imports
import { ScrollView, StyleSheet, View } from "react-native";
import { Formik } from "formik";

// components/screens imports
import AppButton from "../components/AppButton";
import AppCheckBox from "../components/AppCheckBox";
import AppRow from "./../components/AppRow";
import AppText from "../components/AppText";
import AppTextInput from "./../components/AppTextInput";
import ColorPallete from "../utils/ColorPallete";
import { connect } from "react-redux";
import configurations from "../config/config";
import FontNames from "../constants/FontNames";
import {
  LoginInitialValues,
  LoginValidationSchema,
  StaySignedInLabel,
} from "./../schema/LoginSchema";
import { Login } from "../store/auth/actions";
import KeyboardAwareContainer from "../components/KeyboardAwareContainer";
import ScreenNames from "../navigation/ScreenNames";

// functional components for LoginScreen
function LoginScreen({ navigation, SetUser }: any) {
  const LoginAPICall = async (values: any) => {
    try {
      SetUser(values);
    } catch (error) {}
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
      >
        <Formik
          initialValues={LoginInitialValues}
          onSubmit={(values) => LoginAPICall(values)}
          validationSchema={LoginValidationSchema}
        >
          {({
            handleChange,
            setFieldTouched,
            handleSubmit,
            errors,
            touched,
            values,
            setFieldValue,
          }) => (
            <>
              <AppTextInput
                placeholder="Email"
                error={touched.Email ? errors.Email : ""}
                onBlur={() => setFieldTouched("Email")}
                keyboardType="email-address"
                onChangeText={handleChange("Email")}
              />

              <AppTextInput
                placeholder="Password"
                error={touched.Password ? errors.Password : ""}
                onBlur={() => setFieldTouched("Password")}
                onChangeText={handleChange("Password")}
                containerStyle={{ marginBottom: 10 }}
                secureTextEntry={true}
              />

              <AppCheckBox
                label={StaySignedInLabel}
                status={values.StaySignedIn}
                onPress={() => {
                  setFieldValue(
                    "StaySignedIn",
                    values.StaySignedIn ? false : true
                  );
                  setFieldTouched("StaySignedIn", true, false);
                }}
                error={touched.StaySignedIn ? errors.StaySignedIn : ""}
              />

              <AppButton title="Login" onPress={handleSubmit} />
            </>
          )}
        </Formik>

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
              onPress={() => navigation.replace(ScreenNames.SignUpScreen)}
            />
          </AppRow>
        </View>
      </ScrollView>
    </KeyboardAwareContainer>
  );
}

// Redux store that holds the states
const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

// Dispatchers that will change the states
const mapDispatchToProps = (dispatch) => {
  return {
    SetUser: (user: any) => dispatch(Login(user)),
  };
};

// Exporting the Login component with the states and dispatchers
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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
});
