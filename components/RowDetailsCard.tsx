// Packages imports
import { View, StyleSheet } from "react-native";

// Local imports
import AppText from "./AppText";
import FontNames from "../constants/FontNames";
import { RowDetailsCardProps } from "../types/ComponentTypes";

// function componnet for RowDetailsCard
function RowDetailsCard(props: RowDetailsCardProps) {
  // Destructuring props
  const { style, title, description, descriptionProps } = props;

  // Render
  return (
    <View style={[styles.container, style]}>
      <View style={{ flex: 1 }}>
        <AppText text={title} family={FontNames.Sofia_Pro_Bold} />
      </View>
      <View style={{ flex: 2 }}>
        <AppText text={description} {...descriptionProps} />
      </View>
    </View>
  );
}

// exports
export default RowDetailsCard;

// Styles
const styles = StyleSheet.create({
  container: { flexDirection: "row", marginBottom: 10 },
});
