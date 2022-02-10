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
import BuySellAPI from "../../api/BuySellAPI";
import BuySellSchema from "../../schema/BuySellItemSchema";
import ColorPallete from "../../utils/ColorPallete";
import FontNames from "../../constants/FontNames";
import FilePreviewCard from "../../components/FilePreviewCard";
import Helper from "../../utils/Helper";
import IconNames from "../../constants/IconNames";
import ScreenNames from "../../navigation/ScreenNames";
import ToastMessages from "./../../constants/Messages";
import useLoading from "../../hooks/useLoading";
import useImagePicker from "../../hooks/useImagePicker";

// functional components for PostNewBuyItemScreen
function PostNewBuyItemScreen({ navigation, User }: any) {
  // Destructuring the User
  const { auth_token } = User;

  const { Loading, SetLoading } = useLoading({ initialValue: false });
  const { Files, PickDocument, RemoveDocument } = useImagePicker({});

  // API call for PostProduct
  const PostProduct = async (values: any) => {
    try {
      SetLoading(true);
      // close the Keyboard
      Keyboard.dismiss();

      // Check if there's atleast one image in the Files array
      let checkImageIndex = Files.findIndex(
        (file) => file.mimeType.slice(0, 5) === "image"
      );

      if (checkImageIndex === -1) {
        Helper.ShowToast("Please select atleast one image");
        SetLoading(false);
        return;
      }

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

      const apiResponse = await BuySellAPI.PostNewBuySellItem(
        formData,
        auth_token
      );

      if (apiResponse.ok) Helper.ShowToast("Product Posted Successfully");
      SetLoading(false);

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
        initialValues={BuySellSchema.BuyProductInitialValues}
        onSubmit={PostProduct}
        validationSchema={BuySellSchema.BuyProductValidationSchema}
      >
        <AppRow
          justifyContent="space-between"
          alignItems="center"
          marginBottom={10}
        >
          <AppText
            text="New Buy/Sell item"
            family={FontNames.Mulish_Bold}
            size={23}
          />
          <AppSubmitButton
            CustomButton={(props) => (
              <AppIcon
                family={IconNames.MaterialIcons}
                name="done"
                size={35}
                loading={Loading}
                onPress={props.onPress}
              />
            )}
          />
        </AppRow>

        <AppFormField placeholder="Name" label="Name" title="name" />

        <AppFormField placeholder="Price" label="Price" title="price" />

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

      {Files.map((item, index) => (
        <FilePreviewCard
          {...item}
          key={item._id.toString()}
          onPress={() => RemoveDocument(item._id)}
          onViewPress={() =>
            navigation.navigate(ScreenNames.VideoPlayerScreen, item)
          }
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

// Exporting the PostNewBuyItemScreen component with the states and dispatchers
export default connect(mapStateToProps, null)(PostNewBuyItemScreen);

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
