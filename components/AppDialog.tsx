// Packages imports
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, Dialog, Portal } from "react-native-paper";

// Components/Types imports
import { AppDialogProps } from "../types/ComponentTypes";

// function component
export default function AppDialog(props: AppDialogProps) {
  // Theme
  const { colors } = useTheme();

  // Destructuring props
  const {
    visible,
    hideDialog,
    title,
    children,
    onDonePress,
    okLabel = "OK",
  } = props;

  // render
  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{ backgroundColor: colors.background }}
        >
          {title ? <Dialog.Title>{title}</Dialog.Title> : null}

          <Dialog.Content style={{ paddingLeft: 0, paddingRight: 0 }}>
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
    </View>
  );
}
