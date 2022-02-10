// Packages Imports
import { View, StyleSheet } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutDown,
  Layout,
} from "react-native-reanimated";
import Slider from "@react-native-community/slider";

// component imports
import AppText from "./AppText";
import ColorPalette from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";
import { ScreenWidth } from "../constants/Layout";

export interface VideoSeekBarProps {
  showSeekbar?: boolean;
  progress?: number;
  currentTime?: string;
  elapsedTime?: string;
  onSlidingStart?: () => void;
  onSlidingComplete?: (value: number) => void;
}

// function component for VideoSeekBar
function VideoSeekBar(props: VideoSeekBarProps) {
  // Destructuring props
  const {
    showSeekbar,
    progress,
    currentTime = "00:00",
    elapsedTime = "00:00",
    onSlidingStart,
    onSlidingComplete,
  } = props;

  // render
  return showSeekbar ? (
    <Animated.View
      style={styles.seekBar}
      entering={FadeInDown}
      exiting={FadeOutDown}
      layout={Layout}
    >
      <View style={styles.ItemBox}>
        <AppText
          text={currentTime}
          size={15}
          family={FontNames.Inter_Bold}
          color={ColorPalette.white}
          marginRight={20}
        />

        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={1}
          value={progress}
          minimumTrackTintColor={ColorPalette.white}
          maximumTrackTintColor={ColorPalette.grey}
          thumbTintColor={ColorPalette.primary}
          onSlidingStart={onSlidingStart}
          onSlidingComplete={onSlidingComplete}
        />

        <AppText
          text={elapsedTime}
          color={ColorPalette.white}
          size={15}
          family={FontNames.Inter_Bold}
          marginLeft={20}
        />
      </View>
    </Animated.View>
  ) : null;
}

// exports
export default VideoSeekBar;

// styles
const styles = StyleSheet.create({
  seekBar: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    width: ScreenWidth,
    bottom: 0,
    padding: 15,
  },
  ItemBox: {
    flexDirection: "row",
    width: "100%",
  },
});
