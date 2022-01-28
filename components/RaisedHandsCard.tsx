// Packages Imports
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FadeInLeft, FadeOutLeft, Layout } from "react-native-reanimated";

// Local components/Types imports
import AppButton from "./AppButton";
import AppCard from "./AppCard";
import AnimatedView from "./AnimatedView";
import AppText from "./AppText";
import ColorPallete from "../utils/ColorPallete";
import FontNames from "../constants/FontNames";
import RaisedHandAPI from "../api/RaisedHands";
import Helper from "../utils/Helper";
import ToastMessages from "./../constants/Messages";

// function component for RaisedHandsCard
function RaisedHandsCard({
  _id,
  note,
  product_details,
  raised_by_details,
  onDeletePress = (_id: any) => {},
  onNavigatePress = (data: any) => {},
  auth_token,
}) {
  // Local States
  const [RejectLoading, SetRejectLoading] = useState(false);
  const [AcceptLoading, SetAcceptLoading] = useState(false);
  const [Accepted, SetAccepted] = useState(false);
  const [RoomData, SetRoomData] = useState<any>(null);

  // API call to delete raised hand
  const DeleteResponseAPI = async () => {
    try {
      SetRejectLoading(true);
      const apiResponse = await RaisedHandAPI.RejectRaisedHand(_id, auth_token);
      SetRejectLoading(false);

      if (apiResponse.ok) onDeletePress(_id);
      else Helper.ShowToast(apiResponse.data.message);
    } catch (error) {
      SetRejectLoading(false);
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // API call to accept the raised hand
  const AcceptResponseAPI = async () => {
    try {
      SetAcceptLoading(true);
      const apiResponse = await RaisedHandAPI.AcceptRaisedhand(_id, auth_token);
      SetAcceptLoading(false);

      if (apiResponse.ok) {
        SetRoomData({
          item_id: _id,
          room_id: apiResponse.data.room_id,
          chatting_with: apiResponse.data.raised_by_details,
        });
        SetAccepted(true);
      } else Helper.ShowToast(apiResponse.data.message);
    } catch (error) {
      SetAcceptLoading(false);
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // Render
  return (
    <AnimatedView entering={FadeInLeft} exiting={FadeOutLeft} layout={Layout}>
      <AppCard style={styles.container} elevation={10} onPress={null}>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <AppText
            size={20}
            family={FontNames.Inter_Bold}
            text="Item Name - "
          />
          <View style={{ flex: 1, marginTop: 2 }}>
            <AppText text={product_details.name} size={18} />
          </View>
        </View>

        <View style={styles.Row}>
          <AppText text="Note - " size={20} family={FontNames.Inter_Bold} />
          <View style={{ flex: 1, marginTop: 2 }}>
            <AppText text={note} size={18} />
          </View>
        </View>

        <View style={styles.Row}>
          <AppText
            text="Raised By - "
            size={20}
            family={FontNames.Inter_Bold}
          />
          <View style={{ flex: 1, marginTop: 2 }}>
            <AppText text={raised_by_details.name} size={18} />
          </View>
        </View>

        <View style={styles.ButtonsContainer}>
          {Accepted ? (
            <View style={{ flex: 1, marginRight: 10 }}>
              <AppButton
                title="Go To Chat Room"
                height={50}
                backgroundColor={ColorPallete.primary}
                onPress={() => onNavigatePress(RoomData)}
              />
            </View>
          ) : (
            <>
              <View style={{ flex: 1, marginRight: 10 }}>
                <AppButton
                  title="Reject"
                  height={50}
                  backgroundColor={ColorPallete.red}
                  onPress={DeleteResponseAPI}
                  loading={RejectLoading}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <AppButton
                  title="Accept"
                  height={50}
                  backgroundColor={ColorPallete.green}
                  onPress={() => AcceptResponseAPI()}
                  loading={AcceptLoading}
                />
              </View>
            </>
          )}
        </View>
      </AppCard>
    </AnimatedView>
  );
}

// Exports
export default RaisedHandsCard;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 15,
    borderRadius: 12,
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
