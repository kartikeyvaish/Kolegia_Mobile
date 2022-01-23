// Packages imports
import { useContext } from "react";
import { StyleSheet } from "react-native";

// Local Imports
import AppCard from "./AppCard";
import AppRow from "./AppRow";
import AppText from "./AppText";
import FontNames from "../constants/FontNames";
import GlobalContext from "../contexts/GlobalContext";
import Helper from "../utils/Helper";

// function component for the MyRequirementsListCard
function MyRequirementsListCard({
  title,
  description,
  posted_on,
  onPress,
  posted_by_user_name,
  posted_by,
}) {
  // it props are undefined, return null
  if (!title || !description) return null;

  // get The User
  const { User } = useContext(GlobalContext);

  // Render
  return (
    <AppCard style={styles.container} elevation={6} onPress={onPress}>
      <AppText text={title} family={FontNames.Sofia_Pro_Bold} size={20} />
      <AppText
        text={description}
        family={FontNames.Sofia_Pro_Regular}
        size={18}
      />

      <AppRow marginTop={20}>
        <AppText text="Posted : " />
        <AppText
          text={User?._id === posted_by ? "You" : posted_by_user_name}
          size={16}
          family={FontNames.Inter_Bold}
        />
      </AppRow>

      <AppRow marginTop={5}>
        <AppText text="Posted : " />
        <AppText text={Helper.get_time_ago(posted_on)} />
      </AppRow>
    </AppCard>
  );
}

// Exports
export default MyRequirementsListCard;

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 20,
    borderWidth: 1 - StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
});
