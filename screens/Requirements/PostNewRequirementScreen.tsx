// Packages Imports
import { ScrollView, StyleSheet, Keyboard } from "react-native";
import { connect } from "react-redux";

// Local imports
import AppForm from "../../components/AppForm";
import AppFormField from "../../components/AppFormField";
import AppSubmitButton from "../../components/AppSubmitButton";
import Helper from "./../../utils/Helper";
import RequirementsAPI from "./../../api/RequirementsAPI";
import RequirementsSchema from "../../schema/RequirementsSchema";
import ToastMessages from "./../../constants/Messages";
import useLoading from "../../hooks/useLoading";

// function component for the post new requirement screen
function PostNewRequirementScreen({ User, navigation }) {
  const { Loading, SetLoading } = useLoading({ initialValue: false });

  // API call to post new requirement
  const PostNewRequirement = async (values: any) => {
    try {
      Keyboard.dismiss();

      SetLoading(true);
      const apiResponse = await RequirementsAPI.PostNewRequirement(
        values,
        User.auth_token
      );

      SetLoading(false);
      Helper.ShowToast(apiResponse.data.message);
      if (apiResponse.ok) navigation.popToTop();
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  // If the user is not logged in, then return null;
  if (!User) return null;

  // Render
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <AppForm
        initialValues={RequirementsSchema.RequirmentInitialValues}
        onSubmit={PostNewRequirement}
        validationSchema={RequirementsSchema.RequirementValidationSchema}
      >
        <AppFormField placeholder="Title" label="Title" title="title" />

        <AppFormField
          placeholder="Description"
          label="Description"
          title="description"
          multiline={true}
          containerStyle={{ maxHeight: 150, marginBottom: 20 }}
        />

        <AppSubmitButton title="Post" loading={Loading} />
      </AppForm>
    </ScrollView>
  );
}

// Map State to Props
const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

// Connect and Export the component
export default connect(mapStateToProps)(PostNewRequirementScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
