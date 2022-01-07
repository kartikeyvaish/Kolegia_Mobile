// Packages imports
import { useTheme } from "@react-navigation/native";

// Icons Imports
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// Configs/Constants and Types
import { AppIconTypes } from "../types/ComponentTypes";
import IconNames from "../constants/IconNames";

// Icon component
function AppIcon(props: AppIconTypes) {
  // Destructuring props
  const {
    family,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    style,
    onPress,
    ...otherProps
  } = props;

  // Theme Manager
  const { colors } = useTheme();

  // Icon Component Props
  const finalProps = {
    // name: name,
    color: colors.text,
    onPress: onPress,
    style: [
      {
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop,
        marginBottom: marginBottom,
      },
      style,
    ],
    ...otherProps,
  };

  // return the icon component based on the name
  switch (family) {
    case IconNames.AntDesign:
      return <AntDesign {...finalProps} />;
    case IconNames.Entypo:
      return <Entypo {...finalProps} />;
    case IconNames.Feather:
      return <Feather {...finalProps} />;
    case IconNames.FontAwesome:
      return <FontAwesome {...finalProps} />;
    case IconNames.MaterialCommunityIcons:
      return <MaterialCommunityIcons {...finalProps} />;
    case IconNames.MaterialIcons:
      return <MaterialIcons {...finalProps} />;
    default:
      return null;
  }
}

// Exports
export default AppIcon;
