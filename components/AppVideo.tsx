// Packages Imports
import { StyleSheet } from "react-native";
import { Video, VideoProps } from "expo-av";

// Components Types imports

// AppVideoProps interface
export interface AppVideoProps extends VideoProps {}

// function component for AppVideo
function AppVideo(props: AppVideoProps) {
  return (
    <Video
      resizeMode="cover"
      shouldPlay={true}
      isMuted={false}
      isLooping={true}
      useNativeControls={true}
      {...props}
    />
  );
}

// exports
export default AppVideo;

//
const styles = StyleSheet.create({
  container: {},
});
