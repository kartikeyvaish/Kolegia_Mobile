// Packages Imports
import { createStackNavigator } from "@react-navigation/stack";

// Screen imports
import BuySellFeedScreen from "./../screens/BuySellFeedScreen";
import ChatsScreen from "./../screens/ChatsScreen";
import IntroductionScreen from "../screens/IntroductionScreen";
import LoginScreen from "./../screens/LoginScreen";
import LostFoundFeedScreen from "./../screens/LostFoundFeedScreen";
import MyRequirementsScreen from "./../screens/MyRequirementsScreen";
import PostNewBuyItemScreen from "../screens/PostNewBuyItemScreen";
import PostNewLostItemScreen from "../screens/PostNewLostItemScreen";
import PostNewRequirementScreen from "../screens/PostNewRequirementScreen";
import RequirementsFeedScreen from "./../screens/RequirementsFeedScreen";
import SignUpScreen from "../screens/SignUpScreen";

// Types/components/Navigators imports
import AppContainer from "./../components/AppContainer";
import ScreenNames from "./ScreenNames";
import TabNavigator from "./TabNavigator";

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
          name={ScreenNames.BuySellFeedScreen}
          component={BuySellFeedScreen}
        />
        <Stack.Screen name={ScreenNames.ChatsScreen} component={ChatsScreen} />
        <Stack.Screen
          name={ScreenNames.LostFoundFeedScreen}
          component={LostFoundFeedScreen}
        />
        <Stack.Screen
          name={ScreenNames.MyRequirementsScreen}
          component={MyRequirementsScreen}
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

        {/* Auth Screens */}

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
