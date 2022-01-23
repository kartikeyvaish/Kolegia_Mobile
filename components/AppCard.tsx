// Packages imports
import { StyleProp, ViewStyle } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

// AppCardProps interface
interface AppCardProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  elevation?: number;
  onPress?: () => void;
}

// function component for the AppCard
function AppCard({ style, children, elevation = 5, onPress }: AppCardProps) {
  // Theme for the component
  const { colors } = useTheme();

  // Styles for the container
  const containerStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.background,
      elevation: elevation,
      borderColor: colors.text,
    },
    style,
  ];

  // Render
  return (
    <TouchableRipple style={containerStyle} onPress={onPress}>
      <>{children}</>
    </TouchableRipple>
  );
}

// Exports
export default AppCard;
