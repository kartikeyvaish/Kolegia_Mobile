// Packages Imports
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Local Components Imports
import AppText from "./AppText";
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";
import MessageReadTickMark from "./MessageReadTickMark";

export interface TimeStampProps {
  time?: string;
  style?: any;
  showRead?: boolean;
  read?: boolean;
  delivered?: boolean;
  message_type?: string;
  mimeType?: string;
  showTickMark?: boolean;
}

// function component for TimeStamp
function TimeStamp(props: TimeStampProps) {
  // Destructuring Props
  const {
    style = {},
    time = "",
    read = false,
    delivered = true,
    message_type = "file",
    mimeType = "image",
    showTickMark = true,
  } = props;

  // Conditionally Color
  const mainColor = message_type === "file" ? ColorPallete.white : undefined;

  // gradient Colors
  const linearGradColors =
    mimeType.slice(0, 5) === "image"
      ? ["rgba(0,0,0,.8)", "transparent"]
      : ["rgba(0,0,0,0.9)", "rgba(0,0,0,1)"];

  // Start positions for gradient
  const startPositions: any = message_type === "file" ? [1, 1] : [0, 0];

  // Render
  return (
    <LinearGradient
      colors={linearGradColors}
      style={[styles.container, style]}
      start={startPositions}
      end={[0, 0]}
    >
      <AppText
        text={time}
        size={10}
        family={FontNames.Inter_Regular}
        color={mainColor}
      />

      {showTickMark ? (
        <MessageReadTickMark
          read={read}
          delivered={delivered}
          iconColor={mainColor}
        />
      ) : null}
    </LinearGradient>
  );
}

// Exports
export default TimeStamp;

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
