// Packages Imports
import { useContext } from "react";
import { View, StyleSheet } from "react-native";

// Local imports
import GlobalContext from "../../contexts/GlobalContext";
import IconNames from "../../constants/IconNames";
import MenuCard from "./../../components/MenuCard";
import ScreenNames from "../../navigation/ScreenNames";

// function component for SettingsScreen
function SettingsScreen({ navigation }) {
  // Get the User
  const { User } = useContext(GlobalContext);

  // Render
  return (
    <View style={styles.container}>
      <MenuCard
        name="Change Password"
        prefixIconProps={{
          family: IconNames.MaterialCommunityIcons,
          name: "form-textbox-password",
        }}
        showMenu={User ? true : false}
        borderBottomWidth={1}
        onPress={() => navigation.navigate(ScreenNames.ChangePasswordScreen)}
      />

      <MenuCard
        name="Appearance"
        prefixIconProps={{
          family: IconNames.Ionicons,
          name: "color-palette",
        }}
        borderBottomWidth={1}
        onPress={() => navigation.navigate(ScreenNames.ChangeThemeScreen)}
      />

      <MenuCard
        name="Notifications"
        prefixIconProps={{
          family: IconNames.Ionicons,
          name: "notifications",
        }}
        showMenu={User ? true : false}
        borderBottomWidth={1}
        onPress={() =>
          navigation.navigate(ScreenNames.NotificationsPreferenceScreen)
        }
      />

      <MenuCard
        name="About"
        prefixIconProps={{
          family: IconNames.AntDesign,
          name: "infocirlceo",
        }}
        borderBottomWidth={1}
        onPress={() => navigation.navigate(ScreenNames.AboutScreen)}
      />
    </View>
  );
}

// Exports
export default SettingsScreen;

// Styles
const styles = StyleSheet.create({
  container: {},
});
