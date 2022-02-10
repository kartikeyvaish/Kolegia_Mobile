// Packages Imports
import { createStackNavigator } from "@react-navigation/stack";

// Screen imports
import AboutScreen from "./../screens/Misc/AboutScreen";
import BuySellEditScreen from "./../screens/BuySell/BuySellEditScreen";
import BuySellFeedScreen from "./../screens/BuySell/BuySellFeedScreen";
import BuySellProductDetailsScreen from "./../screens/BuySell/BuySellProductDetailsScreen";
import EditLostItemScreen from "./../screens/LostFound/EditLostItemScreen";
import EditProfileScreen from "./../screens/Profile/EditProfileScreen";
import EditRequirementsScreen from "./../screens/Requirements/EditRequirementsScreen";
import ChangePasswordScreen from "../screens/Misc/ChangePasswordScreen";
import ChangeThemeScreen from "./../screens/Misc/ChangeThemeScreen";
import ChatsScreen from "./../screens/Chats/ChatsScreen";
import EmailSignUpScreen from "../screens/Auth/EmailSignUp";
import EmailOTPScreen from "../screens/Auth/EmailOTPScreen";
import IntroductionScreen from "./../screens/Auth/IntroductionScreen";
import LoginScreen from "./../screens/Auth/LoginScreen";
import LostItemsFeedScreen from "./../screens/LostFound/LostItemsFeedScreen";
import LostFoundProductDetailsScreen from "../screens/LostFound/LostFoundProductDetailsScreen";
import MyBuySellItemsScreen from "./../screens/BuySell/MyBuySellItemsScreen";
import MyLostFoundItemsScreen from "./../screens/LostFound/MyLostFoundItemsScreen";
import MyRequirementsScreen from "./../screens/Requirements/MyRequirementsScreen";
import NotificationsPreferenceScreen from "./../screens/Misc/NotificationsPreferenceScreen";
import PostNewBuyItemScreen from "../screens/BuySell/PostNewBuyItemScreen";
import PostNewLostItemScreen from "./../screens/LostFound/PostNewLostItemScreen";
import PostNewRequirementScreen from "./../screens/Requirements/PostNewRequirementScreen";
import RaiseHandOnItemScreen from "./../screens/RaiseHands/RaiseHandOnItemScreen";
import RequirementsFeedScreen from "./../screens/Requirements/RequirementsFeedScreen";
import SettingsScreen from "../screens/Misc/SettingsScreen";
import SignUpScreen from "./../screens/Auth/SignUpScreen";

// Types/components/Navigators imports
import AppContainer from "./../components/AppContainer";
import ScreenNames from "./ScreenNames";
import TabNavigator from "./TabNavigator";
import ResetPasswordScreen from "../screens/Auth/ResetPassword";
import ChatRoomScreen from "./../screens/Chats/ChatRoomScreen";
import MyRaisedHandsScreen from "../screens/RaiseHands/MyRaisedHandsScreen";
import VideoPlayerScreen from "../screens/Misc/VideoPlayerScreen";

// Stack Navigator
const Stack = createStackNavigator();

// Function for AppNavigator
function AppNavigator() {
  // Render
  return (
    <AppContainer style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* App Screens */}

        <Stack.Screen name={ScreenNames.HomeScreen} component={TabNavigator} />
        <Stack.Screen
          name={ScreenNames.AboutScreen}
          component={AboutScreen}
          options={{
            headerShown: true,
            headerTitle: "About",
          }}
        />
        <Stack.Screen
          name={ScreenNames.BuySellEditScreen}
          component={BuySellEditScreen}
        />
        <Stack.Screen
          name={ScreenNames.BuySellFeedScreen}
          component={BuySellFeedScreen}
          options={{
            headerShown: true,
            headerTitle: "Buy & Sell",
          }}
        />
        <Stack.Screen
          name={ScreenNames.BuySellProductDetailsScreen}
          component={BuySellProductDetailsScreen}
        />
        <Stack.Screen
          name={ScreenNames.ChatsScreen}
          component={ChatsScreen}
          options={{
            headerShown: true,
            headerTitle: "Chats",
          }}
        />
        <Stack.Screen
          name={ScreenNames.ChatRoomScreen}
          component={ChatRoomScreen}
          options={{
            headerShown: true,
            headerTitle: "Chats",
          }}
        />
        <Stack.Screen
          name={ScreenNames.ChangePasswordScreen}
          component={ChangePasswordScreen}
          options={{ headerShown: true, title: "Change Password" }}
        />
        <Stack.Screen
          name={ScreenNames.ChangeThemeScreen}
          component={ChangeThemeScreen}
          options={{ headerShown: true, title: "Change Theme" }}
        />
        <Stack.Screen
          name={ScreenNames.EditLostItemScreen}
          component={EditLostItemScreen}
        />
        <Stack.Screen
          name={ScreenNames.EditProfileScreen}
          component={EditProfileScreen}
          options={{ headerShown: true, title: "Edit Profile" }}
        />
        <Stack.Screen
          name={ScreenNames.EmailSignUpScreen}
          component={EmailSignUpScreen}
        />
        <Stack.Screen
          name={ScreenNames.EmailOTPScreen}
          component={EmailOTPScreen}
        />
        <Stack.Screen
          name={ScreenNames.LostItemsFeedScreen}
          component={LostItemsFeedScreen}
          options={{
            headerShown: true,
            headerTitle: "Lost & Found",
          }}
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
            headerTitle: "My Lost Items",
          }}
        />
        <Stack.Screen
          name={ScreenNames.MyRaisedHandsScreen}
          component={MyRaisedHandsScreen}
          options={{
            headerShown: true,
            headerTitle: "My Raised Hands",
          }}
        />
        <Stack.Screen
          name={ScreenNames.NotificationsPreferenceScreen}
          component={NotificationsPreferenceScreen}
          options={{
            headerShown: true,
            headerTitle: "Push Notifications",
          }}
        />
        <Stack.Screen
          name={ScreenNames.EditRequirementsScreen}
          component={EditRequirementsScreen}
          options={{
            headerShown: true,
            headerTitle: "Edit Requirement",
          }}
        />
        <Stack.Screen
          name={ScreenNames.MyRequirementsScreen}
          component={MyRequirementsScreen}
          options={{
            headerShown: true,
            headerTitle: "My Requirements",
          }}
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
          options={{
            headerShown: true,
            headerTitle: "Post New Requirement",
          }}
        />
        <Stack.Screen
          name={ScreenNames.RequirementsFeedScreen}
          component={RequirementsFeedScreen}
          options={{
            headerShown: true,
            headerTitle: "Requirments Feed",
          }}
        />
        <Stack.Screen
          name={ScreenNames.RaiseHandOnItemScreen}
          component={RaiseHandOnItemScreen}
        />
        <Stack.Screen
          name={ScreenNames.SettingsScreen}
          component={SettingsScreen}
          options={{
            headerShown: true,
            headerTitle: "Settings",
          }}
        />
        <Stack.Screen
          name={ScreenNames.ResetPasswordScreen}
          component={ResetPasswordScreen}
          options={{
            headerShown: true,
            headerTitle: "Reset Password",
          }}
        />
        <Stack.Screen
          name={ScreenNames.VideoPlayerScreen}
          component={VideoPlayerScreen}
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
