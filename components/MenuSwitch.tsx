// Packages Imports
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Switch } from "react-native-paper";

// Local components/Types imports
import AppText from "./AppText";
import ColorPallete from "../utils/ColorPallete";

// function components for MenuSwitch
function MenuSwitch({ title, textProps, onPress, value, loading }: any) {
  // Render
  return (
    <View style={styles.container}>
      <AppText text={title} size={22} {...textProps} />
      {loading ? (
        <ActivityIndicator color={ColorPallete.primary} size={"large"} />
      ) : (
        <Switch
          onValueChange={onPress}
          value={value}
          thumbColor={value ? ColorPallete.primary : ColorPallete.white}
        />
      )}
    </View>
  );
}

// Exports
export default MenuSwitch;

// Styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
});
