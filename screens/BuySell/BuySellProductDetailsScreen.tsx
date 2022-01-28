// Packages imports
import { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";

// Local components imports
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import BuySellAPI from "../../api/BuySellAPI";
import Caraousel from "../../components/Caraousel";
import ColorPallete from "../../utils/ColorPallete";
import FontNames from "../../constants/FontNames";
import GlobalContext from "../../contexts/GlobalContext";
import Helper from "../../utils/Helper";
import LayoutConstants from "../../constants/Layout";
import ScreenNames from "../../navigation/ScreenNames";
import OwnerDetailsCard from "../../components/OwnerDetailsCard";
import ChatsAPI from "./../../api/ChatsAPI";
import ToastMessages from "./../../constants/Messages";
import useLoading from "./../../hooks/useLoading";

// function component for BuySellProductDetailsScreen
function BuySellProductDetailsScreen({ navigation, route }) {
  const [ProductDetails, SetProductDetails] = useState(route.params);
  const [Refreshing, SetRefreshing] = useState(false);
  const { Loading, SetLoading } = useLoading({});

  // Destructuring State
  const { files, description, name, price, _id, posted_by, owner_details } =
    ProductDetails;

  // Context vars
  const { User, setVisible, setText } = useContext(GlobalContext);

  // converting to indian format
  let formattedPrice = Helper.convert_to_rupees(price);

  // Delete Product function
  const DeleteProduct = async (_id: any) => {
    try {
      setText("Deleting Product");
      setVisible(true);
      const apiResponse = await BuySellAPI.DeleteBuySellItem(
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
  const ShowDeleteConfirmation = (_id: any) => {
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

  // Contact Seller function
  const ContactSeller = async () => {
    try {
      SetLoading(true);

      const apiResponse = await ChatsAPI.ContactSeller(
        { reciever_id: posted_by },
        User.auth_token
      );

      SetLoading(false);

      if (apiResponse.ok) {
        navigation.navigate(ScreenNames.ChatRoomScreen, {
          _id: apiResponse.data.room._id,
          chatting_with: owner_details,
        });
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      SetLoading(false);
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // function to get product details
  const GetProductDetails = async () => {
    try {
      const response = await BuySellAPI.GetBuySellProductDetails(
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
        <View style={styles.imageContainer}>
          <Caraousel files={files} />
        </View>

        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <AppText
            text={name}
            size={22}
            family={FontNames.Sofia_Pro_Bold}
            marginBottom={5}
          />

          <AppText
            text={formattedPrice}
            size={22}
            family={FontNames.Sofia_Pro_Bold}
            marginBottom={5}
            color={ColorPallete.green}
          />

          <AppText text={description} size={18} />
        </View>

        <OwnerDetailsCard owner_details={owner_details} />
      </ScrollView>

      <View style={{ flexDirection: "row" }}>
        {posted_by === User?._id ? (
          <>
            <View style={{ flex: 1 }}>
              <AppButton
                title="DELETE"
                borderRadius={2}
                backgroundColor={ColorPallete.red}
                onPress={() => ShowDeleteConfirmation(_id)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <AppButton
                title="EDIT"
                borderRadius={2}
                backgroundColor={ColorPallete.dodgerblue}
                onPress={() =>
                  navigation.navigate(
                    ScreenNames.BuySellEditScreen,
                    route.params
                  )
                }
              />
            </View>
          </>
        ) : (
          <View style={{ flex: 1 }}>
            <AppButton
              title="Contact Seller."
              borderRadius={2}
              backgroundColor={ColorPallete.dodgerblue}
              loading={Loading}
              onPress={
                User
                  ? ContactSeller
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
export default BuySellProductDetailsScreen;

// Styles
const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    width: LayoutConstants.ScreenWidth,
    height: LayoutConstants.ScreenWidth,
  },
});
