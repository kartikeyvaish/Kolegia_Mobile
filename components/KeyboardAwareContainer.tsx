// Packages Imports
import {
  StyleSheet,
  StatusBar,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
} from "react-native";
import { useTheme } from "@react-navigation/native";

// Component/Types imports
import { AppContainerProps } from "../types/ComponentTypes";

// Function component for the KeyboardAwareContainer component
function KeyboardAwareContainer(props: AppContainerProps) {
  // Getting Theme Colors
  const { colors, dark } = useTheme();

  // Destructuring props
  const {
    children,
    style,
    backgroundColor,
    statusBarBackgroundColor,
    statusBarStyle,
  } = props;

  // Container Styles
  const containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    {
      backgroundColor: backgroundColor ? backgroundColor : colors.background,
    },
    style,
  ];

  // Bar Style
  const barStyle = statusBarStyle
    ? statusBarStyle
    : dark === false
    ? "dark-content"
    : "light-content";

  // StatusBar background color
  const barBackgroundColor = statusBarBackgroundColor
    ? statusBarBackgroundColor
    : colors.background;

  // Render Component
  return (
    <>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={barBackgroundColor}
        animated={false}
        showHideTransition="slide"
      />
      <KeyboardAvoidingView style={containerStyles}>
        {children}
      </KeyboardAvoidingView>
    </>
  );
}

export default KeyboardAwareContainer;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
