// Packages imports
import { StyleSheet } from "react-native";
import {
  FadeInDown,
  FadeInLeft,
  FadeOutDown,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";

// Local Imports
import AnimatedText from "./AnimiatedText";
import AnimatedView from "./AnimatedView";
import AppText from "./AppText";
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";
import Helper from "../utils/Helper";

// function component for StatsCard
function StatsCard({ count, title, color }) {
  const { colors } = useTheme();

  // render
  return (
    <AnimatedView
      style={[styles.container, { backgroundColor: colors.background }]}
      entering={FadeInLeft}
      exiting={FadeOutLeft}
      layout={Layout.springify()}
    >
      <AnimatedText
        text={Helper.abbreviate_number(count).toString()}
        color={color ? color : undefined}
        family={FontNames.Sofia_Pro_Bold}
        entering={FadeInDown}
        exiting={FadeOutDown}
        layout={Layout.springify()}
        animatedTextKey={Helper.abbreviate_number(count).toString()}
      />

      <AppText
        text={title}
        color={color ? color : undefined}
        family={FontNames.Sofia_Pro_Medium}
        adjustsFontSizeToFit={true}
        numberOfLines={1}
      />
    </AnimatedView>
  );
}

// exports
export default StatsCard;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderRadius: 12,
    marginLeft: 8,
    marginTop: 0,
    padding: 10,
    elevation: 5,
    borderColor: ColorPallete.grey,
    borderWidth: 1,
  },
});
