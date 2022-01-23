// Packages Import
import { View, StyleSheet, ActivityIndicator } from "react-native";

// Local components/types import
import FontNames from "../constants/FontNames";
import ColorPallete from "../utils/ColorPallete";
import AppText from "./AppText";

// function component for LoadMoreComponent
function LoadMoreComponent({
  isDataLeft = true,
  text = "Getting More Products...",
}) {
  return isDataLeft ? (
    <View style={styles.loadingContainer}>
      <AppText
        text={text}
        size={20}
        family={FontNames.Inter_Bold}
        color={ColorPallete.primary}
        marginBottom={20}
      />
      <ActivityIndicator size="large" color={ColorPallete.primary} />
    </View>
  ) : null;
}

// exports
export default LoadMoreComponent;

// styles
const styles = StyleSheet.create({
  loadingContainer: {
    marginLeft: 15,
    marginRight: 15,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
