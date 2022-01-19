// Packages Imports
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { Button } from "react-native-paper";

// Local Files imports
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";
import FilePreviewCard from "./FilePreviewCard";
import IconNames from "../constants/IconNames";

interface FilePreviewContainerProps {
  Files: Array<any>;
  onPress: (id: string) => void;
  onAddMorePress: () => void;
}

// function comoponent for FilePreviewContainer
function FilePreviewContainer({
  Files = [],
  onPress,
  onAddMorePress,
}: FilePreviewContainerProps) {
  // Render
  return (
    <View style={styles.container}>
      <AppText
        text={Files.length ? "Preview Files" : "No Files Selected"}
        size={20}
        family={FontNames.Mulish_Bold}
        marginLeft={5}
        marginBottom={15}
      />

      <FlatList
        data={Files}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <FilePreviewCard {...item} onPress={() => onPress(item._id)} />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        ListFooterComponent={
          Files.length === 0 ? (
            <Button
              style={styles.ChooseFilesContainer}
              onPress={onAddMorePress}
              color={ColorPallete.white}
            >
              Choose Files
            </Button>
          ) : (
            <Pressable style={styles.AddMoreContainer} onPress={onAddMorePress}>
              <AppIcon
                family={IconNames.AntDesign}
                name={"pluscircleo"}
                size={50}
              />
            </Pressable>
          )
        }
      />
    </View>
  );
}

// Exports
export default FilePreviewContainer;

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginBottom: 20,
  },
  AddMoreContainer: {
    height: 80,
    width: 80,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  ChooseFilesContainer: {
    backgroundColor: ColorPallete.primary,
    width: 200,
    height: 50,
    justifyContent: "center",
    marginBottom: 20,
  },
});
