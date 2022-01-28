// Packages imports
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import { FadeInLeft } from "react-native-reanimated";

// Local imports
import AnimatedView from "./../../components/AnimatedView";
import AppLoading from "./../../components/AppLoading";
import AppText from "./../../components/AppText";
import Helper from "./../../utils/Helper";
import MyRequirementsListCard from "./../../components/MyRequirementsListCard";
import RequirementsAPI from "./../../api/RequirementsAPI";
import ScreenNames from "../../navigation/ScreenNames";
import SearchBar from "./../../components/SearchBar";
import ToastMessages from "./../../constants/Messages";

// function component for RequirementsFeedScreen
function RequirementsFeedScreen({ navigation, User }) {
  // Local Refs
  const After_ID = useRef<string | null>(null);

  // Local states
  const [Loading, SetLoading] = useState(false);
  const [Requirements, SetRequirement] = useState([]);
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
      await GetRequirementList();
      SetLoading(false);
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  // API call to get the list of products
  const GetRequirementList = async () => {
    try {
      const apiResponse = await RequirementsAPI.RequirementFeed(
        After_ID.current,
        User?.auth_token
      );

      if (apiResponse.ok) {
        // Get the Requirements
        let requirements = apiResponse.data.requirements;

        // If the requirements array is not empty
        if (requirements.length) {
          // Set the After_ID to the last item in the list
          After_ID.current = requirements[requirements.length - 1]._id;

          // Append the requirements to the existing list
          SetRequirement([...Requirements, ...requirements]);
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
      await GetRequirementList();
      SetRefreshing(false);
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetRefreshing(false);
    }
  };

  // perform a Search call and update the state accordingly
  const SearchAPICall = async () => {
    try {
    } catch (error) {}
  };

  // Render
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        onComplete={SearchAPICall}
        value={SearchQuery}
        onChangeText={SetSearchQuery}
      />

      {Loading ? (
        <AppLoading loadingText="Fetching Requirements.." />
      ) : (
        <FlatList
          data={Requirements}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <AnimatedView entering={FadeInLeft}>
              <MyRequirementsListCard
                {...item}
                onPress={
                  User?._id === item.posted_by
                    ? () =>
                        navigation.navigate(
                          ScreenNames.EditRequirementsScreen,
                          item
                        )
                    : null
                }
              />
            </AnimatedView>
          )}
          contentContainerStyle={styles.FlatList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <AppText text="No Feed as of now" size={20} />
            </View>
          }
          refreshing={Refreshing}
          onRefresh={Refresh}
        />
      )}
    </View>
  );
}

// Map State to Props
const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

// Connect and Export the component
export default connect(mapStateToProps)(RequirementsFeedScreen);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  FlatList: {
    flexGrow: 1,
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
