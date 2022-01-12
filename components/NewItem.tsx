// Packages Imports
import { View, StyleSheet, Pressable } from "react-native";

// Local files imports
import AppText from "./AppText";
import AppIcon from "./AppIcon";
import ColorPallete from "../utils/ColorPallete";
import IconNames from "../constants/IconNames";

// NewItem component
function NewItem({ title, description, onPress }: any) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={{ flex: 1, marginRight: 20 }}>
        <AppText text={title} size={20} />
        <AppText text={description} size={16} />
      </View>

      <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
        <AppIcon family={IconNames.AntDesign} name="pluscircle" size={40} />
      </Pressable>
    </Pressable>
  );
}

// exports
export default NewItem;

// Styles
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: "row",
    padding: 15,
    borderColor: ColorPallete.grey,
    borderWidth: 1,
  },
});
