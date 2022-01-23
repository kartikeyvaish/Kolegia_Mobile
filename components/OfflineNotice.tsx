// Packages Imports
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// Components/Types imports
import ColorPallete from "../utils/ColorPallete";

// Functional component for the offline notice
function OfflineNotice() {
  // NetInfo Hook
  const netInfo = useNetInfo();
  // Animated Values
  const containerHeight = useSharedValue(0);
  const labelOpacity = useSharedValue(0);

  // useEffect to detect changes in network connection
  useEffect(() => {
    if (netInfo) {
      if (netInfo.type !== "unknown" && netInfo.isInternetReachable == false) {
        containerHeight.value = 50;
        labelOpacity.value = 1;
      } else {
        containerHeight.value = 0;
        labelOpacity.value = 0;
      }
    }
  }, [netInfo]);

  // Container Animated Style
  const ContainerStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(containerHeight.value, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  // Label Animated Style
  const LabelStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(labelOpacity.value, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  return (
    <Animated.View style={[styles.container, ContainerStyle]}>
      <Animated.Text style={[styles.label, LabelStyle]}>
        No Internet Connection
      </Animated.Text>
    </Animated.View>
  );
}

// Exports
export default OfflineNotice;

// Styles
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: ColorPallete.red,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 100,
  },
  label: {
    color: ColorPallete.white,
    fontSize: 20,
  },
});
