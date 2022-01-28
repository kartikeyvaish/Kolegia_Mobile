// Packges imports
import { StyleSheet } from "react-native";
import { FadeInRight, FadeOutRight, Layout } from "react-native-reanimated";

// comonents imports
import AnimatedView from "./AnimatedView";
import AppIcon from "./AppIcon";
import IconNames from "../constants/IconNames";
import { RippleIconButtonProps } from "../types/ComponentTypes";
import { TouchableRipple } from "react-native-paper";

// function component for RippleIconButton
function RippleIconButton(props: RippleIconButtonProps) {
  // Destructuring props
  const { style, onPress, rippleStyle, ...otherProps } = props;

  // render
  return (
    <AnimatedView
      style={[styles.container, style]}
      entering={FadeInRight}
      exiting={FadeOutRight}
      layout={Layout.delay(200)}
    >
      <TouchableRipple
        style={[styles.rippleContainer, rippleStyle]}
        onPress={onPress}
        borderless
      >
        <AppIcon
          family={IconNames.Feather}
          name="send"
          size={25}
          {...otherProps}
        />
      </TouchableRipple>
    </AnimatedView>
  );
}

// exports
export default RippleIconButton;

// Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 45,
  },
  rippleContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 200,
  },
});
