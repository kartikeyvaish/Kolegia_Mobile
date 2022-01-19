// Packages Imports
import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

// Local components imports
import AppIcon from "./AppIcon";
import AppImage from "./AppImage";
import ColorPallete from "../utils/ColorPallete";
import IconNames from "../constants/IconNames";
import Helper from "../utils/Helper";

interface CaraouselItemProps {
  uri: string;
  onPress?: () => void;
}

// function component for CaraouselItem
const CaraouselItem = ({ uri, onPress }: CaraouselItemProps) => {
  let isImage = Helper.get_file_type(uri) === "image";

  // if its an image, render the image
  if (isImage) {
    return (
      <AppImage
        uri={uri}
        style={styles.image}
        resizeMode="cover"
        showBorder={false}
        onPress={onPress}
      />
    );
  }

  // if its a video, render the video icon
  return (
    <Pressable style={styles.videoContainer} onPress={onPress}>
      <AppIcon
        family={IconNames.AntDesign}
        name={"play"}
        size={80}
        color={ColorPallete.white}
      />
    </Pressable>
  );
};

// Exports
export default React.memo(CaraouselItem);

// Styles
const styles = StyleSheet.create({
  image: { width: "100%", height: "100%" },
  videoContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: ColorPallete.dodgerblue,
    justifyContent: "center",
    alignItems: "center",
  },
});
