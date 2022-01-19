import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import { TouchableRipple } from "react-native-paper";

interface AppCardProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  elevation?: number;
  onPress?: () => void;
}

function AppCard({ style, children, elevation = 5, onPress }: AppCardProps) {
  // Theme for the component
  const { colors } = useTheme();

  // Styles for the container
  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    { backgroundColor: colors.background, elevation: elevation },
    style,
  ];

  return (
    <TouchableRipple style={containerStyle} onPress={onPress}>
      <>{children}</>
    </TouchableRipple>
  );
}

export default AppCard;

const styles = StyleSheet.create({
  container: {},
});
