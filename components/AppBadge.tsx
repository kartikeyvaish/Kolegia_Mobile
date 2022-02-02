// packges Imports
import { Badge } from "react-native-paper";
import { Layout, ZoomIn, ZoomOut } from "react-native-reanimated";

// components imports
import Helper from "../utils/Helper";
import AnimatedView from "./AnimatedView";

// interface AppBadgeProps
export interface AppBadgeProps {
  style?: any;
  onPress?: () => void;
  badgeCount?: number;
  badgeContainerStyle?: any;
}

// function component for AppBadge
function AppBadge(props: AppBadgeProps) {
  // Destructuring props
  const { style, onPress, badgeCount, badgeContainerStyle } = props;

  // render
  return !badgeCount ? null : (
    <AnimatedView
      style={badgeContainerStyle}
      entering={ZoomIn}
      exiting={ZoomOut}
      layout={Layout.springify()}
    >
      <Badge size={25} style={style} onPress={onPress}>
        {Helper.abbreviate_number(badgeCount)}
      </Badge>
    </AnimatedView>
  );
}

// exports
export default AppBadge;
