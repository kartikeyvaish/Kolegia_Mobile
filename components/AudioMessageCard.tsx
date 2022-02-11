// Packages Imports
import { View, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

// component imports
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import ColorPallete from "../utils/ColorPallete";
import Helper from "../utils/Helper";
import IconNames from "../constants/IconNames";
import { ScreenWidth } from "../constants/Layout";
import TimeStamp from "./TimeStamp";
import useAudioPlayer from "./../hooks/useAudioPlayer";

// constants
const MaxCardWidth = ScreenWidth * 0.7 - 20;

// function component for AudioMessageCard
function AudioMessageCard(props: any) {
  // Destructuring props
  const { message_datetime, read, delivered, ...otherProps } = props;
  const uri = otherProps.uri;

  // custom hook for AudioPlayer
  const AudioProps = useAudioPlayer({ uri });

  // get audio player functions
  const {
    IsPLaying,
    PlayAudio,
    PlayerLoading,
    PauseAudio,
    ElapsedTime,
    Duration,
    Progress,
    SeekPlayer,
  } = AudioProps;

  // if uri is not present then return null
  if (!uri) return null;

  // render
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AppIcon
          family={IconNames.AntDesign}
          name={!IsPLaying ? "play" : "pause"}
          size={30}
          loading={PlayerLoading}
          onPress={IsPLaying ? PauseAudio : PlayAudio}
        />
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          value={Progress}
          minimumValue={0}
          maximumValue={100}
          step={1}
          minimumTrackTintColor={ColorPallete.dodgerblue}
          maximumTrackTintColor={ColorPallete.dodgerblue}
          thumbTintColor={ColorPallete.primary}
          onSlidingComplete={SeekPlayer}
        />

        <View style={styles.timerContainer}>
          <AppText
            text={Helper.get_seconds_format(ElapsedTime / 1000)}
            marginLeft={15}
            size={13}
          />
          <AppText
            text={Helper.get_seconds_format(Duration / 1000)}
            marginRight={15}
            size={13}
          />
        </View>

        <TimeStamp
          time={Helper.get_formatted_time(message_datetime)}
          read={read}
          delivered={delivered}
          message_type={"text"}
          style={styles.TimeStamp}
        />
      </View>
    </View>
  );
}

// exports
export default AudioMessageCard;

// styles
const styles = StyleSheet.create({
  container: {
    width: MaxCardWidth,
    flexDirection: "row",
    paddingTop: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  sliderContainer: {
    flex: 1,
    justifyContent: "center",
  },
  timerContainer: { flexDirection: "row", justifyContent: "space-between" },
  TimeStamp: {
    marginTop: 10,
    justifyContent: "flex-end",
  },
});
