// Packages Imports
import { useContext, useState } from "react";
import { Image, View, StyleSheet, ScrollView } from "react-native";
import * as DocumentPicker from "expo-document-picker";

// Local Components/Types imports
import AppIcon from "../../components/AppIcon";
import AppForm from "../../components/AppForm";
import AppFormField from "../../components/AppFormField";
import AppRow from "../../components/AppRow";
import AppSubmitButton from "../../components/AppSubmitButton";
import AuthAPI from "../../api/AuthAPI";
import ColorPallete from "../../utils/ColorPallete";
import EditProfileSchema from "../../schema/EditProfileSchema";
import GlobalContext from "../../contexts/GlobalContext";
import Helper from "../../utils/Helper";
import IconNames from "../../constants/IconNames";
import ToastMessages from "../../constants/Messages";
import useLoading from "../../hooks/useLoading";
import AppText from "./../../components/AppText";
import FontNames from "../../constants/FontNames";

// function component for EditProfileScreen
function EditProfileScreen({ navigation }) {
  // Global context
  const { User, SetUser } = useContext(GlobalContext);

  // Construct the initial fields
  const initial_fields = { ...User };

  // Local States
  const [Picture, SetPicture] = useState<any>({
    uri: initial_fields.profile_picture,
  });

  const { Loading, SetLoading } = useLoading({ initialValue: false });

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

      // If user has chosen a Profile Picture then append it to the formData
      if (Picture.uri !== initial_fields.profile_picture) {
        let profile_picture: any = {
          uri: Picture.uri,
          type: Picture.mimeType,
          name: Picture.name,
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
      <View style={styles.PicAndIconContainer}>
        <View style={styles.ImageContainer}>
          <Image
            source={{ uri: Picture.uri }}
            style={styles.image}
            resizeMode="cover"
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
        initialValues={initial_fields}
        validationSchema={EditProfileSchema.EditProfileValidationSchema}
        onSubmit={EditProfile_API}
      >
        <AppFormField
          label="Name"
          title="name"
          placeholder="Name"
          controlled
          mode="outlined"
        />

        <AppFormField
          label="Email"
          title="email"
          controlled
          mode="outlined"
          disabled
        />
        <AppText
          text="Email is Verified"
          color={ColorPallete.green}
          size={13}
          marginBottom={15}
          marginLeft={3}
          marginTop={3}
          family={FontNames.Inter_Bold}
        />

        <AppFormField
          label="Phone"
          title="phone"
          placeholder="Phone"
          controlled
          keyboardType="numeric"
          mode="outlined"
        />

        <AppFormField
          title="roll_number"
          placeholder="Roll Number"
          disabled
          controlled
          label="Roll Number"
          mode="outlined"
        />

        <AppRow marginBottom={5} marginTop={5}>
          <AppFormField
            label="Batch"
            title="batch"
            placeholder="Batch"
            disabled
            controlled
            containerStyle={{ flex: 1, marginRight: 10 }}
            mode="outlined"
          />

          <AppFormField
            title="year"
            placeholder="Year"
            disabled
            controlled
            keyboardType="numeric"
            label="Year"
            mode="outlined"
            containerStyle={{ flex: 1, marginLeft: 10 }}
          />
        </AppRow>

        <AppRow>
          <AppFormField
            title="hostel"
            placeholder="Hostel"
            controlled
            keyboardType="numeric"
            label="Hostel"
            mode="outlined"
            containerStyle={{ flex: 1, marginRight: 10 }}
          />
          <AppFormField
            title="room_number"
            placeholder="Room Number"
            controlled
            label="Room Number"
            mode="outlined"
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
  PicAndIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 15,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  ImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: ColorPallete.primary,
  },
  EditIcon: {
    position: "absolute",
    zIndex: 10,
    top: 10,
    right: 10,
  },
});
