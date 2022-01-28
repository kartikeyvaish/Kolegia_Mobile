// Packages imports
import { useContext } from "react";
import { View, StyleSheet, Image } from "react-native";

// Local files and components imports
import AppCard from "./AppCard";
import AppImage from "./AppImage";
import AppRow from "./AppRow";
import AppText from "./AppText";
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";
import GlobalContext from "./../contexts/GlobalContext";
import Helper from "../utils/Helper";

// function component for MyProductListCard
function MyProductListCard(props) {
  // Get first image from the array of images
  let product_image = Helper.get_first_image(props.files);
  let isNetworkImage = product_image.startsWith("http");

  // Get current User
  const { User } = useContext(GlobalContext);

  // Render
  return (
    <AppCard style={styles.container} elevation={10} onPress={props.onPress}>
      <View style={{ flexDirection: "row" }}>
        {product_image ? (
          <View style={{ width: 100, height: 100 }}>
            {isNetworkImage ? (
              <AppImage
                uri={product_image}
                style={styles.image}
                resizeMode="cover"
                showBorder={false}
              />
            ) : (
              <Image
                source={{ uri: product_image }}
                style={styles.image}
                resizeMode="cover"
              />
            )}
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
              family={FontNames.Sofia_Pro_Bold}
            />
          ) : null}
        </View>
      </View>

      {props.posted_by ? (
        <AppRow alignItems="center" marginTop={10}>
          <AppText text="Posted By: " size={16} />
          <AppText
            text={
              User?._id === props.posted_by ? "You" : props.owner_details?.name
            }
            size={16}
            family={FontNames.Inter_Bold}
          />
        </AppRow>
      ) : null}

      {props.posted_on ? (
        <AppRow alignItems="center" marginTop={5}>
          <AppText text="Posted: " size={16} />
          <AppText text={Helper.get_time_ago(props.posted_on)} size={16} />
        </AppRow>
      ) : null}
    </AppCard>
  );
}

// Exports
export default MyProductListCard;

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
