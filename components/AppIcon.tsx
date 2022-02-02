// Packages imports
import { ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";

// Icons Imports
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
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
    loading,
    color,
    ...otherProps
  } = props;

  // Theme Manager
  const { colors } = useTheme();

  const IconColor = color ? color : colors.text;

  // Icon Component Props
  const finalProps = {
    // name: name,
    color: IconColor,
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

  if (loading)
    return (
      <>
        <ActivityIndicator color={IconColor} size={"large"} />
      </>
    );

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
    case IconNames.FontAwesome5:
      return <FontAwesome5 {...finalProps} />;
    case IconNames.Ionicons:
      return <Ionicons {...finalProps} />;
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
