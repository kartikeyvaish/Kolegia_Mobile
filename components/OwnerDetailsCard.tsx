// packages Imports
import { View, StyleSheet } from "react-native";

// Local componnets Imports
import AppImage from "./AppImage";
import AppText from "./AppText";
import FontNames from "../constants/FontNames";
import KeyDescriptionCard from "./KeyDescriptionCard";

// function component for OwnerDetailsCard
function OwnerDetailsCard({ owner_details }) {
  // Render
  return (
    <>
      <AppText
        text="Seller Details"
        size={22}
        family={FontNames.Sofia_Pro_Bold}
        marginLeft={15}
        marginTop={20}
      />

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <AppImage
            uri={owner_details.profile_picture}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={{ flex: 1 }}>
          <KeyDescriptionCard
            title={"Name : "}
            description={owner_details.name}
          />
          <KeyDescriptionCard
            title={"Hostel : "}
            description={owner_details.hostel}
          />
          <KeyDescriptionCard
            title={"Room No. : "}
            description={owner_details.room_number}
          />
        </View>
      </View>
    </>
  );
}

// Exports
export default OwnerDetailsCard;

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 10,
  },
  imageContainer: {
    justifyContent: "center",
    paddingRight: 30,
    paddingLeft: 15,
  },
  image: { width: 80, height: 80, borderRadius: 40 },
});
