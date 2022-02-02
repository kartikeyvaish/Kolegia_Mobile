// Packages imports
import { View, StyleSheet, Linking } from "react-native";
import { FadeInRight } from "react-native-reanimated";

// Local/Component Imports
import AnimatedView from "./AnimatedView";
import AppIcon from "./AppIcon";
import AppImage from "./AppImage";
import AppText from "./AppText";
import ColorPallete from "../utils/ColorPallete";
import { DeveloperCardProps } from "../types/ComponentTypes";
import IconNames from "../constants/IconNames";

// function component for DeveloperCard
function DeveloperCard(props: DeveloperCardProps) {
  // Destructuring props
  const { name, profile_picture, linkedin_url, github_url, email_address } =
    props;

  // Check and open link
  const OpenLink = async (link: string) => {
    try {
      //check if link can be opened using Linking
      const canOpen = await Linking.canOpenURL(link);

      // if can open, open link
      if (canOpen) Linking.openURL(link);
    } catch (error) {}
  };

  // Render
  return (
    <AnimatedView style={styles.container} entering={FadeInRight}>
      <View style={styles.imageContainer}>
        <AppImage
          uri={profile_picture}
          style={styles.image}
          showBorder={false}
        />
      </View>

      <View style={{ flex: 1, marginLeft: 15 }}>
        <AppText text={name} size={23} />

        <View style={styles.iconContainer}>
          <AppIcon
            family={IconNames.MaterialIcons}
            name="email"
            size={30}
            marginRight={15}
            onPress={() => Linking.openURL(`mailto:${email_address}`)}
          />
          <AppIcon
            family={IconNames.AntDesign}
            name="linkedin-square"
            size={25}
            marginRight={15}
            onPress={() => OpenLink(linkedin_url)}
          />
          <AppIcon
            family={IconNames.AntDesign}
            name="github"
            size={25}
            marginRight={15}
            onPress={() => OpenLink(github_url)}
          />
        </View>
      </View>
    </AnimatedView>
  );
}

// Exports
export default DeveloperCard;

// Styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 20,
    borderColor: ColorPallete.primary,
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    paddingTop: 10,
  },
  image: { width: "100%", height: "100%" },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
