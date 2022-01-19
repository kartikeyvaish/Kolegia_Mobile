// Packages Imports
import { createStackNavigator } from "@react-navigation/stack";

// Screen imports
import BuySellEditScreen from "./../screens/BuySell/BuySellEditScreen";
import BuySellFeedScreen from "./../screens/BuySell/BuySellFeedScreen";
import BuySellProductDetailsScreen from "./../screens/BuySell/BuySellProductDetailsScreen";
import ChatsScreen from "./../screens/Chats/ChatsScreen";
import GoogleSignUpScreen from "./../screens/Auth/GoogleSignUpScreen";
import IntroductionScreen from "./../screens/Auth/IntroductionScreen";
import LoginScreen from "./../screens/Auth/LoginScreen";
import LostFoundFeedScreen from "./../screens/LostFound/LostFoundFeedScreen";
import MyBuySellItemsScreen from "./../screens/BuySell/MyBuySellItemsScreen";
import MyRequirementsScreen from "./../screens/Requirements/MyRequirementsScreen";
import PostNewBuyItemScreen from "../screens/BuySell/PostNewBuyItemScreen";
import PostNewLostItemScreen from "./../screens/LostFound/PostNewLostItemScreen";
import PostNewRequirementScreen from "./../screens/Requirements/PostNewRequirementScreen";
import RequirementsFeedScreen from "./../screens/Requirements/RequirementsFeedScreen";
import SignUpScreen from "./../screens/Auth/SignUpScreen";

// Types/components/Navigators imports
import AppContainer from "./../components/AppContainer";
import ScreenNames from "./ScreenNames";
import TabNavigator from "./TabNavigator";
import MyLostFoundItemsScreen from "./../screens/LostFound/MyLostFoundItemsScreen";
import LostFoundProductDetailsScreen from "../screens/LostFound/LostFoundProductDetailsScreen";
import RaiseHandOnItemScreen from "./../screens/RaiseHands/RaiseHandOnItemScreen";
import EditLostFoundItemScreen from "./../screens/LostFound/EditLostFoundItemScreen";

// Stack Navigator
const Stack = createStackNavigator();

// Function for AppNavigator
function AppNavigator() {
  // Render
  return (
    <AppContainer style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* App Screens */}

        <Stack.Screen name={ScreenNames.HomeScreen} component={TabNavigator} />
        <Stack.Screen
          name={ScreenNames.BuySellEditScreen}
          component={BuySellEditScreen}
        />
        <Stack.Screen
          name={ScreenNames.BuySellFeedScreen}
          component={BuySellFeedScreen}
        />
        <Stack.Screen
          name={ScreenNames.BuySellProductDetailsScreen}
          component={BuySellProductDetailsScreen}
        />
        <Stack.Screen name={ScreenNames.ChatsScreen} component={ChatsScreen} />
        <Stack.Screen
          name={ScreenNames.EditLostFoundItemScreen}
          component={EditLostFoundItemScreen}
        />
        <Stack.Screen
          name={ScreenNames.LostFoundFeedScreen}
          component={LostFoundFeedScreen}
        />
        <Stack.Screen
          name={ScreenNames.MyBuySellItemsScreen}
          component={MyBuySellItemsScreen}
          options={{
            headerShown: true,
            headerTitle: "My Buy Sell Items",
          }}
        />
        <Stack.Screen
          name={ScreenNames.MyLostFoundItemsScreen}
          component={MyLostFoundItemsScreen}
          options={{
            headerShown: true,
            headerTitle: "My Lost Found Items",
          }}
        />
        <Stack.Screen
          name={ScreenNames.MyRequirementsScreen}
          component={MyRequirementsScreen}
        />
        <Stack.Screen
          name={ScreenNames.LostFoundProductDetailsScreen}
          component={LostFoundProductDetailsScreen}
        />
        <Stack.Screen
          name={ScreenNames.PostNewBuyItemScreen}
          component={PostNewBuyItemScreen}
        />
        <Stack.Screen
          name={ScreenNames.PostNewLostItemScreen}
          component={PostNewLostItemScreen}
        />
        <Stack.Screen
          name={ScreenNames.PostNewRequirementScreen}
          component={PostNewRequirementScreen}
        />
        <Stack.Screen
          name={ScreenNames.RequirementsFeedScreen}
          component={RequirementsFeedScreen}
        />
        <Stack.Screen
          name={ScreenNames.RaiseHandOnItemScreen}
          component={RaiseHandOnItemScreen}
        />

        {/* Auth Screens */}

        <Stack.Screen
          name={ScreenNames.GoogleSignUpScreen}
          component={GoogleSignUpScreen}
        />
        <Stack.Screen
          name={ScreenNames.IntroductionScreen}
          component={IntroductionScreen}
        />
        <Stack.Screen name={ScreenNames.LoginScreen} component={LoginScreen} />
        <Stack.Screen
          name={ScreenNames.SignUpScreen}
          component={SignUpScreen}
        />
      </Stack.Navigator>
    </AppContainer>
  );
}

// Exporting AppNavigator
export default AppNavigator;
