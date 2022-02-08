// Packges Imports
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";

// Device Dimensions
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

interface LoadingOverlayProps {
  IsLoading?: boolean;
  OverlayText?: string;
}

// function component for LoadingOverlay
function LoadingOverlay(props: LoadingOverlayProps) {
  // Destructuring props
  const { IsLoading, OverlayText = "Loading..." } = props;

  // container styles
  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  ];

  // text styles
  const textStyles: StyleProp<TextStyle> = [styles.textStyles];

  return IsLoading ? (
    <Animated.View style={containerStyle} entering={FadeIn} exiting={FadeOut}>
      <View style={styles.childContainer}>
        <Text style={textStyles}>{OverlayText}</Text>
      </View>
    </Animated.View>
  ) : null;
}

// exports
export default LoadingOverlay;

// styles
const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
  },
  textStyles: {
    color: ColorPallete.black,
    fontSize: 30,
    fontFamily: FontNames.Inter_Regular,
  },
  childContainer: {
    paddingLeft: 50,
    paddingRight: 50,
    height: 80,
    backgroundColor: ColorPallete.white,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
