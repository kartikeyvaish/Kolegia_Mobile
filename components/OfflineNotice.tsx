// Packages Imports
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  Layout,
  SlideInUp,
  SlideOutUp,
} from "react-native-reanimated";
import { useNetInfo } from "@react-native-community/netinfo";

// Components/Types imports
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";

// Functional component for the offline notice
function OfflineNotice() {
  // NetInfo Hook
  const netInfo = useNetInfo();

  // Local States
  const [showNotice, SetshowNotice] = useState(false);

  // useEffect to detect changes in network connection
  useEffect(() => {
    if (netInfo) {
      if (netInfo.type !== "unknown" && netInfo.isInternetReachable == false) {
        // Internet gone show notice now
        SetshowNotice(true);
      } else {
        // Internet is back hide notice now
        SetshowNotice(false);
      }
    }
  }, [netInfo]);

  return showNotice ? (
    <Animated.View
      style={styles.container}
      entering={SlideInUp.duration(1000)}
      exiting={SlideOutUp.duration(1000)}
      layout={Layout}
    >
      <Text style={styles.label}>No Internet Connection</Text>
    </Animated.View>
  ) : null;
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
    zIndex: 200,
    padding: 10,
  },
  label: {
    color: ColorPallete.white,
    fontFamily: FontNames.Inter_Bold,
    fontSize: 20,
  },
});
