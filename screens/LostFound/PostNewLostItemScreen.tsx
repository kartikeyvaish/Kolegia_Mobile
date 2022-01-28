// Packages imports
import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

// components/screens imports
import AppForm from "./../../components/AppForm";
import AppFormField from "../../components/AppFormField";
import AppIcon from "../../components/AppIcon";
import AppRow from "../../components/AppRow";
import AppSubmitButton from "../../components/AppSubmitButton";
import AppText from "../../components/AppText";
import ColorPallete from "../../utils/ColorPallete";
import FontNames from "../../constants/FontNames";
import FilePreviewCard from "../../components/FilePreviewCard";
import Helper from "../../utils/Helper";
import IconNames from "../../constants/IconNames";
import LostFoundAPI from "../../api/LostFoundAPI";
import LostFoundSchema from "../../schema/LostFoundItemSchema";
import ToastMessages from "../../constants/Messages";
import useLoading from "../../hooks/useLoading";
import useImagePicker from "../../hooks/useImagePicker";

// functional components for PostNewLostItemScreen
function PostNewLostItemScreen({ navigation, User }: any) {
  const { auth_token } = User;

  const { Loading, SetLoading } = useLoading({ initialValue: false });
  const { Files, PickDocument, RemoveDocument } = useImagePicker({});

  // API call for Register
  const PostProduct = async (values: any) => {
    try {
      SetLoading(true);
      // close the Keyboard
      Keyboard.dismiss();

      // Prepare a formData object
      const formData = new FormData();

      // now append all the properties of the values object into the formData
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // Now append the files to the formData in the `files` property
      Files.forEach((file) => {
        let eachFile: any = {
          name: file.name,
          type: file.mimeType,
          uri: file.uri,
        };

        formData.append("files", eachFile);
      });

      const apiResponse = await LostFoundAPI.PostLostFoundItem(
        formData,
        auth_token
      );

      SetLoading(false);

      if (apiResponse.ok) {
        Helper.ShowToast("Product Posted Successfully");
      }

      navigation.popToTop();
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
        initialValues={LostFoundSchema.LostFoundInitialValues}
        onSubmit={(values) => PostProduct(values)}
        validationSchema={LostFoundSchema.LostFoundValidationSchema}
      >
        <AppRow
          justifyContent="space-between"
          alignItems="center"
          marginBottom={10}
        >
          <AppText
            text="New Lost/Found item"
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

        <AppFormField placeholder="Name" label="Name" title="name" />

        <AppFormField
          placeholder="Description"
          label="Description"
          title="description"
          multiline={true}
          containerStyle={{ maxHeight: 150 }}
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

// Exporting the Login component with the states and dispatchers
export default connect(mapStateToProps, null)(PostNewLostItemScreen);

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
  },
});
