// Packages Imports
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { FadeInLeft } from "react-native-reanimated";

// Local components imports
import AnimatedView from "../../components/AnimatedView";
import AppLoading from "../../components/AppLoading";
import GlobalContext from "../../contexts/GlobalContext";
import Helper from "../../utils/Helper";
import LostFoundAPI from "../../api/LostFoundAPI";
import MyProductListCard from "../../components/MyProductListCard";
import ScreenNames from "../../navigation/ScreenNames";
import ToastMessages from "../../constants/Messages";

function MyLostFoundItemsScreen({ navigation }: any) {
  // Context
  const { User } = useContext(GlobalContext);

  // Local States
  const [Products, SetProducts] = useState([]);
  const [Loading, SetLoading] = useState(true);
  const [Refreshing, SetRefreshing] = useState(false);

  // Initial call for getting the list of products
  useEffect(() => {
    InitialCall();
  }, []);

  // initial Call
  const InitialCall = async () => {
    try {
      SetLoading(true);
      await GetMyBuySellItems();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // Get products posted by the user for selling
  const GetMyBuySellItems = async () => {
    try {
      const response = await LostFoundAPI.GetOwnLostFoundItems(User.auth_token);
      if (response.ok) {
        SetProducts(response.data.Products);
      } else {
        Helper.ShowToast(response.data.message);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // function to be called when the user wants to refresh the list
  const Refresh = async () => {
    try {
      SetRefreshing(true);
      await GetMyBuySellItems();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // render item for FlatList
  const renderItem = ({ item }) => (
    <AnimatedView entering={FadeInLeft}>
      <MyProductListCard
        {...item}
        onPress={() =>
          navigation.navigate(ScreenNames.LostFoundProductDetailsScreen, {
            ...item,
            owner_details: User,
          })
        }
        ShowFoundButton={true}
        owner_details={User}
      />
    </AnimatedView>
  );

  // Render
  return (
    <View style={styles.container}>
      {Loading ? (
        <AppLoading loadingText="Fetching Products.." />
      ) : (
        <FlatList
          data={Products}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            <AppLoading
              loadingText="No Lost-Found products posted by you."
              loading={false}
            />
          }
          refreshing={Refreshing}
          onRefresh={Refresh}
        />
      )}
    </View>
  );
}

// Exports
export default MyLostFoundItemsScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
