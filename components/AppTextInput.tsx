// Packages Import
import { useState } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

// Types/Component imports
import AppHelperText from "./AppHelperText";
import { AppTextInputProps } from "../types/ComponentTypes";
import ColorPallete from "../utils/ColorPallete";
import AppIcon from "./AppIcon";
import IconNames from "../constants/IconNames";

// AppTextInput function component
function AppTextInput(props: AppTextInputProps) {
  // Getting Theme Colors
  const { colors } = useTheme();

  // Destructuring props
  const {
    borderRadius = 12,
    backgroundColor,
    containerStyle,
    textInputStyle,
    secureTextEntry,
    error,
    helperTextType = "error",
    helperTextPadding = "normal",
    helperTextStyle,
    leftIcon,
    rightIcon,
    showError = true,
    placeholderTextColor = colors.text,
    helperTextColor,
    label,
    mandatory,
    ...otherProps
  } = props;

  // State
  const [Secured, SetSecured] = useState(secureTextEntry);

  // Container Style
  const containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    containerStyle,
  ];

  // Text Styles
  const textInputStyles: StyleProp<TextStyle> = [
    {
      backgroundColor: backgroundColor ? backgroundColor : colors.background,
      borderRadius: borderRadius,
      fontSize: 18,
      color: colors.text,
    },
    textInputStyle,
  ];

  // Toggle Secure Text Entry icon
  const finalRightIcon = rightIcon ? (
    rightIcon
  ) : secureTextEntry ? (
    Secured ? (
      <TextInput.Icon
        name="eye"
        color={colors.text}
        onPress={() => SetSecured(!Secured)}
      />
    ) : (
      <TextInput.Icon
        name="eye-off"
        color={colors.text}
        onPress={() => SetSecured(!Secured)}
      />
    )
  ) : null;

  // Render
  return (
    <View style={containerStyles}>
      <TextInput
        right={finalRightIcon}
        left={leftIcon ? <TextInput.Icon name={leftIcon} /> : null}
        style={textInputStyles}
        secureTextEntry={Secured}
        activeUnderlineColor={ColorPallete.primary}
        selectionColor={colors.text}
        outlineColor={colors.text}
        underlineColorAndroid={colors.text}
        activeOutlineColor={error ? ColorPallete.red : ColorPallete.primary}
        underlineColor={colors.text}
        placeholderTextColor={placeholderTextColor}
        label={label ? (mandatory ? label + "*" : label) : null}
        {...otherProps}
      />

      {!otherProps.disabled && showError ? (
        <AppHelperText
          text={error}
          helperTextType={helperTextType}
          helperTextColor={helperTextColor}
          helperTextPadding={helperTextPadding}
          helperTextStyle={helperTextStyle}
        />
      ) : null}
    </View>
  );
}

// Exports
export default AppTextInput;

// Styles
const styles = StyleSheet.create({
  container: {},
});
