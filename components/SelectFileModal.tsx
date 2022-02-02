// Packages Imports
import { Image, StyleSheet, Pressable } from "react-native";
import { FadeInDown, FadeOutDown, Layout } from "react-native-reanimated";

// components Imports
import AnimatedView from "./AnimatedView";
import AppImage from "./AppImage";
import AppModal from "./AppModal";
import AppVideo from "./AppVideo";
import ChatKeyboard from "./ChatKeyboard";
import ColorPallete from "../utils/ColorPallete";
import { FileModalProps } from "../types/ComponentTypes";
import { ScreenWidth } from "./../constants/Layout";

// function component for SelectFileModal
function SelectFileModal(props: FileModalProps) {
  // Destructuring props
  const {
    onChangeText,
    onSubmit,
    placeholder,
    loading,
    mimeType,
    uri,
    isVisible,
    message,
    backgroundColor = ColorPallete.properBlack,
    mode,
    ...otherProps
  } = props;

  // Check file Type
  let file_type = mimeType ? mimeType.slice(0, 5) : null;

  // Check if file is network image or local image
  let isNetworkImage = uri ? uri.startsWith("http") : false;

  // render
  return (
    <AppModal
      isVisible={isVisible}
      backgroundColor={backgroundColor}
      {...otherProps}
    >
      {uri ? (
        <>
          <Pressable style={styles.fileContainer} onPress={null}>
            {file_type === "image" ? (
              <>
                {isNetworkImage ? (
                  <AppImage uri={uri} style={styles.image} resizeMode="cover" />
                ) : (
                  <Image
                    source={{ uri }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                )}
              </>
            ) : null}

            {file_type === "video" ? (
              <AppVideo source={{ uri }} style={styles.image} />
            ) : null}
          </Pressable>
        </>
      ) : null}

      <AnimatedView
        style={styles.keyboard}
        entering={FadeInDown}
        exiting={FadeOutDown}
        layout={Layout}
      >
        <ChatKeyboard
          onChangeText={onChangeText}
          onSubmit={onSubmit}
          placeholder={placeholder}
          loading={loading}
          showCameraIcon={false}
          backgroundColor={ColorPallete.white}
          color={ColorPallete.properBlack}
          showFileIcon={false}
          containerStyle={{ height: 60, justifyContent: "center" }}
        />
      </AnimatedView>
    </AppModal>
  );
}

// exports
export default SelectFileModal;

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
