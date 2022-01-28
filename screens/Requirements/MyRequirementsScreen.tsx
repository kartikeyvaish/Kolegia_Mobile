// Packages Imports
import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import { FadeInLeft } from "react-native-reanimated";

// Local Imports
import AnimatedView from "../../components/AnimatedView";
import AppText from "../../components/AppText";
import Helper from "./../../utils/Helper";
import MyRequirementsListCard from "./../../components/MyRequirementsListCard";
import RequirementsAPI from "../../api/RequirementsAPI";
import ScreenNames from "../../navigation/ScreenNames";
import ToastMessages from "./../../constants/Messages";

// function component for the MyRequirementsScreen
function MyRequirementsScreen({ User, navigation }) {
  // Local State
  const [Products, SetProducts] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const [Refreshing, SetRefreshing] = useState(false);

  useEffect(() => {
    InitialCall();
  }, []);

  // initial call to the API to get the requirements
  const InitialCall = async () => {
    try {
      SetLoading(true);
      await GetOwnRequirements();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // Get Own requiements API call
  const GetOwnRequirements = async () => {
    try {
      const apiResponse = await RequirementsAPI.GetOwnRequirementsList(
        User.auth_token
      );

      if (apiResponse.ok) {
        SetProducts(apiResponse.data.Requirements);
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  const Refresh = async () => {
    try {
      SetRefreshing(true);
      await GetOwnRequirements();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // If user is null return null
  if (!User) return null;

  // Render the component
  return (
    <View style={styles.container}>
      {Loading ? (
        <View style={styles.emptyContainer}>
          <AppText text="Getting Requirements List.." size={20} />
        </View>
      ) : (
        <FlatList
          data={Products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <AnimatedView entering={FadeInLeft}>
              <MyRequirementsListCard
                {...item}
                onPress={() =>
                  navigation.navigate(ScreenNames.EditRequirementsScreen, item)
                }
              />
            </AnimatedView>
          )}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <AppText text="No Requirements posted by you." size={20} />
            </View>
          }
          refreshing={Refreshing}
          onRefresh={Refresh}
        />
      )}
    </View>
  );
}

// Map State to props
const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

// Connect to Redux
export default connect(mapStateToProps)(MyRequirementsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
