import React from "react";
import { View, StyleSheet } from "react-native";
import { Layout, ZoomInEasyUp, ZoomOutEasyDown } from "react-native-reanimated";
import IconNames from "../constants/IconNames";
import ColorPallete from "../utils/ColorPallete";
import AnimatedView from "./AnimatedView";
import AppIcon from "./AppIcon";

export interface MessageReadTickMarkProps {
  read?: boolean;
  delivered?: boolean;
  iconColor?: string | null;
}

function MessageReadTickMark(props: MessageReadTickMarkProps) {
  const { read, delivered, iconColor } = props;

  const mainIconColor = iconColor ? iconColor : undefined;

  return delivered === false ? (
    <AppIcon
      family={IconNames.Ionicons}
      name={"time-outline"}
      size={17}
      color={mainIconColor}
      marginLeft={5}
    />
  ) : (
    <AppIcon
      family={IconNames.Ionicons}
      name={read ? "checkmark-done" : "checkmark"}
      color={read ? ColorPallete.primary : mainIconColor}
      size={17}
      marginLeft={5}
    />
  );
}

export default MessageReadTickMark;

const styles = StyleSheet.create({
  container: {},
});
