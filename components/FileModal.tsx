// Packages Imports
import { Image, View, StyleSheet } from "react-native";

// components Imports
import AppHeaderBar from "./AppHeaderBar";
import AppModal from "./AppModal";
import ChatKeyboard from "./ChatKeyboard";
import ColorPallete from "../utils/ColorPallete";
import { FileModalProps } from "../types/ComponentTypes";
import AnimatedView from "./AnimatedView";
import { FadeInDown, FadeOutDown, Layout } from "react-native-reanimated";
import { useState } from "react";
import AppText from "./AppText";
import { ScreenWidth } from "./../constants/Layout";
import AppVideo from "./AppVideo";
import AppImage from "./AppImage";

// // File Props
// uri?: string;
// mimeType?: "image" | "video";

// // Caption Props
// text?: string;
// headerTitle?: string;

// // Keyboard Props
// onChangeText?: (text: string) => void;
// onSubmit?: () => void;
// placeholder?: string;
// loading?: boolean;

// function component for FileModal
function FileModal(props: FileModalProps) {
  // Destructuring props
  const {
    onChangeText,
    onSubmit,
    placeholder,
    loading,
    headerTitle = "You",
    text,
    mimeType,
    showKeyboard,
    uri,
    isVisible,
    ...otherProps
  } = props;

  // Local States
  const [ShowOptions, SetShowOptions] = useState(true);

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
        />
      ) : null}

      <View style={styles.fileContainer}>
        {uri ? (
          <>
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
            ) : (
              <AppVideo source={{ uri }} style={styles.image} />
            )}
          </>
        ) : null}
      </View>

      {showKeyboard ? (
        <AnimatedView
          style={{ width: "100%", marginBottom: 10 }}
          entering={FadeInDown}
          exiting={FadeOutDown}
          layout={Layout.springify()}
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
      ) : null}
    </AppModal>
  );
}

// exports
export default FileModal;

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
});
