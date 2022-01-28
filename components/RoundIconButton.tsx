// packages Imports
import { StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";

// Components Imports and Types
import AppIcon from "./AppIcon";
import ColorPallete from "../utils/ColorPallete";
import { RoundIconButtonProps } from "../types/ComponentTypes";

// function component for RoundIconButton
function RoundIconButton(props: RoundIconButtonProps) {
  // Destructuring props
  const { style, onPress, ...otherProps } = props;

  // render
  return (
    <TouchableRipple
      onPress={otherProps.loading ? null : onPress}
      style={[styles.roundButtonContainer, style]}
      borderless
    >
      <AppIcon {...otherProps} />
    </TouchableRipple>
  );
}

export default RoundIconButton;

const styles = StyleSheet.create({
  roundButtonContainer: {
    borderRadius: 100,
    overflow: "hidden",
    width: 70,
    height: 70,
    backgroundColor: ColorPallete.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
