// Packages Import
import { View, StyleSheet, Image } from "react-native";
import { useTheme } from "@react-navigation/native";

// Local Files Imports
import AppCard from "./AppCard";
import AppText from "./AppText";
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";

// Functional Component for ProfileScreen
function DashboardMenuCard({ uri, heading, description, onPress }: any) {
  // Theme
  const { colors } = useTheme();

  // Render
  return (
    <AppCard
      style={[styles.container, { backgroundColor: colors.background }]}
      onPress={onPress}
    >
      <Image source={{ uri: uri }} style={{ width: 100, height: 100 }} />
      <View style={{ flex: 1, padding: 10, paddingLeft: 30 }}>
        <AppText
          text={heading}
          family={FontNames.Mulish_Bold}
          size={25}
          numberOfLines={1}
        />
        <AppText
          text={description}
          family={FontNames.Inter_Regular}
          size={15}
        />
      </View>
    </AppCard>
  );
}

// Exports
export default DashboardMenuCard;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: ColorPallete.grey,
  },
});
