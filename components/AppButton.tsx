// Packages Imports
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

// Components/Types imports
import { AppButtonProps } from "../types/ComponentTypes";
import ColorPallete from "../utils/ColorPallete";

// Exporting the app button function component
function AppButton(props: AppButtonProps) {
  // Theme
  const { colors } = useTheme();

  // Destructuring props
  const {
    title = "Button",
    onPress = () => {},
    backgroundColor = ColorPallete.primary,
    height = 60,
    width = "100%",
    borderRadius = 12,
    textColor = ColorPallete.white,
    loading,
    containerStyle,
    disabled,
  } = props;

  // Common View Styles
  const commonContainerStyles: StyleProp<ViewStyle> = [
    {
      height: height,
      borderRadius: borderRadius,
      width: width,
      opacity: disabled ? 0.5 : 1,
    },
    containerStyle,
  ];

  // Container styles
  const buttonContainerStyle: StyleProp<ViewStyle> = [
    styles.buttonContainer,
    commonContainerStyles,
    {
      backgroundColor: backgroundColor,
      opacity: loading ? 0.5 : 1,
    },
  ];

  // Text styles
  const textStyles: StyleProp<TextStyle> = [
    styles.titleStyle,
    {
      color: textColor ? textColor : colors.text,
    },
  ];

  // Render
  return (
    <TouchableRipple
      onPress={loading ? null : disabled ? null : onPress}
      borderless
      style={commonContainerStyles}
    >
      <View style={buttonContainerStyle}>
        <Text style={textStyles}>{title}</Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={textColor ? textColor : colors.text}
            style={styles.loadingIndicator}
          />
        ) : null}
      </View>
    </TouchableRipple>
  );
}

// Exports
export default AppButton;

// Styles
const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  titleStyle: {
    color: ColorPallete.white,
    fontSize: 20,
  },
  loadingIndicator: {
    position: "absolute",
    right: 15,
  },
});
