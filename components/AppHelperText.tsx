// Packages Imports
import { HelperText } from "react-native-paper";

// Local Files imports
import ColorPallete from "../utils/ColorPallete";
import { AppHelperTextProps } from "../types/ComponentTypes";

// Exporting the AppHelperText function component
function AppHelperText(props: AppHelperTextProps) {
  // Destructuring props
  const {
    text,
    helperTextType = "error",
    helperTextPadding = "normal",
    helperTextStyle,
    helperTextColor = ColorPallete.red,
  } = props;

  // Render
  return (
    <HelperText
      type={helperTextType}
      visible={text?.length ? true : false}
      padding={helperTextPadding}
      style={[helperTextStyle, { color: helperTextColor }]}
    >
      {text}
    </HelperText>
  );
}

// Exports
export default AppHelperText;
