// Packages Imports
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import Modal from "react-native-modal";

// Types imports
import { AppModalProps } from "../types/ComponentTypes";

// function component for AppModal
function AppModal(props: AppModalProps) {
  // Destructuring props
  const {
    isVisible,
    style,
    children,
    backdropColor,
    backdropOpacity = 1,
    coverScreen = true,
    hasBackdrop = true,
    onBackButtonPress,
    onDismiss,
    useNativeDriver,
    animationInTiming = 300,
    animationOutTiming = 300,
    backgroundColor,
    ...otherProps
  } = props;

  const modalStyles: StyleProp<ViewStyle> = [
    {
      backgroundColor: backgroundColor,
    },
    styles.modal,
    style,
  ];

  // Render
  return (
    <Modal
      isVisible={isVisible}
      style={modalStyles}
      animationOut={"fadeOutDown"}
      backdropColor={backdropColor}
      backdropOpacity={backdropOpacity}
      coverScreen={coverScreen}
      hasBackdrop={hasBackdrop}
      onBackButtonPress={onBackButtonPress}
      onDismiss={onDismiss}
      useNativeDriver={useNativeDriver}
      animationInTiming={animationInTiming}
      animationOutTiming={animationOutTiming}
      {...otherProps}
    >
      {children}
    </Modal>
  );
}

// Exports
export default AppModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 0,
    margin: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
