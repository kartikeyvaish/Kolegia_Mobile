// Packages Imports
import { useContext } from "react";
import { View, StyleSheet, Keyboard } from "react-native";

// Local imports
import AppForm from "../../components/AppForm";
import AppFormField from "../../components/AppFormField";
import AppSubmitButton from "../../components/AppSubmitButton";
import AuthAPI from "./../../api/AuthAPI";
import ChangePasswordSchema from "../../schema/ChangePassword";
import GlobalContext from "./../../contexts/GlobalContext";
import Helper from "./../../utils/Helper";
import useLoading from "../../hooks/useLoading";

// function component for ChangePasswordScreen
function ChangePasswordScreen({ navigation }) {
  const { Loading, SetLoading } = useLoading({ initialValue: false });

  // Context
  const { User } = useContext(GlobalContext);

  // Chnage Password API call
  const ChangePassword = async (values: any) => {
    try {
      Keyboard.dismiss();

      SetLoading(true);

      const apiResponse = await AuthAPI.ChangePassword(values, User.auth_token);

      SetLoading(false);
      Helper.ShowToast(apiResponse.data.message);

      if (apiResponse.ok) navigation.goBack();
    } catch (error) {
      SetLoading(false);
    }
  };

  // Render
  return (
    <View style={styles.container}>
      <AppForm
        initialValues={ChangePasswordSchema.ChangePasswordInitialValues}
        onSubmit={ChangePassword}
        validationSchema={ChangePasswordSchema.ChangePasswordValidationSchema}
      >
        <AppFormField
          placeholder="Current Password"
          title="CurrentPassword"
          containerStyle={{ marginBottom: 10 }}
          secureTextEntry={true}
        />

        <AppFormField
          placeholder="New Password"
          title="NewPassword"
          containerStyle={{ marginBottom: 10 }}
          secureTextEntry={true}
        />

        <AppFormField
          placeholder="Confirm Password"
          title="ConfirmPassword"
          containerStyle={{ marginBottom: 10 }}
          secureTextEntry={true}
        />

        <AppSubmitButton title="Change Password" loading={Loading} />
      </AppForm>
    </View>
  );
}

// Exports
export default ChangePasswordScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
