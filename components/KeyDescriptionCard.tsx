// Packages imports
import { View } from "react-native";

// Local components imports
import FontNames from "../constants/FontNames";
import AppRow from "./AppRow";
import AppText from "./AppText";

// function component for KeyDescriptionCard
function KeyDescriptionCard({ title, description }) {
  return (
    <AppRow justifyContent="center">
      <AppText text={title} size={22} family={FontNames.Sofia_Pro_Bold} />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <AppText
          text={description}
          size={20}
          family={FontNames.Sofia_Pro_Medium}
        />
      </View>
    </AppRow>
  );
}

// Exports
export default KeyDescriptionCard;
