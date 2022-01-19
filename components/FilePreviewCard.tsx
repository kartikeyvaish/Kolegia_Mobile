// Packages Imports
import { View, StyleSheet, Image } from "react-native";

// Local files imports
import AppIcon from "./AppIcon";
import IconNames from "../constants/IconNames";
import ColorPallete from "../utils/ColorPallete";

// types
interface FilePreviewCardProps {
  uri?: string;
  onPress?: () => void;
  _id?: string;
}

// function component for FilePreviewCard
function FilePreviewCard({ uri, onPress }: FilePreviewCardProps) {
  // Render
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: uri }}
        style={{
          width: 80,
          height: 80,
          marginBottom: 10,
          borderColor: ColorPallete.white,
          borderWidth: 1,
        }}
      />
      <AppIcon
        family={IconNames.Entypo}
        name={"circle-with-cross"}
        size={35}
        style={{}}
        onPress={onPress}
      />
    </View>
  );
}

// Exports
export default FilePreviewCard;

// Styles
const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    borderRadius: 5,
    padding: 5,
    paddingBottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
