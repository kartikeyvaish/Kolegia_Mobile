// packages imports
import { Text, StyleProp, TextStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

// Types imports
import { AppTextProps } from "../types/ComponentTypes";

// function component for the AppText component
function AppText(props: AppTextProps) {
  // Getting Theme Colors
  const { colors } = useTheme();

  // Destructuring props
  const {
    text,
    style,
    color,
    textProps,
    size,
    family,
    onPress,
    ...otherProps
  } = props;

  // Container Styles
  const textStyles: StyleProp<TextStyle> = [
    {
      color: color ? color : colors.text,
      fontSize: size ? size : 16,
      fontFamily: family,
      ...otherProps,
    },
    style,
  ];

  // Rendering the AppText component
  return (
    <Text style={textStyles} onPress={onPress} {...textProps}>
      {text}
    </Text>
  );
}

// Exports
export default AppText;
