// Packages Imports
import Modal from "react-native-modal";
import { AppModalProps } from "../types/ComponentTypes";

// function component for AppModal
function AppModal({
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
  backgroundColor,
  ...otherProps
}: AppModalProps) {
  // Render
  return (
    <Modal
      isVisible={isVisible}
      style={[
        {
          backgroundColor: backgroundColor,
          flex: 1,
          padding: 0,
          margin: 0,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        },
        style,
      ]}
      backdropColor={backdropColor}
      backdropOpacity={backdropOpacity}
      coverScreen={coverScreen}
      hasBackdrop={hasBackdrop}
      onBackButtonPress={onBackButtonPress}
      onDismiss={onDismiss}
      useNativeDriver={useNativeDriver}
      animationInTiming={1}
      animationOutTiming={300}
      animationOut={"fadeOutDown"}
      {...otherProps}
    >
      {children}
    </Modal>
  );
}

// Exports
export default AppModal;
