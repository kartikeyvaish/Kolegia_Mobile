// Packages Imports
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Button } from "react-native-paper";

// Component/Types imports
import { AppButtonProps } from "../types/ComponentTypes";
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";
import { useTheme } from "@react-navigation/native";

function AppButton(props: AppButtonProps) {
  // Theme
  const { colors } = useTheme();

  // Destructuring props
  const {
    title = "Button",
    onPress = () => {},
    backgroundColor = ColorPallete.primary,
    textColor = ColorPallete.white,
    loading,
    disabled,
    mode = "contained",
    uppercase = false,
    labelStyle,
    height = 60,
    width = "100%",
    borderRadius = 12,
    containerStyle,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
  } = props;

  // Text styles
  const finalLabelStyle: StyleProp<TextStyle> = [
    styles.titleStyle,
    {
      color: textColor ? textColor : colors.text,
    },
    labelStyle,
  ];

  // final container styles
  const finalContainerStyle: StyleProp<ViewStyle> = [
    {
      borderRadius: borderRadius,
      marginBottom: marginBottom,
      marginTop: marginTop,
      marginLeft: marginLeft,
      marginRight: marginRight,
    },
    containerStyle,
  ];

  // content Style
  const contentStyle = [
    {
      height: height,
      width: width,
    },
  ];

  return (
    <Button
      mode={mode}
      color={backgroundColor}
      loading={loading}
      disabled={loading ? true : disabled}
      onPress={loading ? null : disabled ? null : onPress}
      uppercase={uppercase}
      labelStyle={finalLabelStyle}
      contentStyle={contentStyle}
      style={finalContainerStyle}
    >
      {title}
    </Button>
  );
}

export default AppButton;

// Styles
const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 20,
    fontFamily: FontNames.Sofia_Pro_Regular,
  },
});
