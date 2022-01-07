// Packages Imports
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";

// Types/Components imports
import { AppRowProps } from "../types/ComponentTypes";

// functional component for AppRow
function AppRow(props: AppRowProps) {
  // Destructuring props
  const { onPress, children, style, ...otherProps } = props;

  // Container Styles
  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    { ...otherProps },
    style,
  ];

  // render
  return (
    <Pressable style={containerStyle} onPress={onPress}>
      {children}
    </Pressable>
  );
}

// Exports
export default AppRow;

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
