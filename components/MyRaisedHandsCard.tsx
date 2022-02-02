// Packages Imports
import { StyleSheet } from "react-native";
import { FadeInLeft, FadeOutLeft, Layout } from "react-native-reanimated";

// Local components/Types imports
import AppButton from "./AppButton";
import AnimatedView from "./AnimatedView";
import ColorPallete from "../utils/ColorPallete";
import Helper from "../utils/Helper";
import KeyDescriptionCard from "./KeyDescriptionCard";
import RaisedHandAPI from "../api/RaisedHands";
import ToastMessages from "./../constants/Messages";
import useLoading from "../hooks/useLoading";

// function component for MyRaisedHandsCard
function MyRaisedHandsCard(props) {
  const { _id, note, product_details, auth_token, onDelete } = props;

  // Local States
  const { Loading, SetLoading } = useLoading({});

  // Revoke hand
  const RevokeRaisedHand = async () => {
    try {
      SetLoading(true);
      const apiResponse = await RaisedHandAPI.RejectRaisedHand(_id, auth_token);
      SetLoading(false);

      if (apiResponse.ok) {
        onDelete(_id);
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      SetLoading(false);
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // Render
  return (
    <AnimatedView
      entering={FadeInLeft}
      exiting={FadeOutLeft}
      layout={Layout}
      style={styles.container}
    >
      <KeyDescriptionCard
        title={"Item Name - "}
        description={product_details.name}
        style={{ marginBottom: 10 }}
      />

      <KeyDescriptionCard
        title={"Note - "}
        description={note}
        style={{ marginBottom: 10 }}
      />

      <AppButton
        title="Revoke"
        height={50}
        loading={Loading}
        onPress={RevokeRaisedHand}
        backgroundColor={ColorPallete.primary}
      />
    </AnimatedView>
  );
}

// Exports
export default MyRaisedHandsCard;

// Styles
const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
  },
  Row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  ButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
