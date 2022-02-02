// packages Imports
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { FadeInRight, FadeOutRight, Layout } from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";

// Local components imports
import AnimatedView from "./AnimatedView";
import AppText from "./AppText";
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";
import FileMessageCard from "./FileMessageCard";
import Helper from "../utils/Helper";
import { SendMessageProps } from "../types/ComponentTypes";
import { ScreenWidth } from "../constants/Layout";
import TimeStamp from "./TimeStamp";

// constants
const MaxCardWidth = ScreenWidth * 0.7;

// function component for SendMessage
function SendMessage(props: SendMessageProps) {
  const {
    message = "",
    message_type,
    message_datetime,
    onMessagePress,
    upper_date = null,
    read = false,
    delivered = true,
    message_file,
  } = props;

  // Theme Hook
  const { dark } = useTheme();

  // conditionally check background color
  let backgroundColor = dark ? ColorPallete.black : ColorPallete.lightGrey;

  // CardStyles
  const cardStyle: StyleProp<ViewStyle> = [
    styles.messageBox,
    {
      backgroundColor,
    },
  ];

  return (
    <AnimatedView
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutRight}
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

      <View style={{ alignItems: "flex-end" }}>
        <View style={cardStyle}>
          <FileMessageCard
            message_type={message_type}
            message_file={message_file}
            onMessagePress={onMessagePress}
            delivered={delivered}
            message_datetime={message_datetime}
            read={read}
          />

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

          {message_type === "text" ? (
            <View style={styles.tickAndTimeStamp}>
              <TimeStamp
                time={Helper.get_formatted_time(message_datetime)}
                read={read}
                delivered={delivered}
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
export default SendMessage;

// styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
    paddingBottom: 0,
  },
  messageBox: {
    flexWrap: "wrap",
    maxWidth: MaxCardWidth,
    padding: 10,
    borderRadius: 10,
    elevation: 1,
    paddingBottom: 10,
    paddingRight: 5,
  },
  tickAndTimeStamp: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 0,
    marginRight: 0,
    alignItems: "center",
  },
});
