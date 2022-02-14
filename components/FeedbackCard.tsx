// Packages Imports
import { View, StyleSheet } from "react-native";
import { FadeInLeft, FadeOutLeft, Layout } from "react-native-reanimated";

// component types imports
import AnimatedView from "./AnimatedView";
import AppCard from "./AppCard";
import AppImage from "./AppImage";
import AppRow from "./AppRow";
import AppText from "./AppText";
import { FeedbackCardProps } from "../types/ComponentTypes";
import FontNames from "../constants/FontNames";
import Helper from "./../utils/Helper";

// function component for FeedbackCard
function FeedbackCard(props: FeedbackCardProps) {
  // Destructure props
  const { owner_details, feedback, feedback_datetime } = props;

  // Render
  return (
    <AnimatedView entering={FadeInLeft} exiting={FadeOutLeft} layout={Layout}>
      <AppCard style={styles.container}>
        <AppRow alignItems="center">
          <AppImage
            uri={owner_details.profile_picture}
            style={styles.image}
            borderRadius={50}
            showBorder={false}
          />

          <View style={{ marginLeft: 15 }}>
            <AppText text={owner_details.name} size={18} family={FontNames.Inter_Bold} />
            <AppText
              size={13}
              text={Helper.get_time_ago(feedback_datetime)}
              family={FontNames.Sofia_Pro_Light}
            />
          </View>
        </AppRow>

        <AppText text={feedback} marginTop={10} family={FontNames.Sofia_Pro_Light} />
      </AppCard>
    </AnimatedView>
  );
}

// exports
export default FeedbackCard;

// styles
const styles = StyleSheet.create({
  container: { margin: 10, padding: 10, borderRadius: 10 },
  image: {
    width: 40,
    height: 40,
  },
});
