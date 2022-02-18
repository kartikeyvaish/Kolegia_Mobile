// Packages imports
import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

// components/screens imports
import AppForm from "../../components/AppForm";
import AppFormField from "./../../components/AppFormField";
import AppIcon from "../../components/AppIcon";
import AppRow from "../../components/AppRow";
import AppSubmitButton from "../../components/AppSubmitButton";
import AppText from "../../components/AppText";
import BuySellAPI from "./../../api/BuySellAPI";
import BuySellSchema, { BuyProductInitialValuesProps } from "../../schema/BuySellItemSchema";
import ColorPallete from "../../utils/ColorPallete";
import FilePreviewCard from "../../components/FilePreviewCard";
import FontNames from "../../constants/FontNames";
import Helper from "../../utils/Helper";
import IconNames from "../../constants/IconNames";
import ToastMessages from "./../../constants/Messages";
import useLoading from "../../hooks/useLoading";
import useImagePicker from "../../hooks/useImagePicker";
import AppPicker from "../../components/AppPicker";
import { LOST_FOUND_CATEGORY } from "../../schema/LostFoundItemSchema";
import ColorPicker from "../../components/ColorPicker";
import DatePicker from "../../components/DatePicker";

// functional components for PostNewBuyItemScreen
function PostNewBuyItemScreen({ navigation, User, route }: any) {
  // Destructure the props
  const { auth_token } = User;
  const initial_fields: BuyProductInitialValuesProps = route.params;
  const initial_files = route.params?.files;

  // Custom Hooks
  const { Loading, SetLoading } = useLoading({ initialValue: false });
  const { Files, PickDocument, RemoveDocument, deleted_files } = useImagePicker({
    initial_files,
  });

  // API call for Editing Product
  const EditProduct = async (values: any) => {
    try {
      SetLoading(true);
      // close the Keyboard
      Keyboard.dismiss();

      // Check if there's atleast one image in the Files array
      let checkImageIndex = Files.findIndex(file => file.mimeType.slice(0, 5) === "image");

      if (checkImageIndex === -1) {
        Helper.ShowToast("Please select atleast one image");
        SetLoading(false);
        return;
      }

      // Prepare a formData object
      const formData = new FormData();

      formData.append("product_id", route.params._id);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("brand", values.brand);
      formData.append("category", values.category);
      formData.append("color", values.color);
      formData.append("bought_datetime", values.bought_datetime ?? null);
      formData.append("warranty_till", values.warranty_till ?? null);

      // Append to_be_deleted array to formData
      deleted_files.forEach(file => {
        formData.append("to_be_deleted[]", file);
      });

      // Now append the files to the formData in the `files` property
      Files.forEach(file => {
        if (!file.public_id) {
          let eachFile: any = {
            name: file.name,
            type: file.mimeType,
            uri: file.uri,
          };

          formData.append("files", eachFile);
        }
      });

      const apiResponse = await BuySellAPI.EditBuySellItem(formData, auth_token);

      if (apiResponse.ok) Helper.ShowToast("Product Edited Successfully");

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
        initialValues={initial_fields}
        onSubmit={values => EditProduct(values)}
        validationSchema={BuySellSchema.BuyProductValidationSchema}
      >
        <AppRow justifyContent="space-between" alignItems="center" marginBottom={10}>
          <AppText text="Edit item" family={FontNames.Mulish_Bold} size={23} />
          <AppSubmitButton
            CustomButton={props => (
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

        <AppFormField placeholder="Name" label="Name" title="name" controlled mandatory={true} />

        <AppFormField
          placeholder="Price"
          label="Price"
          title="price"
          controlled
          keyboardType="numeric"
          mandatory={true}
        />

        <AppFormField
          placeholder="Description"
          label="Description"
          multiline={true}
          containerStyle={{ maxHeight: 150 }}
          mode="outlined"
          title="description"
          mandatory={true}
          controlled
        />

        <AppPicker
          items={LOST_FOUND_CATEGORY}
          formTitle="category"
          other_title="other_category_name"
          initialValue={route.params?.category ?? null}
        />

        <AppFormField placeholder="Brand" title="brand" controlled={true} mandatory={true} />

        <ColorPicker title="color" placeholder="Color" controlled={true} />

        <DatePicker
          placeholder="Bought Date"
          label="+ Add Bought Date"
          formTitle="bought_datetime"
          noMaxLimit={true}
        />

        <DatePicker
          placeholder="Warranty Date"
          label="+ Add Warranty Limit"
          formTitle="warranty_till"
          noMaxLimit={true}
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
        />
      ))}
    </ScrollView>
  );
}

// Redux store that holds the states
const mapStateToProps = state => {
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
    marginTop: 20,
  },
});
