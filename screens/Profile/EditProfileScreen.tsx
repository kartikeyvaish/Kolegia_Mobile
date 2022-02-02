// Packages Imports
import { useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";

// Local Components/Types imports
import AppForm from "../../components/AppForm";
import AppFormField from "../../components/AppFormField";
import AppRow from "../../components/AppRow";
import AppSubmitButton from "../../components/AppSubmitButton";
import AuthAPI from "../../api/AuthAPI";
import ColorPallete from "../../utils/ColorPallete";
import ChoosePicture from "../../components/ChoosePicture";
import EditProfileSchema from "../../schema/EditProfileSchema";
import GlobalContext from "../../contexts/GlobalContext";
import Helper from "../../utils/Helper";
import RowDetailsCard from "../../components/RowDetailsCard";
import ToastMessages from "../../constants/Messages";
import useLoading from "../../hooks/useLoading";
import useDocumentPicker from "../../hooks/useDocumentPicker";

// function component for EditProfileScreen
function EditProfileScreen({ navigation }) {
  // Global context
  const { User, SetUser } = useContext(GlobalContext);

  // Construct the initial fields
  const initial_fields = { ...User };

  // Custom Hooks
  const { Loading, SetLoading } = useLoading({ initialValue: false });
  const { PickDocument, selectedFile, unselectFile, SameAsInitial } =
    useDocumentPicker({
      initial_file: { uri: initial_fields.profile_picture },
    });

  // API call for Editing Profile
  const EditProfile_API = async (values: any) => {
    try {
      SetLoading(true);

      // Create a formData object
      const formData: any = new FormData();

      // Append the values to the formData

      // Append only if value is not same as initial value
      if (values.name !== initial_fields.name)
        formData.append("name", values.name);

      if (values.email !== initial_fields.email)
        formData.append("email", values.email);

      if (values.hostel !== initial_fields.hostel)
        formData.append("hostel", values.hostel);

      if (values.phone !== initial_fields.phone)
        formData.append("phone", values.phone);

      if (values.room_number !== initial_fields.room_number)
        formData.append("room_number", values.room_number);

      // If user has chosen a Profile selectedFile then append it to the formData
      if (selectedFile.uri !== initial_fields.profile_picture) {
        let profile_picture: any = {
          uri: selectedFile.uri,
          type: selectedFile.mimeType,
          name: selectedFile.name,
        };

        formData.append("profile_picture", profile_picture);
      }

      if (formData._parts.length === 0) {
        SetLoading(false);
        Helper.ShowToast("Profile Saved Successfully.");
        navigation.goBack();
        return;
      }

      const apiResponse = await AuthAPI.EditProfile(formData, User.auth_token);
      SetLoading(false);

      if (apiResponse.ok) {
        SetUser(apiResponse.data.User);
        navigation.goBack();
      }

      Helper.ShowToast(apiResponse.data.message);
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  // if user is not logged in, return null
  if (!User) return null;

  // Render
  return (
    <ScrollView
      style={styles.container}
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

      <RowDetailsCard
        title="Email"
        description={initial_fields.email}
        descriptionProps={{
          color: ColorPallete.green,
        }}
      />

      <RowDetailsCard
        title="Roll Number"
        description={initial_fields.roll_number}
      />

      <RowDetailsCard title="Batch" description={initial_fields.batch} />

      <RowDetailsCard
        title="Year"
        description={initial_fields.year}
        style={{ marginBottom: 5 }}
      />

      <AppForm
        initialValues={initial_fields}
        validationSchema={EditProfileSchema.EditProfileValidationSchema}
        onSubmit={EditProfile_API}
      >
        <AppFormField label="Name" title="name" placeholder="Name" controlled />

        <AppFormField
          label="Phone"
          title="phone"
          placeholder="Phone"
          controlled
          keyboardType="numeric"
        />

        <AppRow>
          <AppFormField
            title="hostel"
            placeholder="Hostel"
            controlled
            keyboardType="numeric"
            label="Hostel"
            containerStyle={{ flex: 1, marginRight: 10 }}
          />

          <AppFormField
            title="room_number"
            placeholder="Room Number"
            controlled
            label="Room Number"
            containerStyle={{ flex: 1, marginLeft: 10 }}
          />
        </AppRow>

        <AppSubmitButton
          title="Save Profile"
          marginBottom={20}
          loading={Loading}
        />
      </AppForm>
    </ScrollView>
  );
}

// Exports
export default EditProfileScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
