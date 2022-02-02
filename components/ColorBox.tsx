// Packges imports
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useFormikContext } from "formik";
import { FadeInRight, FadeOutRight, Layout } from "react-native-reanimated";

// Local imports
import AnimatedView from "./AnimatedView";
import Colors from "../constants/Colors";
import { ColorBoxProps } from "../types/ComponentTypes";

// function component for ColorBox
function ColorBox(props: ColorBoxProps) {
  // Destructure props
  const { style, color, title = "color" } = props;

  // Formik Props
  const { values } = useFormikContext();

  // find style
  let boxColor = color ? color : values[title];

  // convert string to lowerCase
  if (typeof boxColor === "string") boxColor = boxColor.toLowerCase();

  // backgroundColor of the color box
  const backgroundColor = boxColor
    ? Colors[boxColor]
      ? Colors[boxColor]
      : null
    : null;

  // container Style
  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    style,
    { backgroundColor },
  ];

  // Render
  return backgroundColor ? (
    <AnimatedView
      style={containerStyle}
      entering={FadeInRight}
      exiting={FadeOutRight}
      layout={Layout.springify()}
    >
      <></>
    </AnimatedView>
  ) : null;
}

// exports
export default ColorBox;

// Styles
const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
});
