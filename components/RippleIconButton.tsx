// Packges imports
import { StyleSheet } from "react-native";
import { FadeInRight, FadeOutRight, Layout } from "react-native-reanimated";
import { TouchableRipple } from "react-native-paper";

// comonents imports
import AnimatedView from "./AnimatedView";
import AppIcon from "./AppIcon";
import IconNames from "../constants/IconNames";
import { RippleIconButtonProps } from "../types/ComponentTypes";

// function component for RippleIconButton
function RippleIconButton(props: RippleIconButtonProps) {
  // Destructuring props
  const {
    style,
    onPress,
    rippleStyle,
    showButton = true,
    addAnimatedProps = true,
    ...otherProps
  } = props;

  // if addAnimatedProps is true then only add animated props
  const animatedProps = {
    entering: FadeInRight,
    exiting: FadeOutRight,
    ...(addAnimatedProps
      ? {
          layout: Layout.delay(200),
        }
      : {}),
  };

  // render
  return showButton ? (
    <AnimatedView style={[styles.container, style]} {...animatedProps}>
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
  ) : null;
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
