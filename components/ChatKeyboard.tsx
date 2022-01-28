// Packges imports
import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  FadeInRight,
  FadeOutRight,
  Layout,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { TouchableRipple } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

// local components imports
import AnimatedView from "./AnimatedView";
import AppIcon from "./AppIcon";
import ColorPallete from "../utils/ColorPallete";
import { ChatKeyboardProps } from "../types/ComponentTypes";
import IconNames from "../constants/IconNames";
import RippleIconButton from "./RippleIconButton";

// function component for ChatKeyboard
function ChatKeyboard(props: ChatKeyboardProps) {
  //Destructuring props
  const {
    onChangeText = () => {},
    onSubmit = () => {},
    onPickPress = () => {},
    placeholder = "Message...",
    showCameraIcon = true,
    showFileIcon = true,
    loading = false,
    containerStyle = {},
    onCameraPress = () => {},
    backgroundColor,
    color,
    value,
  } = props;

  // Theme hook
  const { colors, dark } = useTheme();

  // get text Color
  let textColor = color ? color : colors.text;

  // Text Styles
  const textInputStyles = {
    fontSize: 20,
    flex: 1,
    color: textColor,
  };

  // Container Styles
  const containerStyles: StyleProp<ViewStyle> = [
    containerStyle,
    styles.container,
    {
      backgroundColor: backgroundColor
        ? backgroundColor
        : dark
        ? ColorPallete.properBlack
        : colors.background,
    },
  ];

  // Render
  return (
    <View style={containerStyles}>
      {/* Inner Container */}
      <View style={styles.innerContainer}>
        {/* Camera Icon Container */}

        {showCameraIcon ? (
          <TouchableRipple
            style={styles.cameraContainer}
            onPress={onCameraPress}
            borderless
          >
            <AppIcon
              family={IconNames.Entypo}
              name="camera"
              size={25}
              color={ColorPallete.white}
            />
          </TouchableRipple>
        ) : null}

        {/* Text Input Container */}
        <AnimatedView style={styles.textInputContainer}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={textColor}
            selectionColor={colors.primary}
            style={textInputStyles}
            multiline={true}
            value={value}
            onChangeText={onChangeText}
          />
        </AnimatedView>

        {/* Attatchement and Send Button Container */}

        <View style={{ flexDirection: "row", marginRight: 10 }}>
          {!loading ? (
            <>
              {showFileIcon ? (
                <RippleIconButton
                  onPress={onPickPress}
                  family={IconNames.Entypo}
                  name="attachment"
                  style={styles.filePickContainer}
                  size={25}
                  color={textColor ? textColor : undefined}
                />
              ) : null}

              <RippleIconButton
                onPress={onSubmit}
                style={{ marginLeft: 10 }}
                color={textColor ? textColor : undefined}
              />
            </>
          ) : (
            <AnimatedView
              style={styles.filesContainer}
              entering={ZoomIn}
              exiting={ZoomOut}
              layout={Layout.delay(100)}
            >
              <ActivityIndicator color={ColorPallete.primary} size={30} />
            </AnimatedView>
          )}
        </View>
      </View>
    </View>
  );
}

// Exports
export default ChatKeyboard;

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 1,
    margin: 5,
    elevation: 5,
    borderRadius: 200,
  },
  innerContainer: {
    minHeight: 30,
    borderRadius: 200,
    flexDirection: "row",
    padding: 5,
    borderWidth: 0,
  },
  cameraContainer: {
    backgroundColor: ColorPallete.dodgerblue,
    width: 45,
    height: 45,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputContainer: { flex: 1, paddingLeft: 15 },
  filesContainer: {
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 45,
  },
  filePickContainer: {
    backgroundColor: "rgba(255,255,255,.1)",
    borderRadius: 100,
  },
});
