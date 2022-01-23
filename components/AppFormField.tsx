// Packages Imports
import { useFormikContext } from "formik";

// Local Imports
import { AppFormFieldProps } from "../types/ComponentTypes";
import AppTextInput from "./AppTextInput";

// function component for AppFormField
function AppFormField({ title, controlled, ...otherProps }: AppFormFieldProps) {
  // Formik Props
  const { touched, errors, setFieldTouched, handleChange, values } =
    useFormikContext();

  // Get the field's current value
  const field_value = values[title]?.toString() ?? "";

  // Render
  return (
    <AppTextInput
      error={touched[title] ? errors[title] : ""}
      onBlur={() => setFieldTouched(title)}
      onChangeText={handleChange(title)}
      // If controlled is true, then add value to the input otherwise not.
      {...(controlled ? { value: field_value } : {})}
      {...otherProps}
    />
  );
}

// Exports
export default AppFormField;
