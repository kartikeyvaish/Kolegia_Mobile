// Packages Imports
import { useContext } from "react";
import { StyleSheet } from "react-native";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

// Screen imports
import HomeScreen from "./../screens/HomeScreen";
import MyResponsesScreen from "../screens/Chats/MyResponsesScreen";
import PostNewItemScreen from "./../screens/Misc/PostNewItemScreen";
import ProfileScreen from "./../screens/Profile/ProfileScreen";
import ScreenNames from "./ScreenNames";

// Types/components imports
import AppIcon from "./../components/AppIcon";
import ColorPallete from "../utils/ColorPallete";
import GlobalContext from "../contexts/GlobalContext";
import IconNames from "../constants/IconNames";
import FontNames from "../constants/FontNames";

// Tab navigator
const Tab = createBottomTabNavigator();

// Tab navigator screens
function TabNavigator() {
  // Get the User object from the global context
  const { User, RaisedHandsCount } = useContext(GlobalContext);

  // TabBar Screen options
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: ColorPallete.primary,
    tabBarInactiveTintColor: ColorPallete.white,
    tabBarStyle: styles.tabBarStyle,
  };

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      screenListeners={({ navigation }) => ({
        tabPress: (e: any) => {
          if (User === null) {
            e.preventDefault();
            navigation.navigate(ScreenNames.IntroductionScreen);
          }
        },
      })}
    >
      <Tab.Screen
        name={ScreenNames.HomeTabScreen}
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: (props: any) => (
            <AppIcon
              family={IconNames.Ionicons}
              name={props.focused ? "home" : "home-outline"}
              size={props.size}
              color={props.color}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e: any) => {
            e.preventDefault();
            navigation.navigate(ScreenNames.HomeTabScreen);
          },
        })}
      />
      <Tab.Screen
        name={ScreenNames.PostNewItemScreen}
        component={PostNewItemScreen}
        options={{
          tabBarLabel: "New Item",
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
        name={ScreenNames.MyResponsesScreen}
        component={MyResponsesScreen}
        options={{
          tabBarLabel: "Responses",
          tabBarBadge: RaisedHandsCount > 0 ? RaisedHandsCount : null,
          tabBarBadgeStyle: {
            color: ColorPallete.white,
            backgroundColor: ColorPallete.red,
            fontFamily: FontNames.Sofia_Pro_Bold,
          },
          tabBarIcon: (props: any) => (
            <AppIcon
              family={IconNames.AntDesign}
              name={props.focused ? "like1" : "like2"}
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
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 8,
    height: 70,
    borderRadius: 12,
    elevation: 5,
  },
});
