// Packages imports
import { View, StyleSheet, Image } from "react-native";

// Local files and components imports
import AppText from "./AppText";
import AppCard from "./AppCard";
import ColorPallete from "../utils/ColorPallete";
import Helper from "../utils/Helper";
import AppRow from "./AppRow";

// function component for ProductListCard
function ProductListCard(props) {
  // Get first image from the array of images
  let product_image = Helper.get_first_image(props.files);

  // Render
  return (
    <AppCard style={styles.container} elevation={10} onPress={props.onPress}>
      <View style={{ flexDirection: "row" }}>
        {product_image ? (
          <View style={{ width: 100, height: 100 }}>
            <Image
              source={{ uri: product_image }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ) : null}

        <View style={{ flex: 1, marginLeft: 15 }}>
          <AppText text={props.name} size={20} />
          <AppText
            text={props.description}
            size={16}
            marginTop={5}
            textProps={{
              numberOfLines: 3,
            }}
          />

          {props.price ? (
            <AppText
              text={Helper.convert_to_rupees(props.price)}
              size={20}
              marginTop={10}
              color={ColorPallete.green}
            />
          ) : null}
        </View>
      </View>

      {props.posted_on ? (
        <AppRow alignItems="center" marginTop={10}>
          <AppText text="Posted: " size={16} />
          <AppText text={Helper.get_time_ago(props.posted_on)} size={16} />
        </AppRow>
      ) : null}
    </AppCard>
  );
}

// Exports
export default ProductListCard;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: ColorPallete.grey,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%", borderRadius: 10 },
});
