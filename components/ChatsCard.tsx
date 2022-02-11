// Packages Imports
import { View, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Layout, SlideOutLeft, SlideInLeft } from "react-native-reanimated";

// Local components Imports
import AppImage from "./AppImage";
import AppText from "./AppText";
import AnimatedView from "./AnimatedView";
import { ChatsCardProps } from "../types/ComponentTypes";
import FontNames from "../constants/FontNames";
import Helper from "../utils/Helper";

// function comoponent for ChatsCard
function ChatsCard(props: ChatsCardProps) {
  // Destructuring props
  const {
    chatting_with = {},
    last_message = {},
    onPress,
    current_user,
  } = props;

  // Font Family to use to display text
  const family =
    last_message?.sender_id === current_user?._id
      ? FontNames.Inter_Regular
      : last_message?.read === true
      ? FontNames.Inter_Regular
      : FontNames.Inter_Bold;

  // Render
  return (
    <AnimatedView
      entering={SlideInLeft}
      exiting={SlideOutLeft}
      layout={Layout.springify()}
    >
      <TouchableRipple onPress={onPress} style={styles.container}>
        <>
          <AppImage
            uri={chatting_with?.profile_picture}
            style={{ width: 50, height: 50, borderRadius: 50 }}
            showBorder={false}
          />

          <View style={styles.NameUsername}>
            <AppText
              text={chatting_with?.name ? chatting_with?.name : null}
              size={16}
              family={family}
            />
            <AppText
              text={
                last_message?.message
                  ? last_message?.message
                  : last_message?.message_type === "file"
                  ? "Sent you a file"
                  : "Tap to send a message"
              }
              textProps={{ numberOfLines: 1 }}
              family={family}
            />
          </View>

          {last_message?.message_datetime ? (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <AppText
                text={
                  last_message?.message_datetime
                    ? Helper.get_time_ago(last_message?.message_datetime)
                    : ""
                }
                family={family}
                size={13}
              />
            </View>
          ) : null}
        </>
      </TouchableRipple>
    </AnimatedView>
  );
}

export default ChatsCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 25,
  },
  NameUsername: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 50,
    height: "100%",
  },
  name: {
    fontSize: 16,
    marginLeft: 15,
  },
});
