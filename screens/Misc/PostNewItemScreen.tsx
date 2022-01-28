// Packages imports
import { View, StyleSheet } from "react-native";

// Local imports
import AppText from "../../components/AppText";
import FontNames from "../../constants/FontNames";
import NewItem from "../../components/NewItem";
import ScreenNames from "../../navigation/ScreenNames";

// PostNewItemScreen
function PostNewItemScreen({ navigation }: any) {
  // Render
  return (
    <View style={styles.container}>
      <AppText
        text="What do yo want to do?"
        size={30}
        family={FontNames.Sofia_Pro_Bold}
        marginBottom={20}
      />

      <NewItem
        title="Buy and Sell"
        description="If you want to sell something, you can post it here."
        onPress={() => navigation.navigate(ScreenNames.PostNewBuyItemScreen)}
      />

      <NewItem
        title="Lost and Found"
        description="If you have lost something, you can post it here."
        onPress={() => navigation.navigate(ScreenNames.PostNewLostItemScreen)}
      />

      <NewItem
        title="Requirement"
        description="If you want something, and maybe other user has that thing so post it as a requirement."
        onPress={() =>
          navigation.navigate(ScreenNames.PostNewRequirementScreen)
        }
      />
    </View>
  );
}

// Exports
export default PostNewItemScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
