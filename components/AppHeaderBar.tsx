// Packages Imports
import { StyleSheet } from "react-native";
import { FadeInUp, FadeOutUp, Layout } from "react-native-reanimated";

// Components/Types imports
import AnimatedView from "./AnimatedView";
import { AppHeaderBarProps } from "../types/ComponentTypes";
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import IconNames from "../constants/IconNames";

// Function component that renders the AppHeaderBar
function AppHeaderBar(props: AppHeaderBarProps) {
  // Destructuring props
  const {
    title,
    titleColor,
    onIconPress,
    backgroundColor,
    isHeaderVisible,
    style,
  } = props;

  // Render
  return !isHeaderVisible ? null : (
    <AnimatedView
      entering={FadeInUp}
      exiting={FadeOutUp}
      layout={Layout.springify()}
      style={[styles.container, { backgroundColor }, style]}
    >
      <AppIcon
        family={IconNames.AntDesign}
        name={"arrowleft"}
        size={28}
        onPress={onIconPress}
        color={titleColor ? titleColor : undefined}
      />
      <AppText
        text={title}
        size={25}
        marginLeft={15}
        color={titleColor ? titleColor : undefined}
      />
    </AnimatedView>
  );
}

// Exports
export default AppHeaderBar;

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    width: "100%",
  },
});
