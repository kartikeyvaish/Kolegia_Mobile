// Packages imports
import { ScrollView, StyleSheet, View } from "react-native";
import { Formik } from "formik";

// components/screens imports
import AppButton from "../components/AppButton";
import AppRow from "./../components/AppRow";
import AppText from "../components/AppText";
import AppTextInput from "./../components/AppTextInput";
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";
import KeyboardAwareContainer from "../components/KeyboardAwareContainer";
import {
  RegisterInitialValues,
  RegisterValidationSchema,
  TermsAndConditionsMessage,
} from "../schema/SignUpSchema";
import ScreenNames from "../navigation/ScreenNames";
import AppRadioButton from "../components/AppRadioButton";
import AppCheckBox from "../components/AppCheckBox";

// functional components for SignUpScreen
function SignUpScreen({ navigation }: any) {
  const SignUp = async (values: any) => {
    try {
      console.log(values);
    } catch (error) {}
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
      >
        <Formik
          initialValues={RegisterInitialValues}
          onSubmit={(values) => SignUp(values)}
          validationSchema={RegisterValidationSchema}
        >
          {({
            handleChange,
            setFieldTouched,
            handleSubmit,
            errors,
            touched,
            setFieldValue,
            values,
          }) => (
            <>
              <AppTextInput
                placeholder="Name"
                error={touched.Name ? errors.Name : ""}
                onBlur={() => setFieldTouched("Name")}
                onChangeText={handleChange("Name")}
              />

              <AppTextInput
                placeholder="Email"
                error={touched.Email ? errors.Email : ""}
                onBlur={() => setFieldTouched("Email")}
                keyboardType="email-address"
                onChangeText={handleChange("Email")}
              />

              <AppRow>
                <View style={{ flex: 1, marginRight: 20 }}>
                  <AppTextInput
                    label="Year"
                    placeholder="2019, 2020..."
                    error={touched.Year ? errors.Year : ""}
                    onBlur={() => setFieldTouched("Year")}
                    onChangeText={handleChange("Year")}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 20 }}>
                  <AppTextInput
                    label="Batch"
                    placeholder="BCS, IMG, IMT.."
                    error={touched.Batch ? errors.Batch : ""}
                    onBlur={() => setFieldTouched("Batch")}
                    onChangeText={handleChange("Batch")}
                  />
                </View>
              </AppRow>

              <AppTextInput
                label="Hostel"
                placeholder="BH-1, BH-2, GH-1"
                error={touched.Hostel ? errors.Hostel : ""}
                onBlur={() => setFieldTouched("Hostel")}
                onChangeText={handleChange("Hostel")}
              />

              <AppTextInput
                label="Phone"
                placeholder="Without country code"
                error={touched.Phone ? errors.Phone : ""}
                onBlur={() => setFieldTouched("Phone")}
                keyboardType="phone-pad"
                onChangeText={handleChange("Phone")}
              />

              <AppTextInput
                placeholder="Password"
                error={touched.Password ? errors.Password : ""}
                onBlur={() => setFieldTouched("Password")}
                onChangeText={handleChange("Password")}
                containerStyle={{ marginBottom: 10 }}
                secureTextEntry={true}
              />

              <AppTextInput
                placeholder="Confirm Password"
                error={touched.ConfirmPassword ? errors.ConfirmPassword : ""}
                onBlur={() => setFieldTouched("ConfirmPassword")}
                onChangeText={handleChange("ConfirmPassword")}
                containerStyle={{ marginBottom: 10 }}
                secureTextEntry={true}
              />

              <AppCheckBox
                label={TermsAndConditionsMessage}
                status={values.TermsAccepted}
                onPress={() => {
                  setFieldValue(
                    "TermsAccepted",
                    values.TermsAccepted ? false : true
                  );
                  setFieldTouched("TermsAccepted", true, false);
                }}
                containerStyle={{ marginBottom: 35 }}
                error={touched.TermsAccepted ? errors.TermsAccepted : ""}
              />

              <AppButton title="Sign Up" onPress={handleSubmit} />
            </>
          )}
        </Formik>

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

// Exports
export default SignUpScreen;

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
});
