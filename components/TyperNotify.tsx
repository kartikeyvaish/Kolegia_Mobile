// Packages Imports
import { StyleSheet } from "react-native";
import { Layout, SlideOutLeft } from "react-native-reanimated";

// local imports
import AnimatedView from "./AnimatedView";
import AppText from "./AppText";
import ColorPallete from "../utils/ColorPallete";
import { SlideInLeft } from "react-native-reanimated";

// functional component for TyperNotify
function TyperNotify({ text, visible }) {
  // Render
  return !visible ? null : (
    <AnimatedView
      style={styles.container}
      entering={SlideInLeft}
      exiting={SlideOutLeft}
      layout={Layout.springify()}
    >
      <AppText text={text} size={15} color={ColorPallete.darkGrey} />
    </AnimatedView>
  );
}

// exports
export default TyperNotify;

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "flex-start",
  },
});
