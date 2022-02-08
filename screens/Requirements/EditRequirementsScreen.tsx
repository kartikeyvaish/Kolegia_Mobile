// Packages Imports
import { useContext } from "react";
import { ScrollView, StyleSheet, Keyboard, View } from "react-native";

// Local imports
import AppButton from "../../components/AppButton";
import AppForm from "./../../components/AppForm";
import AppSubmitButton from "../../components/AppSubmitButton";
import AppFormField from "./../../components/AppFormField";
import ColorPallete from "../../utils/ColorPallete";
import GlobalContext from "./../../contexts/GlobalContext";
import Helper from "./../../utils/Helper";
import RequirementsAPI from "./../../api/RequirementsAPI";
import RequirementsSchema, {
  RequirementProps,
} from "../../schema/RequirementsSchema";
import ToastMessages from "./../../constants/Messages";

// function component for the post new requirement screen
function EditRequirementsScreen({ navigation, route }) {
  // Global context
  const { User, SetOverlayText, SetIsLoading } = useContext(GlobalContext);

  // Initially these will be the fields
  const initial_fields: RequirementProps = route.params;

  // API call to post new requirement
  const EditRequirement = async (values: any) => {
    try {
      Keyboard.dismiss();

      SetOverlayText("Editing Requirement...");
      SetIsLoading(true);

      let payload = {
        title: values.title,
        description: values.description,
        requirement_id: values._id,
      };

      const apiResponse = await RequirementsAPI.EditRequirement(
        payload,
        User.auth_token
      );

      SetIsLoading(false);
      Helper.ShowToast(apiResponse.data.message);
      if (apiResponse.ok) navigation.popToTop();
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetIsLoading(false);
    }
  };

  // API call to delete requirement
  const DeleteRequirement = async () => {
    try {
      SetOverlayText("Deleting Requirement...");
      SetIsLoading(true);

      const apiResponse = await RequirementsAPI.DeleteRequirement(
        {
          requirement_id: route.params._id,
        },
        User.auth_token
      );
      SetIsLoading(false);
      Helper.ShowToast(apiResponse.data.message);

      if (apiResponse.ok) navigation.popToTop();
    } catch (error) {
      SetIsLoading(false);
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
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
        initialValues={initial_fields}
        onSubmit={EditRequirement}
        validationSchema={RequirementsSchema.RequirementValidationSchema}
      >
        <AppFormField
          placeholder="Title"
          label="Title"
          title="title"
          controlled={true}
        />

        <AppFormField
          placeholder="Description"
          label="Description"
          title="description"
          multiline={true}
          containerStyle={{ maxHeight: 150, marginBottom: 20 }}
          controlled={true}
          mode="outlined"
        />

        <AppSubmitButton title="Edit Requirement" />
      </AppForm>

      <View style={{ marginTop: 20 }}>
        <AppButton
          title="Delete Requirement"
          onPress={DeleteRequirement}
          backgroundColor={ColorPallete.red}
        />
      </View>
    </ScrollView>
  );
}

export default EditRequirementsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
