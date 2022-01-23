// Packages Imports
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { TouchableRipple } from "react-native-paper";

// components types imports
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import FontNames from "../constants/FontNames";
import IconNames from "../constants/IconNames";
import { MenuCardProps } from "../types/ComponentTypes";
import { useTheme } from "@react-navigation/native";

// functional component for MenuCard
function MenuCard(props: MenuCardProps) {
  // Theme
  const { colors } = useTheme();

  // Destructuring props
  const {
    showMenu = true,
    prefixIconProps,
    name,
    backgroundColor,
    color,
    containerStyle,
    customPrefixIcon,
    customSuffixIcon,
    onPress,
    showPrefixIcon = true,
    showSuffixIcon = true,
    suffixIconProps,
    textContainerStyle,
    textStyle,
    borderBottomColor = colors.text,
    borderBottomWidth = 0,
  } = props;

  // Final container style
  const FinalContainerStyle: StyleProp<ViewStyle> = [
    styles.container,
    {
      borderBottomColor: borderBottomColor,
      borderBottomWidth: borderBottomWidth,
    },
    containerStyle,
  ];

  // Text container style
  const TextContainerStyle: StyleProp<ViewStyle> = [
    { flex: 1, marginLeft: 15 },
    {
      backgroundColor,
    },
    textContainerStyle,
  ];

  // Render
  return showMenu ? (
    <TouchableRipple onPress={onPress}>
      <View style={FinalContainerStyle}>
        {showPrefixIcon ? (
          <View style={{ marginLeft: 15 }}>
            {customPrefixIcon ? (
              customPrefixIcon
            ) : (
              <AppIcon size={25} {...prefixIconProps} />
            )}
          </View>
        ) : null}

        <View style={TextContainerStyle}>
          <AppText
            text={name}
            family={FontNames.Inter_Regular}
            style={textStyle}
            color={color ?? undefined}
            size={20}
          />
        </View>

        {showSuffixIcon ? (
          <View style={{ marginRight: 10 }}>
            {customSuffixIcon ? (
              customSuffixIcon
            ) : (
              <AppIcon
                family={IconNames.AntDesign}
                name="right"
                size={20}
                {...suffixIconProps}
              />
            )}
          </View>
        ) : null}
      </View>
    </TouchableRipple>
  ) : null;
}

// Exporting the component
export default MenuCard;

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
