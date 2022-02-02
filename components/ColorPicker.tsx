// Packages Imports
import { View } from "react-native";
import IconNames from "../constants/IconNames";

// Local Imports
import AppFormField from "./AppFormField";
import AppIcon from "./AppIcon";
import ColorBox from "./ColorBox";

// function component fro ColorPicker
function ColorPicker({ title, placeholder, controlled }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1 }}>
        <AppFormField
          placeholder={placeholder}
          title={title}
          controlled={controlled}
          leftIcon={() => (
            <AppIcon
              family={IconNames.Ionicons}
              name={"color-palette"}
              size={20}
            />
          )}
        />
      </View>

      <ColorBox />
    </View>
  );
}

// exports
export default ColorPicker;
