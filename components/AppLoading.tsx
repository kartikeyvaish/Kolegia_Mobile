// Packages Imports
import { View, StyleSheet, ActivityIndicator } from "react-native";

// components/Types imports
import { AppLoadingProps } from "../types/ComponentTypes";
import AppText from "./AppText";
import ColorPallete from "../utils/ColorPallete";

// functional component for AppLoading
function AppLoading(props: AppLoadingProps) {
  // Destructuring the props
  const { loadingText = "Loading...", loading = true, style } = props;

  // Render
  return (
    <View style={[styles.container, style]}>
      {loading ? (
        <ActivityIndicator size={"large"} color={ColorPallete.primary} />
      ) : null}

      <AppText text={loadingText} marginTop={10} size={25} />
    </View>
  );
}

// Exports
export default AppLoading;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
