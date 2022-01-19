// Packages Imports
import { StyleSheet, Pressable, StyleProp } from "react-native";
import FastImage, { ImageStyle } from "react-native-fast-image";
import { useTheme } from "@react-navigation/native";

// Components/Types imports
import { AppImageProps } from "../types/ComponentTypes";

// function component
function AppImage(props: AppImageProps) {
  // Theme
  const { colors } = useTheme();

  // Destructuring props
  const {
    uri,
    style = {},
    resizeMode = "cover",
    onPress = null,
    borderRadius = 0,
    borderColor = "grey",
    borderWidth = 1 - StyleSheet.hairlineWidth,
    showBorder = true,
  } = props;

  // Container Styles
  const containerStyles = [
    styles.ImageBoxPart,
    {
      borderColor: borderColor,
      borderWidth: showBorder ? borderWidth : 0,
    },
    style,
  ];

  // ImageStyles
  const imageStyle: StyleProp<ImageStyle> = [
    {
      width: "100%",
      height: "100%",
      backgroundColor: colors.background,
      borderRadius: borderRadius,
    },
  ];

  // Resize mode for the image
  const imageResizeMode =
    resizeMode === "cover"
      ? FastImage.resizeMode.cover
      : FastImage.resizeMode.contain;

  // Render
  return (
    <Pressable style={containerStyles} onPress={onPress}>
      <FastImage
        style={imageStyle}
        source={{ uri: uri }}
        resizeMode={imageResizeMode}
      />
    </Pressable>
  );
}

// Exports
export default AppImage;

// Styles
const styles = StyleSheet.create({
  ImageBoxPart: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: "100%",
    height: "100%",
  },
});
