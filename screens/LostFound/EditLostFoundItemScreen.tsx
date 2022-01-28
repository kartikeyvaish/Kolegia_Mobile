// Packages imports
import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

// components/screens imports
import AppForm from "./../../components/AppForm";
import AppFormField from "./../../components/AppFormField";
import AppIcon from "../../components/AppIcon";
import AppRow from "../../components/AppRow";
import AppSubmitButton from "./../../components/AppSubmitButton";
import AppText from "../../components/AppText";
import ColorPallete from "../../utils/ColorPallete";
import FilePreviewCard from "../../components/FilePreviewCard";
import FontNames from "../../constants/FontNames";
import Helper from "./../../utils/Helper";
import IconNames from "../../constants/IconNames";
import LostFoundAPI from "../../api/LostFoundAPI";
import LostFoundSchema, {
  LostFoundInitialValuesProps,
} from "../../schema/LostFoundItemSchema";
import ToastMessages from "../../constants/Messages";
import useImagePicker from "../../hooks/useImagePicker";
import useLoading from "../../hooks/useLoading";

// functional components for EditLostFoundItemScreen
function EditLostFoundItemScreen({ navigation, User, route }: any) {
  // Destructure the initial values from the route params
  const initial_fields: LostFoundInitialValuesProps = route.params;
  const initial_files = route.params.files;

  // Get the auth_token
  const { auth_token } = User;

  // Local States
  const { Loading, SetLoading } = useLoading({ initialValue: false });
  const { Files, PickDocument, RemoveDocument, deleted_files } = useImagePicker(
    {
      initial_files,
    }
  );

  // API call for Register
  const PostProduct = async (values: any) => {
    try {
      SetLoading(true);
      // close the Keyboard
      Keyboard.dismiss();

      // Prepare a formData object
      const formData = new FormData();

      formData.append("product_id", route.params._id);
      formData.append("name", values.name);
      formData.append("description", values.description);

      // Append deleted_files array to formData
      deleted_files.forEach((file) => {
        formData.append("to_be_deleted[]", file);
      });

      // Now append the files to the formData in the `files` property
      Files.forEach((file) => {
        if (!file.public_id) {
          let eachFile: any = {
            name: file.name,
            type: file.mimeType,
            uri: file.uri,
          };

          formData.append("files", eachFile);
        }
      });

      const apiResponse = await LostFoundAPI.EditLostFoundItem(
        formData,
        auth_token
      );

      SetLoading(false);

      if (apiResponse.ok) {
        Helper.ShowToast("Product Edited Successfully");
        navigation.popToTop();
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

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
        onSubmit={(values) => PostProduct(values)}
        validationSchema={LostFoundSchema.LostFoundValidationSchema}
      >
        <AppRow
          justifyContent="space-between"
          alignItems="center"
          marginBottom={10}
        >
          <AppText
            text="Edit Lost/Found item"
            family={FontNames.Mulish_Bold}
            size={23}
          />
          <AppSubmitButton
            CustomButton={(props) => (
              <AppIcon
                family={IconNames.MaterialIcons}
                name="done"
                size={35}
                onPress={props.onPress}
                loading={Loading}
              />
            )}
          />
        </AppRow>

        <AppFormField placeholder="Name" label="Name" title="name" controlled />

        <AppFormField
          placeholder="Description"
          label="Description"
          multiline={true}
          containerStyle={{ maxHeight: 150 }}
          title="description"
          controlled
          mode="outlined"
        />
      </AppForm>

      <View style={styles.titleContainer}>
        <AppText
          text={Files.length ? `Preview Files` : "No Files Selected"}
          size={20}
          family={FontNames.Mulish_Bold}
        />

        <AppText
          text=" + Add Files"
          size={20}
          color={ColorPallete.dodgerblue}
          family={FontNames.Inter_Bold}
          onPress={PickDocument}
        />
      </View>

      {Files.map((item) => (
        <FilePreviewCard
          {...item}
          key={item._id.toString()}
          onPress={() => RemoveDocument(item._id)}
        />
      ))}
    </ScrollView>
  );
}

// Redux store that holds the states
const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

// Exporting the EditLostFoundItemScreen component with the states and dispatchers
export default connect(mapStateToProps, null)(EditLostFoundItemScreen);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    flexGrow: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
