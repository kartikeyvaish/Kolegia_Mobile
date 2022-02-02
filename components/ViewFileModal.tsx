// Packages Imports
import { useState } from "react";
import { Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { FadeInDown, FadeOutDown, Layout } from "react-native-reanimated";

// components Imports
import AppText from "./AppText";
import AppVideo from "./AppVideo";
import AppImage from "./AppImage";
import AnimatedView from "./AnimatedView";
import AppHeaderBar from "./AppHeaderBar";
import AppModal from "./AppModal";
import ColorPallete from "../utils/ColorPallete";
import { FileModalProps } from "../types/ComponentTypes";
import { ScreenWidth } from "../constants/Layout";

// function component for ViewFileModal
function ViewFileModal(props: FileModalProps) {
  // Destructuring props
  const {
    headerTitle = "You",
    mimeType,
    uri,
    isVisible,
    message,
    backgroundColor = ColorPallete.properBlack,
    ...otherProps
  } = props;

  // Local States
  const [ShowOptions, SetShowOptions] = useState(false);

  // Check file Type
  let file_type = mimeType ? mimeType.slice(0, 5) : null;

  // Check if file is network image or local image
  let isNetworkImage = uri ? uri.startsWith("http") : false;

  // render
  return (
    <AppModal isVisible={isVisible} {...otherProps}>
      {ShowOptions ? (
        <AppHeaderBar
          title={headerTitle}
          onIconPress={otherProps.onBackButtonPress}
          backgroundColor={backgroundColor}
          isHeaderVisible={true}
          titleColor={ColorPallete.white}
        />
      ) : null}

      {uri ? (
        <>
          <Pressable
            style={styles.fileContainer}
            onPress={() => SetShowOptions(!ShowOptions)}
          >
            {file_type === "image" ? (
              isNetworkImage ? (
                <AppImage
                  uri={uri}
                  style={styles.image}
                  resizeMode="contain"
                  backgroundColor={backgroundColor}
                />
              ) : (
                <Image
                  source={{ uri }}
                  style={styles.image}
                  resizeMode="contain"
                />
              )
            ) : file_type === "video" ? (
              <AppVideo source={{ uri }} style={styles.image} />
            ) : null}
          </Pressable>
        </>
      ) : null}

      {message ? (
        ShowOptions ? (
          <AnimatedView
            entering={FadeInDown}
            exiting={FadeOutDown}
            layout={Layout}
            style={styles.captionContainer}
          >
            <ScrollView>
              <AppText text={message + message} color={ColorPallete.white} />
            </ScrollView>
          </AnimatedView>
        ) : null
      ) : null}
    </AppModal>
  );
}

// exports
export default ViewFileModal;

const styles = StyleSheet.create({
  fileContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: ScreenWidth,
    height: ScreenWidth,
  },
  keyboard: {
    width: "100%",
    marginBottom: 10,
    position: "absolute",
    bottom: 0,
  },
  captionContainer: {
    maxHeight: 200,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    position: "absolute",
    bottom: 0,
  },
});
