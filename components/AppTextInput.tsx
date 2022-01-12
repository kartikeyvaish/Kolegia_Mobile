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

// AppTextInput function component
function AppTextInput(props: AppTextInputProps) {
  // Getting Theme Colors
  const { colors } = useTheme();

  // Destructuring props
  const {
    label,
    placeholder,
    placeholderTextColor,
    borderRadius = 12,
    backgroundColor,
    containerStyle,
    textInputStyle,
    onChangeText,
    secureTextEntry,
    value,
    mode,
    error,
    helperTextType = "error",
    helperTextPadding = "normal",
    onBlur,
    keyboardType,
    helperTextStyle,
    leftIcon,
    rightIcon,
    multiline,
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
      <TextInput.Icon name="eye" onPress={() => SetSecured(!Secured)} />
    ) : (
      <TextInput.Icon name="eye-off" onPress={() => SetSecured(!Secured)} />
    )
  ) : null;

  // Render
  return (
    <View style={containerStyles}>
      <TextInput
        placeholder={placeholder}
        label={label}
        style={textInputStyles}
        mode={mode}
        secureTextEntry={Secured}
        value={value}
        onChangeText={onChangeText}
        right={finalRightIcon}
        left={leftIcon}
        placeholderTextColor={placeholderTextColor}
        activeUnderlineColor={ColorPallete.primary}
        onBlur={onBlur}
        keyboardType={keyboardType}
        multiline={multiline}
        clearButtonMode="always"
      />
      <AppHelperText
        text={error}
        helperTextType={helperTextType}
        helperTextPadding={helperTextPadding}
        helperTextStyle={helperTextStyle}
      />
    </View>
  );
}

// Exports
export default AppTextInput;

// Styles
const styles = StyleSheet.create({
  container: {},
});
