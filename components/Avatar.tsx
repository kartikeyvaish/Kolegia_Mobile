// Packages Imports
import {
  View,
  StyleSheet,
  StyleProp,
  ImageStyle,
  ViewStyle,
} from "react-native";

// Components Imports
import AppImage from "./AppImage";
import ColorPallete from "../utils/ColorPallete";
import { AppImageProps } from "../types/ComponentTypes";

// Export AvatarProps interface
export interface AvatarProps extends AppImageProps {
  uri: string;
  imageStyle?: StyleProp<ImageStyle>;
  size?: number;
  online?: boolean;
  showOnline?: boolean;
}

// function component for avatar
function Avatar(props: AvatarProps) {
  // Destructuring props
  const {
    uri,
    imageStyle,
    size,
    online,
    showOnline = false,
    ...otherProps
  } = props;

  // Default Styles
  const imageStyles: StyleProp<ImageStyle> = [
    {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
    imageStyle,
  ];

  // Dot Styles
  const dotStyles: StyleProp<ViewStyle> = [
    styles.dot,
    {
      backgroundColor: online ? ColorPallete.green : ColorPallete.red,
    },
  ];

  // render
  return (
    <View style={styles.container}>
      <AppImage uri={uri} style={imageStyles} {...otherProps} />

      {showOnline ? <View style={dotStyles}></View> : null}
    </View>
  );
}

// exports
export default Avatar;

// Styles
const styles = StyleSheet.create({
  container: {},
  dot: {
    width: 10,
    height: 10,
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
