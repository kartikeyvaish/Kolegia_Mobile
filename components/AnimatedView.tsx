// Packages Imports
import Animated from "react-native-reanimated";
import { AnimatedViewProps } from "../types/ComponentTypes";

// function component for AnimatedView
function AnimatedView({ children, style, ...otherProps }: AnimatedViewProps) {
  // Render
  return (
    <Animated.View style={style} {...otherProps}>
      {children}
    </Animated.View>
  );
}

// Exports
export default AnimatedView;
