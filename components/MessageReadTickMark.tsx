// local imports
import AppIcon from "./AppIcon";
import ColorPallete from "../utils/ColorPallete";
import IconNames from "../constants/IconNames";
import { MessageReadTickMarkProps } from "../types/ComponentTypes";

// function component for MessageReadTickMark
function MessageReadTickMark(props: MessageReadTickMarkProps) {
  // Destructuring Props
  const { read, delivered, iconColor } = props;

  // get color
  const mainIconColor = iconColor ? iconColor : undefined;

  // render
  return delivered === false ? (
    <AppIcon
      family={IconNames.Ionicons}
      name={"time-outline"}
      size={17}
      color={mainIconColor}
      marginLeft={5}
    />
  ) : (
    <AppIcon
      family={IconNames.Ionicons}
      name={read === true ? "checkmark-done" : "checkmark"}
      color={read === true ? ColorPallete.primary : mainIconColor}
      size={17}
      marginLeft={5}
    />
  );
}

// exports
export default MessageReadTickMark;
