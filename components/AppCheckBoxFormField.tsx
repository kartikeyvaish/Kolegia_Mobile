// Packages Imports
import { useFormikContext } from "formik";
import { View, StyleSheet } from "react-native";

// Local Imports
import AppCheckBox from "./AppCheckBox";
import { AppFormFieldProps } from "../types/ComponentTypes";

// function component for AppCheckBoxFormField
function AppCheckBoxFormField({
  title,
  label,
  ...otherProps
}: AppFormFieldProps) {
  // Formik Props
  const { touched, errors, setFieldTouched, values, setFieldValue } =
    useFormikContext();

  // Render
  return (
    <View style={styles.container}>
      <AppCheckBox
        label={label}
        status={values[title]}
        onPress={() => {
          setFieldValue(title, values[title] ? false : true);
          setFieldTouched(title, true, false);
        }}
        error={touched[title] ? errors[title] : ""}
        {...otherProps}
      />
    </View>
  );
}

// Exports
export default AppCheckBoxFormField;

// styles
const styles = StyleSheet.create({
  container: {},
});
