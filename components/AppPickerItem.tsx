// Packages Imports
import { useTheme } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { TouchableRipple } from "react-native-paper";

// Local Imports
import { AppPickerItemProps } from "../types/ComponentTypes";
import ColorPallete from "../utils/ColorPallete";
import AppIcon from "./AppIcon";
import AppText from "./AppText";

interface Props extends AppPickerItemProps {
  onPress?: () => void;
  style?: any;
}

// function component for AppPickerItem
function AppPickerItem({ iconProps, label, onPress, style }: Props) {
  const { dark } = useTheme();

  // render
  return (
    <TouchableRipple
      style={[styles.container, style]}
      onPress={onPress}
      rippleColor={!dark ? ColorPallete.lightRipple : ColorPallete.greyRipple}
    >
      <>
        {iconProps?.family && iconProps?.name ? (
          <View style={styles.iconContainer}>
            <AppIcon {...iconProps} />
          </View>
        ) : null}

        <View style={styles.labelContainer}>
          <AppText text={label} size={20} />
        </View>
      </>
    </TouchableRipple>
  );
}

// exports
export default AppPickerItem;

// styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  labelContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
});
