// Packages Imports
import { View, StyleSheet } from "react-native";

// Components/Types imports
import AppText from "./AppText";
import { AppHeaderBarProps } from "../types/ComponentTypes";
import AppIcon from "./AppIcon";
import IconNames from "../constants/IconNames";
import { useTheme } from "@react-navigation/native";

// Function component that renders the AppHeaderBar
function AppHeaderBar({ title, onIconPress }: AppHeaderBarProps) {
  // Theme Hook
  const { colors } = useTheme();

  // Render
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppText text={title} size={25} />
      <AppIcon
        family={IconNames.AntDesign}
        name={"logout"}
        size={28}
        onPress={onIconPress}
      />
    </View>
  );
}

// Exports
export default AppHeaderBar;

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
  },
});
