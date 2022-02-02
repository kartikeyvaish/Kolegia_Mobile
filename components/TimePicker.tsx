// Packages Imports
import { useState } from "react";
import { View, StyleSheet, Platform, Keyboard } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RectButton } from "react-native-gesture-handler";
import { useFormikContext } from "formik";

// Local imports
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";
import Helper from "../utils/Helper";
import IconNames from "../constants/IconNames";

// functional components for TimePicker
function TimePicker({ time, onTimeSelect, formTitle, onRemove }: any) {
  // Local States
  const [visible, setVisible] = useState(false);

  // Formik Context
  const { setFieldValue, values } = useFormikContext();

  // decide which date to show
  const showTime = time
    ? new Date(time)
    : formTitle
    ? values[formTitle]
      ? values[formTitle]
      : null
    : null;

  // on Date Select function
  const onChange = (event: any, selectedDate: any) => {
    try {
      setVisible(Platform.OS === "ios");
      if (event.type === "set") {
        if (formTitle) setFieldValue(formTitle, selectedDate);

        if (typeof onTimeSelect === "function") onTimeSelect(selectedDate);
      }
    } catch (error) {}
  };

  // on Date remove function
  const onDateRemove = async () => {
    try {
      if (typeof onRemove === "function") onRemove();

      if (formTitle) setFieldValue(formTitle, null);
    } catch (error) {}
  };

  // Open the Picker
  const OpenPicker = async () => {
    try {
      setVisible(true);

      // close the Keyboard
      Keyboard.dismiss();
    } catch (error) {}
  };

  // Render
  return (
    <View style={styles.container}>
      {!showTime ? (
        <AppText
          text=" + Add Lost Time"
          size={20}
          color={ColorPallete.dodgerblue}
          family={FontNames.Sofia_Pro_Regular}
          onPress={OpenPicker}
        />
      ) : (
        <RectButton onPress={OpenPicker}>
          <View style={styles.dateDisplayContainer}>
            <AppText
              text="Lost Time : "
              family={FontNames.Sofia_Pro_Bold}
              size={20}
            />
            <View style={styles.dateContainer}>
              <AppText text={Helper.get_formatted_time(showTime)} size={20} />
              <AppIcon
                family={IconNames.Entypo}
                name="circle-with-cross"
                size={25}
                marginLeft={20}
                color={ColorPallete.dodgerblue}
                onPress={onDateRemove}
              />
            </View>
          </View>
        </RectButton>
      )}

      {visible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={showTime ? new Date(showTime) : new Date()}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

// Exports
export default TimePicker;

// styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  dateDisplayContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: ColorPallete.primary,
    padding: 10,
    borderRadius: 5,
  },
  dateContainer: { flexDirection: "row", alignItems: "center" },
});
