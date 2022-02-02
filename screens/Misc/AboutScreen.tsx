// Packages imports
import { View, StyleSheet, FlatList } from "react-native";

// Local Imports
import AboutUsDetails from "../../schema/AboutUsSchema";
import AppText from "../../components/AppText";
import ColorPallete from "../../utils/ColorPallete";
import configurations from "./../../config/config";
import DeveloperCard from "../../components/DeveloperCard";
import FontNames from "../../constants/FontNames";

// function component for AboutUsScreen
function AboutScreen() {
  // Render
  return (
    <View style={styles.container}>
      <FlatList
        data={AboutUsDetails.DeveloperDetails}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <DeveloperCard {...item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={{ alignItems: "center" }}>
              <AppText
                text={configurations.application_name}
                family={FontNames.Mulish_Bold}
                size={50}
                color={ColorPallete.primary}
              />
              <AppText
                text={configurations.application_tag_line}
                size={18}
                color={ColorPallete.primary}
              />
              <AppText
                text={AboutUsDetails.AppDetails}
                size={20}
                marginTop={20}
              />
            </View>

            <AppText
              text={"About the Developers"}
              size={20}
              family={FontNames.Inter_Bold}
              color={ColorPallete.googleColor}
              marginBottom={15}
              marginTop={15}
            />
          </>
        }
      />
    </View>
  );
}

// Exports
export default AboutScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
