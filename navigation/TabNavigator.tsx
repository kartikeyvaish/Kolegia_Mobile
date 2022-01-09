// Packages Imports
import { StyleSheet } from "react-native";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

// Screen imports
import DashBoardScreen from "./../screens/DashBoardScreen";
import NotificationsScreen from "./../screens/NotificationsScreen";
import PostNewItemScreen from "./../screens/PostNewItemScreen";
import ProfileScreen from "./../screens/ProfileScreen";
import ScreenNames from "./ScreenNames";

// Types/components imports
import AppIcon from "./../components/AppIcon";
import ColorPallete from "../utils/ColorPallete";
import IconNames from "../constants/IconNames";

// Tab navigator
const Tab = createBottomTabNavigator();

// Tab navigator screens
function TabNavigator() {
  // TabBar Screen options
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: ColorPallete.primary,
    tabBarInactiveTintColor: ColorPallete.white,
    tabBarStyle: styles.tabBarStyle,
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={ScreenNames.DashBoardScreen}
        component={DashBoardScreen}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: (props: any) => (
            <AppIcon
              family={IconNames.Ionicons}
              name={props.focused ? "home" : "home-outline"}
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.PostNewItemScreen}
        component={PostNewItemScreen}
        options={{
          tabBarLabel: "Post",
          tabBarIcon: (props: any) => (
            <AppIcon
              family={IconNames.AntDesign}
              name={props.focused ? "pluscircle" : "pluscircleo"}
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.NotificationsScreen}
        component={NotificationsScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: (props: any) => (
            <AppIcon
              family={IconNames.FontAwesome}
              name={props.focused ? "bell" : "bell-o"}
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.ProfileScreen}
        component={ProfileScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: (props: any) => (
            <AppIcon
              family={IconNames.FontAwesome}
              name={props.focused ? "user" : "user-o"}
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Exporting TabNavigator
export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: ColorPallete.purple,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    height: 80,
    borderRadius: 12,
    elevation: 5,
  },
});
