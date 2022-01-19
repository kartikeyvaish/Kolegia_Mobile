// Packages Imports
import { useState } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

// components/screens imports
import AppDialog from "./AppDialog";
import AppHelperText from "./AppHelperText";
import AppText from "./AppText";
import AppIcon from "./AppIcon";
import ColorPallete from "../utils/ColorPallete";
import IconNames from "../constants/IconNames";
import { PickerTitleKey } from "../schema/BuySellItemSchema";
import { PickerProps } from "../types/ComponentTypes";
import { TouchableRipple } from "react-native-paper";
import { Keyboard } from "react-native";

// function component for PickerProps
function Picker({
  items,
  onItemPress,
  pickerTitle,
  selected,
  error,
  containerStyle,
}: PickerProps) {
  // Themes
  const { colors } = useTheme();
  // Local States
  const [ModalVisible, SetModalVisible] = useState(false);

  // Merge container styles
  const finalContainerStyle: StyleProp<ViewStyle> = [
    styles.pickerContainer,
    {
      backgroundColor: colors.background,
      borderColor: error ? ColorPallete.red : ColorPallete.grey,
    },
    containerStyle,
  ];

  // function to open the dialog
  const OpenModal = async () => {
    try {
      Keyboard.dismiss();
      SetModalVisible(true);
    } catch (error) {}
  };

  // function to close the dialog
  const CloseModal = async () => {
    try {
      Keyboard.dismiss();
      SetModalVisible(false);
    } catch (error) {}
  };

  // Render
  return (
    <>
      <AppText text={pickerTitle} marginBottom={10} />
      <TouchableRipple style={finalContainerStyle} onPress={OpenModal}>
        <>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppIcon {...selected.iconProps} />
            <AppText text={selected.label} marginLeft={20} size={18} />
          </View>
          <AppIcon family={IconNames.AntDesign} name="caretdown" />
        </>
      </TouchableRipple>

      <AppHelperText
        text={error}
        helperTextStyle={{
          marginBottom: error ? 20 : 0,
        }}
      />

      <AppDialog
        visible={ModalVisible}
        hideDialog={CloseModal}
        title={pickerTitle}
      >
        {items.map((item) =>
          item._id === PickerTitleKey ? null : (
            <TouchableRipple
              style={styles.pickerItemContainer}
              key={item._id}
              onPress={() => {
                onItemPress(item);
                CloseModal();
              }}
            >
              <>
                <View style={{ minWidth: 40 }}>
                  <AppIcon {...item.iconProps} />
                </View>
                <View style={{ flex: 1 }}>
                  <AppText text={item.label} marginLeft={15} size={20} />
                </View>
              </>
            </TouchableRipple>
          )
        )}
      </AppDialog>
    </>
  );
}

export default Picker;

const styles = StyleSheet.create({
  pickerContainer: {
    width: "100%",
    padding: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    flexDirection: "row",
    borderColor: ColorPallete.grey,
    borderWidth: 1,
    elevation: 2,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  pickerItemContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
