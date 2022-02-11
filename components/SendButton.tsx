// Packages Imports
import { View, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Layout, ZoomIn, ZoomOut } from "react-native-reanimated";

// component imports
import AnimatedView from "./AnimatedView";
import AppIcon from "./AppIcon";
import ColorPallete from "../utils/ColorPallete";
import IconNames from "../constants/IconNames";
import { SendButtonProps } from "../types/ComponentTypes";

// function component for SendButton
function SendButton(props: SendButtonProps) {
  // Destructuring props
  const {
    showSendButton = true,
    onSendPress,
    onAudioStartPress,
    onAudioStopPress,
    loading,
    isRecording,
  } = props;

  // render
  return (
    <View style={styles.sendButtonContainer}>
      <TouchableRipple
        borderless
        style={styles.rippleContainer}
        onPress={
          loading
            ? null
            : showSendButton
            ? onSendPress
            : isRecording
            ? onAudioStopPress
            : onAudioStartPress
        }
      >
        <View style={styles.sendButton}>
          {showSendButton ? (
            <AnimatedView entering={ZoomIn} exiting={ZoomOut} layout={Layout}>
              <AppIcon
                family={IconNames.Feather}
                name="send"
                size={20}
                color={ColorPallete.white}
                loading={loading}
              />
            </AnimatedView>
          ) : null}

          {!showSendButton ? (
            <AnimatedView entering={ZoomIn} exiting={ZoomOut} layout={Layout}>
              <AppIcon
                family={isRecording ? IconNames.Entypo : IconNames.FontAwesome}
                name={isRecording ? "controller-record" : "microphone"}
                size={20}
                color={isRecording ? ColorPallete.red : ColorPallete.white}
                loading={loading}
              />
            </AnimatedView>
          ) : null}
        </View>
      </TouchableRipple>
    </View>
  );
}

// exports
export default SendButton;

// styles
const styles = StyleSheet.create({
  sendButtonContainer: {
    justifyContent: "flex-end",
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
  },
  sendButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorPallete.dodgerblue,
  },
  rippleContainer: {
    borderRadius: 100,
  },
});
