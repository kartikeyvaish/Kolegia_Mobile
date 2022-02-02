// packages Imports
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { FadeInLeft, FadeOutLeft, Layout } from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";

// Local Imports
import AnimatedView from "./AnimatedView";
import AppText from "./AppText";
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";
import FileMessageCard from "./FileMessageCard";
import Helper from "../utils/Helper";
import { MessageProps } from "../types/ComponentTypes";
import { ScreenWidth } from "./../constants/Layout";
import TimeStamp from "./TimeStamp";

// Constants
const MaxCardWidth = ScreenWidth * 0.7;

function RecievedMessage(props: MessageProps) {
  const {
    message = "",
    message_type,
    upper_date = null,
    message_datetime,
    onMessagePress,
    message_file,
    read,
  } = props;

  // theme Hook
  const { dark } = useTheme();

  // conditionally check background color
  let backgroundColor = dark ? ColorPallete.properBlack : ColorPallete.white;

  // CardStyles
  const cardStyle: StyleProp<ViewStyle> = [
    styles.MessageBox,
    {
      backgroundColor,
      borderColor: dark ? ColorPallete.black : ColorPallete.lightGrey,
    },
  ];

  // Render
  return (
    <AnimatedView
      style={styles.container}
      entering={FadeInLeft}
      exiting={FadeOutLeft}
      layout={Layout.springify()}
    >
      {upper_date ? (
        <AppText
          text={upper_date}
          size={13}
          family={FontNames.Inter_Regular}
          marginTop={10}
          marginBottom={10}
          style={{ textAlign: "center" }}
        />
      ) : null}

      <View style={{ alignItems: "flex-start" }}>
        <View style={cardStyle}>
          {/* If message type is file, then display the file */}
          <FileMessageCard
            message_type={message_type}
            message_file={message_file}
            onMessagePress={onMessagePress}
            message_datetime={message_datetime}
            read={read}
            showTickMark={false}
          />

          {/* If text message is present, display it */}
          {message ? (
            <View>
              <AppText
                text={message}
                size={16}
                marginTop={message_type === "file" ? 8 : 0}
                family={FontNames.Inter_Regular}
              />
            </View>
          ) : null}

          {/* Show the Time Stamp if message type is text */}
          {message_type === "text" ? (
            <View style={styles.tickAndTimeStamp}>
              <TimeStamp
                time={Helper.get_formatted_time(message_datetime)}
                read={read}
                showTickMark={false}
                message_type={message_type}
              />
            </View>
          ) : null}
        </View>
      </View>
    </AnimatedView>
  );
}

// Exports
export default RecievedMessage;

// Styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
    paddingBottom: 0,
  },
  MessageBox: {
    flexWrap: "wrap",
    maxWidth: MaxCardWidth,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 1,
    paddingRight: 6,
    paddingBottom: 10,
    paddingTop: 5,
  },
  tickAndTimeStamp: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 0,
    marginRight: 0,
    alignItems: "center",
  },
});
