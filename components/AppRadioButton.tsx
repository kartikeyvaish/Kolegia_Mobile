// Packages imports
import { StyleSheet, Pressable, View } from "react-native";
import { RadioButton } from "react-native-paper";

// Components/Types imports
import { AppRadioButtonProps } from "../types/ComponentTypes";
import ColorPallete from "../utils/ColorPallete";
import AppText from "./AppText";

// functional component for AppRadioButton
function AppRadioButton(props: AppRadioButtonProps) {
  // Destructuring props
  const {
    status = false,
    label,
    onPress,
    labelComponent,
    disabled,
    containerStyle,
  } = props;

  // Render
  return (
    <Pressable style={[styles.container, containerStyle]} onPress={onPress}>
      <RadioButton
        value="first"
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
    </Pressable>
  );
}

// Exports
export default AppRadioButton;

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
});
