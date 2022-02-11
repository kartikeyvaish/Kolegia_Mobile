// Packages Imports
import { View, StyleSheet, TextInput } from "react-native";
import { Layout, SlideInRight, SlideOutRight } from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";

// Component imports
import AnimatedView from "./AnimatedView";
import AppText from "./AppText";
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";
import IconNames from "../constants/IconNames";
import RippleIconButton from "./RippleIconButton";
import { RoomKeyboardProps } from "../types/ComponentTypes";
import SendButton from "./SendButton";

// function component for RoomKeyboard
function RoomKeyboard(props: RoomKeyboardProps) {
  // Destructuring props
  const {
    inputProps = {},
    inputContainerStyle = {},

    onPickPress,
    onAudioStartPress,
    onAudioStopPress,
    onCameraPress,
    onSendPress,

    showCameraIcon = true,
    showFileIcon = true,

    loading,
    isRecording = false,
    containerStyle,
    backgroundColor,
    color,
    recordingTime,
  } = props;

  // Theme hook
  const { colors, dark } = useTheme();

  // get text Color
  let textColor = color ? color : colors.text;

  // Destructure inputProps
  const {
    value,
    multiline = true,
    style,
    placeholderTextColor = textColor,
    selectionColor = colors.primary,
    ...otherInputProps
  } = inputProps;

  // Text Input Styles
  const textInputStyles = [
    styles.textInput,
    {
      color: textColor,
    },
    style,
  ];

  // final styles
  const finalContainerStyle = [
    styles.container,
    { backgroundColor },
    containerStyle,
  ];

  const innerContainerStyles = [
    styles.inputAndButtonContainer,
    {
      borderColor: !dark ? ColorPallete.lightRipple : ColorPallete.greyRipple,
    },
  ];

  return (
    <View style={finalContainerStyle}>
      {!isRecording ? (
        <AnimatedView
          style={innerContainerStyles}
          entering={SlideInRight}
          exiting={SlideOutRight}
        >
          <View style={[styles.textInputContainer, inputContainerStyle]}>
            <TextInput
              value={value}
              multiline={true}
              style={textInputStyles}
              placeholderTextColor={placeholderTextColor}
              selectionColor={selectionColor}
              {...otherInputProps}
            />
          </View>

          <View style={styles.filePickButton}>
            <RippleIconButton
              family={IconNames.Entypo}
              name="camera"
              size={22}
              onPress={onCameraPress}
              showButton={
                showCameraIcon ? (value?.length ? false : true) : false
              }
              addAnimatedProps={false}
            />

            <RippleIconButton
              family={IconNames.Entypo}
              name="attachment"
              size={22}
              onPress={onPickPress}
              showButton={showFileIcon ? (value?.length ? false : true) : false}
              addAnimatedProps={false}
            />
          </View>
        </AnimatedView>
      ) : null}

      {isRecording ? (
        <AnimatedView
          style={styles.recordingContainer}
          entering={SlideInRight}
          exiting={SlideOutRight}
          layout={Layout}
        >
          <AppText
            text={isRecording ? "Recording..." : null}
            family={FontNames.Inter_Bold}
          />

          <AppText
            text={isRecording ? recordingTime : null}
            family={FontNames.Inter_Bold}
          />
        </AnimatedView>
      ) : null}

      <SendButton
        showSendButton={value?.length ? true : false}
        loading={loading}
        onAudioStartPress={onAudioStartPress}
        onAudioStopPress={onAudioStopPress}
        onSendPress={onSendPress}
        isRecording={isRecording}
      />
    </View>
  );
}

// exports
export default RoomKeyboard;

// styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "auto",
    maxHeight: 120,
    marginBottom: 5,
    marginTop: 8,
  },
  textInput: {
    fontSize: 18,
    fontFamily: FontNames.Sofia_Pro_Light,
  },
  textInputContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 5,
    justifyContent: "center",
  },
  filePickButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 5,
    paddingTop: 0,
  },
  inputAndButtonContainer: {
    flexDirection: "row",
    flex: 1,
    margin: 5,
    marginBottom: 0,
    borderRadius: 10,
    borderWidth: 1,
  },
  recordingContainer: {
    flexDirection: "row",
    flex: 1,
    margin: 5,
    marginBottom: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ColorPallete.primary,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
