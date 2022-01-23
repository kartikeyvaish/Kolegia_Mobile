// Packages Imports
import { useFormikContext } from "formik";

// Component/Types imports
import AppButton from "./AppButton";
import { AppSubmitButtonProps } from "../types/ComponentTypes";

// function component for AppSubmitButton
function AppSubmitButton(props: AppSubmitButtonProps) {
  // Formik context
  const { handleSubmit } = useFormikContext();

  // Destructure props
  const { CustomButton } = props;

  // Render
  return CustomButton ? (
    <CustomButton onPress={props.onPress ? props.onPress : handleSubmit} />
  ) : (
    <AppButton
      {...props}
      onPress={props.onPress ? props.onPress : handleSubmit}
    />
  );
}

// exports
export default AppSubmitButton;
