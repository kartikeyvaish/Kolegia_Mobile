// Packages Imports
import { useState } from "react";
import { View, StyleSheet } from "react-native";

// components/ types imports
import AppContainer from "./../../components/AppContainer";
import AppHeaderBar from "./../../components/AppHeaderBar";
import AppVideo from "./../../components/AppVideo";
import ColorPalette from "../../utils/ColorPallete";
import Helper from "../../utils/Helper";
import useVideoPlayer from "../../hooks/useVideoPlayer";
import VideoSeekBar from "../../components/VideoSeekBar";

// function component for VideoPlayerScreen
function VideoPlayerScreen({ navigation, route }) {
  const [showOptions, SetshowOptions] = useState(true);

  // custom hooks
  const {
    onProgressUpdate,
    progress,
    VideoPlayer,
    IsPlaying,
    TogglePlayback,
    CurrentTime,
    Duration,
    SeekVideo,
  } = useVideoPlayer({});

  const uri = route?.params?.uri;
  const headerTitle = route?.params?.headerTitle ?? "Video Preview";

  if (!uri) return null;

  // render
  return (
    <AppContainer style={styles.container}>
      <View style={styles.videoPlayerBox}>
        <AppVideo
          source={{ uri }}
          ref={VideoPlayer}
          style={styles.video}
          useNativeControls={false}
          onPlaybackStatusUpdate={onProgressUpdate}
          onPress={() => SetshowOptions(!showOptions)}
          resizeMode="contain"
          showPlayPauseButton={showOptions}
          onPlayPauseButtonPress={TogglePlayback}
          isPlaying={IsPlaying}
        />
      </View>

      <AppHeaderBar
        title={headerTitle}
        isHeaderVisible={showOptions}
        style={styles.headerBar}
        titleColor={ColorPalette.white}
        onIconPress={() => navigation.goBack()}
      />

      <VideoSeekBar
        showSeekbar={showOptions}
        progress={progress}
        currentTime={Helper.get_seconds_format(CurrentTime / 1000)}
        elapsedTime={Helper.get_seconds_format(Duration / 1000)}
        onSlidingComplete={SeekVideo}
      />
    </AppContainer>
  );
}

// exports
export default VideoPlayerScreen;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorPalette.properBlack,
  },
  headerBar: {
    borderWidth: 0,
    elevation: 0,
    position: "absolute",
    top: 0,
    zIndex: 100,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  videoPlayerBox: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
