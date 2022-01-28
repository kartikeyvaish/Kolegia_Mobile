import React from "react";
import { View, StyleSheet } from "react-native";
import IconNames from "../constants/IconNames";
import { ScreenWidth } from "../constants/Layout";
import ColorPallete from "../utils/ColorPallete";
import Helper from "../utils/Helper";
import AppIcon from "./AppIcon";
import AppImage from "./AppImage";
import TimeStamp from "./TimeStamp";

// constants
const MaxCardWidth = ScreenWidth * 0.7;

function FileMessageCard({
  message_type,
  message_file,
  onMessagePress,
  message_datetime,
  read,
  delivered = true,
  showTickMark = true,
}) {
  return message_type === "file" ? (
    <View style={styles.FileBox}>
      {message_file.mimeType.slice(0, 5) === "image" ? (
        <AppImage
          uri={message_file.uri}
          resizeMode="cover"
          style={styles.Image}
          onPress={onMessagePress}
          borderWidth={0}
        />
      ) : null}

      <TimeStamp
        style={styles.TimeStamp}
        time={Helper.get_formatted_time(message_datetime)}
        read={read}
        delivered={delivered}
        message_type="file"
        mimeType={message_file.mimeType}
        showTickMark={showTickMark}
      />

      {message_file.mimeType.slice(0, 5) === "video" ? (
        <AppIcon
          family={IconNames.AntDesign}
          name="play"
          style={styles.PlayIcon}
          color={ColorPallete.primary}
          size={30}
          onPress={onMessagePress}
        />
      ) : null}
    </View>
  ) : null;
}

export default FileMessageCard;

// styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
  },
  messageBox: {
    flexWrap: "wrap",
    maxWidth: MaxCardWidth,
    padding: 10,
    borderRadius: 10,
    elevation: 10,
  },
  TimeStamp: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  FileBox: {
    width: MaxCardWidth - 20,
    height: MaxCardWidth - 20,
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: MaxCardWidth - 20,
    height: MaxCardWidth - 20,
  },
  PlayIcon: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 120,
  },
  messageTextBox: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 3,
  },
});
