// Packages imports
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, Dialog, Portal } from "react-native-paper";

// Components/Types imports
import { AppDialogProps } from "../types/ComponentTypes";
import ColorPallete from "../utils/ColorPallete";

// function component
export default function AppDialog(props: AppDialogProps) {
  // Theme
  const { colors, dark } = useTheme();

  // Destructuring props
  const {
    visible,
    hideDialog,
    title,
    children,
    onDonePress,
    okLabel = "OK",
    backdropColor = "rgba(0, 0, 0, 0.5)",
    backgroundColor,
  } = props;

  // theme for dialog
  const dialogTheme = {
    colors: {
      backdrop: backdropColor,
    },
  };

  // backgroundColor for Dialog
  const bgColor = backgroundColor
    ? backgroundColor
    : dark
    ? ColorPallete.black
    : ColorPallete.white;

  // render
  return (
    <Portal theme={dialogTheme}>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={{ backgroundColor: bgColor, padding: 0, margin: 0 }}
      >
        {title ? <Dialog.Title>{title}</Dialog.Title> : null}

        <Dialog.Content style={{ padding: 0, margin: 0 }}>
          {children}
        </Dialog.Content>

        {onDonePress ? (
          <Dialog.Actions style={{ marginRight: 15, marginBottom: 15 }}>
            <Button onPress={hideDialog} color={colors.text}>
              {okLabel}
            </Button>
          </Dialog.Actions>
        ) : null}
      </Dialog>
    </Portal>
  );
}
