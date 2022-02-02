// Pakcages impors
import { View, StyleSheet, Image } from "react-native";

// Local Imports
import AppIcon from "./AppIcon";
import AppImage from "./AppImage";
import ColorPallete from "../utils/ColorPallete";
import IconNames from "../constants/IconNames";
import AnimatedView from "./AnimatedView";
import { Layout, ZoomIn, ZoomOut } from "react-native-reanimated";

// function component for ChoosePicture
function ChoosePicture({
  uri,
  onPickPress,
  onRemovePress,
  showRemoveIcon = true,
}: any) {
  // check if uri is network uri or local uri
  let isNetworkImage = uri.startsWith("http");

  // if uri is not present then return null
  if (!uri) return null;

  // render
  return (
    <View style={styles.PicAndIconContainer}>
      <View style={styles.ImageContainer}>
        {isNetworkImage ? (
          <AppImage
            uri={uri}
            style={styles.image}
            resizeMode="cover"
            backgroundColor="transparent"
            showBorder={false}
          />
        ) : (
          <Image source={{ uri }} style={styles.image} resizeMode="cover" />
        )}

        {!showRemoveIcon ? (
          <AnimatedView
            style={styles.crossIcon}
            entering={ZoomIn}
            exiting={ZoomOut}
            layout={Layout}
          >
            <AppIcon
              family={IconNames.Entypo}
              name={"circle-with-cross"}
              color={ColorPallete.primary}
              size={35}
              onPress={onRemovePress}
            />
          </AnimatedView>
        ) : null}
      </View>

      <AppIcon
        family={IconNames.Entypo}
        name={"edit"}
        size={30}
        color={ColorPallete.primary}
        style={styles.EditIcon}
        onPress={onPickPress}
      />
    </View>
  );
}

// exports
export default ChoosePicture;

// styles
const styles = StyleSheet.create({
  PicAndIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 15,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  ImageContainer: {
    padding: 2,
    borderWidth: 1,
    borderColor: ColorPallete.primary,
    borderRadius: 50,
  },
  EditIcon: {
    position: "absolute",
    zIndex: 10,
    top: 10,
    right: 10,
  },
  crossIcon: {
    position: "absolute",
    zIndex: 10,
    top: -5,
    right: -5,
    backgroundColor: ColorPallete.white,
    borderRadius: 100,
  },
});
