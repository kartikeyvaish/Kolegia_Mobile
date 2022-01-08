// Packages Imports
import {
  StyleSheet,
  StatusBar,
  StyleProp,
  ViewStyle,
  ScrollView,
} from "react-native";
import { useTheme } from "@react-navigation/native";

// Types/Component imports
import { AppContainerProps } from "../types/ComponentTypes";

// Function component for the AppScrollContainer component
function AppScrollContainer(props: AppContainerProps) {
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

  // AppScrollContainer Styles
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
        animated={true}
        showHideTransition="slide"
      />
      <ScrollView style={containerStyles}>{children}</ScrollView>
    </>
  );
}

export default AppScrollContainer;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
