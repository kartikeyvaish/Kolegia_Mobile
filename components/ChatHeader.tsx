// packages Imports
import { View, StyleSheet, Linking, StatusBar } from "react-native";
import {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeOutDown,
  FadeOutLeft,
  FadeOutRight,
  Layout,
} from "react-native-reanimated";

// Local Components Imports
import AnimatedView from "./AnimatedView";
import AnimatedText from "./AnimiatedText";
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import Avatar from "./Avatar";
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";
import Helper from "../utils/Helper";
import IconNames from "../constants/IconNames";
import { useTheme } from "@react-navigation/native";

// export interface ChatHeaderProps
export interface ChatHeaderProps {
  imageUri?: string;
  name?: string;
  subtitle?: string;
  showSubtitle?: boolean;
  phone?: string;
  onBackPress?: () => void;
  online?: boolean;
}

function ChatHeader(props: ChatHeaderProps) {
  // Destructuring props
  const { imageUri, name, subtitle, phone, onBackPress, online } = props;

  // Theme Hook
  const { dark } = useTheme();

  // Conditional Rendering
  const backgroundColor = dark ? ColorPallete.purple : ColorPallete.dodgerblue;

  // render
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle="light-content"
        animated={false}
      />
      {/* Back Button and Profile Picture */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AppIcon
          family={IconNames.AntDesign}
          name={"arrowleft"}
          size={25}
          marginRight={5}
          onPress={onBackPress}
          color={ColorPallete.white}
        />
        <Avatar
          uri={imageUri}
          size={40}
          showOnline={true}
          online={online}
          onPress={onBackPress}
        />
      </View>

      {/* Name and Online Status */}
      <View style={{ marginLeft: 20 }}>
        <AnimatedView
          entering={FadeInLeft}
          exiting={FadeOutLeft}
          layout={Layout}
        >
          <AppText
            text={name}
            family={FontNames.Inter_Bold}
            size={18}
            color={ColorPallete.white}
          />

          {subtitle ? (
            <AnimatedView
              entering={FadeInDown}
              exiting={FadeOutDown}
              layout={Layout}
            >
              <AppText text={subtitle} size={16} color={ColorPallete.white} />
            </AnimatedView>
          ) : null}
        </AnimatedView>
      </View>

      {/* Buttons Container */}
      <AnimatedView
        style={styles.buttonContainer}
        entering={FadeInRight}
        exiting={FadeOutRight}
        layout={Layout.springify()}
      >
        <AppIcon
          family={IconNames.Feather}
          name="phone"
          size={25}
          onPress={phone ? () => Linking.openURL(`tel:+91${phone}`) : null}
          marginRight={20}
          color={ColorPallete.white}
        />
        <AppIcon
          family={IconNames.Ionicons}
          name="logo-whatsapp"
          size={26}
          onPress={phone ? () => Helper.OpenWhatsApp(phone) : null}
          color={ColorPallete.white}
        />
      </AnimatedView>
    </View>
  );
}

// Exports
export default ChatHeader;

// Styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: ColorPallete.dodgerblue,
    elevation: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginRight: 15,
    flexDirection: "row",
  },
});
