// Packages imports
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { FadeInLeft } from "react-native-reanimated";

// Local imports
import AnimatedView from "../../components/AnimatedView";
import AppLoading from "../../components/AppLoading";
import AppContainer from "../../components/AppContainer";
import Helper from "../../utils/Helper";
import LostFoundAPI from "../../api/LostFoundAPI";
import LoadMoreComponent from "../../components/LoadMoreComponent";
import MyProductListCard from "../../components/MyProductListCard";
import ScreenNames from "../../navigation/ScreenNames";
import SearchBar from "../../components/SearchBar";
import ToastMessages from "../../constants/Messages";

// function component for LostItemsFeedScreen
function LostItemsFeedScreen({ navigation, User }) {
  // Local Refs
  const After_ID = useRef<string | null>(null);

  // Local states
  const [IsDataLeft, SetIsDataLeft] = useState(true);
  const [Loading, SetLoading] = useState(false);
  const [SearchProducts, SetSearchProducts] = useState([]);
  const [SearchLoading, SetSearchLoading] = useState(false);
  const [Products, SetProducts] = useState([]);
  const [Refreshing, SetRefreshing] = useState(false);
  const [SearchQuery, SetSearchQuery] = useState("");

  // intial call to get the data
  useEffect(() => {
    InitialCall();
  }, []);

  // function to get the data initally
  const InitialCall = async () => {
    try {
      SetLoading(true);
      await GetLostFoundList();
      SetLoading(false);
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  // API call to get the list of products
  const GetLostFoundList = async () => {
    try {
      const apiResponse = await LostFoundAPI.GetLostFoundFeed(
        After_ID.current,
        User?.auth_token
      );

      if (apiResponse.ok) {
        // Get the Products
        let products = apiResponse.data.products;

        // If the products array is not empty
        if (products.length) {
          // Set the After_ID to the last item in the list
          After_ID.current = products[products.length - 1]._id;

          // Append the products to the existing list
          SetProducts([...Products, ...products]);
        } else {
          SetIsDataLeft(false);
        }
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {}
  };

  // function to be called onRefresh
  const Refresh = async () => {
    try {
      SetRefreshing(true);
      await GetLostFoundList();
      SetRefreshing(false);
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetRefreshing(false);
    }
  };

  // perform a Search call and update the state accordingly
  const SearchAPICall = async () => {
    try {
      SetSearchLoading(true);
      const apiResponse = await LostFoundAPI.SearchLostFoundItems(
        SearchQuery,
        User?.auth_token
      );

      if (apiResponse.ok) {
        SetSearchProducts(apiResponse.data.products);
      }

      SetSearchLoading(false);
    } catch (error) {
      SetSearchLoading(false);
    }
  };

  // render Item for Flatlist
  const renderItem = ({ item }) => (
    <AnimatedView entering={FadeInLeft}>
      <MyProductListCard
        {...item}
        onPress={() =>
          navigation.navigate(
            User
              ? ScreenNames.LostFoundProductDetailsScreen
              : ScreenNames.IntroductionScreen,
            item
          )
        }
      />
    </AnimatedView>
  );

  // Render
  return (
    <AppContainer>
      <SearchBar
        placeholder="Search"
        onComplete={SearchAPICall}
        value={SearchQuery}
        onChangeText={SetSearchQuery}
      />

      {Loading ? (
        <AppLoading loadingText="Fetching Products.." />
      ) : SearchQuery.length ? (
        SearchLoading ? (
          <AppLoading loadingText="Searching for Results" loading={true} />
        ) : (
          <FlatList
            data={SearchProducts}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={
              <AppLoading
                loadingText="No Search Results found"
                loading={false}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )
      ) : (
        <FlatList
          data={Products}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            <AppLoading loadingText="No Feed as of now" loading={false} />
          }
          refreshing={Refreshing}
          onRefresh={Refresh}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            Products.length > 3 ? (
              <LoadMoreComponent isDataLeft={IsDataLeft} />
            ) : null
          }
          onEndReached={Products.length > 3 ? GetLostFoundList : null}
          onEndReachedThreshold={0.3}
        />
      )}
    </AppContainer>
  );
}

// Map State to Props
const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

// Connect and Export the component
export default connect(mapStateToProps)(LostItemsFeedScreen);
