// Packages imports
import { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";

// Local components imports
import AppButton from "../../components/AppButton";
import Caraousel from "../../components/Caraousel";
import ColorPallete from "../../utils/ColorPallete";
import GlobalContext from "../../contexts/GlobalContext";
import Helper from "../../utils/Helper";
import LayoutConstants from "../../constants/Layout";
import LostFoundAPI from "../../api/LostFoundAPI";
import OwnerDetailsCard from "./../../components/OwnerDetailsCard";
import ScreenNames from "../../navigation/ScreenNames";
import AppText from "../../components/AppText";
import FontNames from "../../constants/FontNames";

// function component for LostFoundProductDetailsScreen
function LostFoundProductDetailsScreen({ navigation, route }) {
  // Local States
  const [ProductDetails, SetProductDetails] = useState(route.params);
  const [Refreshing, SetRefreshing] = useState(false);

  // Destructuring State
  const { files, description, name, _id, posted_by, owner_details } =
    ProductDetails;

  // Context vars
  const { User, setVisible, setText } = useContext(GlobalContext);

  // Delete Product function
  const DeleteProduct = async (_id: any) => {
    try {
      setText("Deleting Product");
      setVisible(true);

      const apiResponse = await LostFoundAPI.DeleteLostFoundItem(
        { product_id: _id },
        User?.auth_token
      );

      setVisible(false);
      Helper.ShowToast(apiResponse.data.message);
      navigation.popToTop();
    } catch (error) {
      setVisible(false);
    }
  };

  // function to be called when the user wants to delete the product
  const ShowDeleteConfirmation = () => {
    try {
      Helper.ShowAlert(
        "Delete Product",
        "Are you sure you want to delete this product?",
        [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Delete",
            onPress: () => DeleteProduct(_id),
          },
        ],
        {
          cancelable: true,
        }
      );
    } catch (error) {}
  };

  // function to get product details
  const GetProductDetails = async () => {
    try {
      const response = await LostFoundAPI.GetLostFoundItemDetails(
        _id,
        User?.auth_token
      );
      if (response.ok) SetProductDetails(response.data.Product);
    } catch (error) {}
  };

  // function to be called on Refresh
  const Refresh = async () => {
    try {
      SetRefreshing(true);
      await GetProductDetails();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // Render
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, marginTop: 15, flexGrow: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        refreshControl={
          <RefreshControl refreshing={Refreshing} onRefresh={Refresh} />
        }
      >
        {files?.length > 0 ? (
          <View style={styles.imageContainer}>
            <Caraousel files={files} />
          </View>
        ) : null}

        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <AppText
            text={name}
            size={22}
            family={FontNames.Sofia_Pro_Bold}
            marginBottom={5}
          />

          <AppText text={description} size={18} />
        </View>

        <OwnerDetailsCard owner_details={owner_details} />
      </ScrollView>

      <View style={{ flexDirection: "row" }}>
        {posted_by === User?._id ? (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <AppButton
                title="DELETE"
                borderRadius={2}
                backgroundColor={ColorPallete.red}
                onPress={ShowDeleteConfirmation}
              />
            </View>
            <View style={{ flex: 1 }}>
              <AppButton
                title="EDIT"
                borderRadius={2}
                backgroundColor={ColorPallete.dodgerblue}
                onPress={() =>
                  navigation.navigate(
                    ScreenNames.EditLostFoundItemScreen,
                    ProductDetails
                  )
                }
              />
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <AppButton
              title="Raise Hand"
              borderRadius={2}
              backgroundColor={ColorPallete.dodgerblue}
              onPress={
                User
                  ? () =>
                      navigation.navigate(ScreenNames.RaiseHandOnItemScreen, {
                        product_id: _id,
                      })
                  : () => navigation.navigate(ScreenNames.LoginScreen)
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}

// Exports
export default LostFoundProductDetailsScreen;

// Styles
const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    width: LayoutConstants.ScreenWidth,
    height: LayoutConstants.ScreenWidth,
  },
});
