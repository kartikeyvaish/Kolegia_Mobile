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
import AppHelperText from "./AppHelperText";

// functional components for DatePicker
function DatePicker({
  date,
  onDateSelect,
  formTitle,
  onRemove,
  label = " + Add Lost Date",
  placeholder,
  noMaxLimit = false,
}: any) {
  // Local States
  const [visible, setVisible] = useState(false);

  // Formik Context
  const { setFieldValue, values, touched, errors, setFieldTouched } = useFormikContext();

  // decide which date to show
  const showDate = date
    ? new Date(date)
    : formTitle
    ? values[formTitle]
      ? new Date(values[formTitle])
      : null
    : null;

  // on Date Select function
  const onChange = (event: any, selectedDate: Date) => {
    try {
      setVisible(Platform.OS === "ios");
      if (event.type === "set") {
        if (formTitle) setFieldValue(formTitle, selectedDate.toISOString());

        if (typeof onDateSelect === "function") onDateSelect(selectedDate.toISOString());
      }
      setFieldTouched(formTitle);
    } catch (error) {}
  };

  // on Date remove function
  const onDateRemove = async () => {
    try {
      if (typeof onRemove === "function") onRemove();

      if (formTitle) setFieldValue(formTitle, "");
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
      {!showDate ? (
        <>
          <AppText
            text={label}
            size={20}
            color={ColorPallete.dodgerblue}
            family={FontNames.Sofia_Pro_Regular}
            onPress={OpenPicker}
          />
          <AppHelperText text={touched[formTitle] ? errors[formTitle] : null} />
        </>
      ) : (
        <RectButton onPress={OpenPicker} style={{ borderRadius: 12 }}>
          <View style={styles.dateDisplayContainer}>
            <AppText
              text={placeholder ? placeholder : "Lost Date : "}
              family={FontNames.Sofia_Pro_Bold}
              size={20}
            />
            <View style={styles.dateContainer}>
              <AppText text={Helper.get_top_date(showDate, null)} size={20} />
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
          value={showDate ? new Date(showDate) : new Date()}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChange}
          maximumDate={noMaxLimit ? null : new Date()}
        />
      )}
    </View>
  );
}

// Exports
export default DatePicker;

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
    overflow: "hidden",
  },
  dateContainer: { flexDirection: "row", alignItems: "center" },
});
