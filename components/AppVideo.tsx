// Packages Imports
import { forwardRef } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Video, VideoProps } from "expo-av";
import { FadeIn, FadeOut, Layout } from "react-native-reanimated";

// components/types imports
import AnimatedView from "./AnimatedView";
import ColorPallete from "../utils/ColorPallete";
import IconNames from "../constants/IconNames";
import RoundIconButton from "./RoundIconButton";

// AppVideoProps interface
export interface AppVideoProps extends VideoProps {
  onPress?: () => void;
  showPlayPauseButton?: boolean;
  isPlaying?: boolean;
  onPlayPauseButtonPress?: () => void;
}

const AppVideo = forwardRef((props: AppVideoProps, ref: any) => {
  const {
    resizeMode = "cover",
    shouldPlay = true,
    isMuted = false,
    isLooping = true,
    useNativeControls = true,
    showPlayPauseButton = false,
    onPlayPauseButtonPress,
    isPlaying = false,
    onPress,
    ...otherProps
  } = props;

  return (
    <>
      <TouchableWithoutFeedback onPress={onPress}>
        <Video
          resizeMode={resizeMode}
          shouldPlay={shouldPlay}
          isMuted={isMuted}
          isLooping={isLooping}
          useNativeControls={useNativeControls}
          ref={ref}
          {...otherProps}
        />
      </TouchableWithoutFeedback>

      {showPlayPauseButton ? (
        <AnimatedView
          entering={FadeIn}
          exiting={FadeOut}
          layout={Layout}
          style={{ position: "absolute" }}
        >
          <RoundIconButton
            family={IconNames.FontAwesome5}
            name={isPlaying ? "pause" : "play"}
            size={30}
            color={ColorPallete.white}
            marginLeft={3}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onPress={onPlayPauseButtonPress}
          />
        </AnimatedView>
      ) : null}
    </>
  );
});

// exports
export default AppVideo;
