// Packages imports
import { StyleSheet, Pressable, View } from "react-native";
import { Checkbox } from "react-native-paper";

// Components/Types imports
import { AppRadioButtonProps } from "../types/ComponentTypes";
import ColorPallete from "../utils/ColorPallete";
import AppHelperText from "./AppHelperText";
import AppText from "./AppText";

// functional component for AppCheckBox
function AppCheckBox(props: AppRadioButtonProps) {
  // Destructuring props
  const {
    status = false,
    label,
    onPress,
    labelComponent,
    disabled,
    containerStyle,
    error,
  } = props;

  // Render
  return (
    <Pressable style={[styles.container, containerStyle]} onPress={onPress}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <Checkbox
          status={status ? "checked" : "unchecked"}
          onPress={onPress}
          color={ColorPallete.primary}
          disabled={disabled}
          uncheckedColor={ColorPallete.primary}
        />
        {labelComponent ? (
          labelComponent
        ) : (
          <View style={{ flex: 1 }}>
            <AppText text={label} size={18} marginTop={-3} marginLeft={10} />
          </View>
        )}
      </View>

      <AppHelperText text={error} />
    </Pressable>
  );
}

// Exports
export default AppCheckBox;

// Styles
const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    overflow: "hidden",
  },
});
