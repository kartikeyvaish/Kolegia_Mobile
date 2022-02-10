// Packages Imports
import { View, StyleSheet } from "react-native";
import { FadeInLeft, FadeOutLeft, Layout } from "react-native-reanimated";

// Local files imports
import AnimatedView from "./AnimatedView";
import AppButton from "./AppButton";
import AppIcon from "./AppIcon";
import AppImage from "./AppImage";
import ColorPallete from "../utils/ColorPallete";
import IconNames from "../constants/IconNames";
import Helper from "../utils/Helper";

// types
interface FilePreviewCardProps {
  uri?: string;
  onPress?: () => void;
  onViewPress?: () => void;
  _id?: string;
}

// function component for FilePreviewCard
function FilePreviewCard({ uri, onPress, onViewPress }: FilePreviewCardProps) {
  let isImage = Helper.get_file_type(uri) === "image";

  // Render
  return (
    <AnimatedView
      style={styles.container}
      entering={FadeInLeft}
      exiting={FadeOutLeft}
      layout={Layout.delay(200)}
    >
      <View style={styles.imageContainer}>
        {isImage ? (
          <AppImage uri={uri} style={styles.image} />
        ) : (
          <View style={styles.videoContainer}>
            <AppIcon
              family={IconNames.AntDesign}
              name="play"
              size={50}
              onPress={onViewPress}
            />
          </View>
        )}
      </View>

      <AppButton
        title="Remove"
        backgroundColor={ColorPallete.red}
        height={50}
        containerStyle={styles.button}
        onPress={onPress}
      />
    </AnimatedView>
  );
}

// Exports
export default FilePreviewCard;

// Styles
const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  imageContainer: {
    width: "100%",
    height: 130,
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: ColorPallete.primary,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});
