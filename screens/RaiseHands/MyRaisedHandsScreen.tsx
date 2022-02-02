// Packges Imports
import { useEffect, useState } from "react";
import { connect } from "react-redux";

// Local Imports
import AppLoading from "./../../components/AppLoading";
import Helper from "./../../utils/Helper";
import MyRaisedHandsCard from "../../components/MyRaisedHandsCard";
import RaisedHandAPI from "./../../api/RaisedHands";
import ToastMessages from "./../../constants/Messages";
import useLoading from "./../../hooks/useLoading";

// function component for MyRaisedHandsScreen
function MyRaisedHandsScreen({ User }) {
  // Local States
  const [RaisedHands, SetRaisedHands] = useState([]);
  const { Loading, SetLoading } = useLoading({});

  // get initial hands
  useEffect(() => {
    GetItemsRaisedByYou();
  }, []);

  // Get raised by you items
  const GetItemsRaisedByYou = async () => {
    try {
      SetLoading(true);
      const apiResponse = await RaisedHandAPI.GetRaisedHandsByMe(
        User?.auth_token
      );
      SetLoading(false);

      if (apiResponse.ok) {
        SetRaisedHands(apiResponse.data.raised_hands);
      } else {
        Helper.ShowToast(apiResponse.data.messages);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  // Delete RaisedHands from the list
  const DeleteResponse = (_id: any) => {
    try {
      let responses = [...RaisedHands];
      responses = responses.filter((response) => response._id !== _id);
      SetRaisedHands(responses);
    } catch (error) {}
  };

  // Render
  return (
    <>
      {Loading ? (
        <AppLoading loadingText="Getting Responses.." />
      ) : RaisedHands.length === 0 ? (
        <AppLoading
          loadingText="You have not raised any hands"
          loading={false}
        />
      ) : (
        RaisedHands.map((raisedHand) => {
          return (
            <MyRaisedHandsCard
              key={raisedHand._id}
              {...raisedHand}
              onDelete={DeleteResponse}
              auth_token={User?.auth_token}
            />
          );
        })
      )}
    </>
  );
}

// Map state to Props
const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

// connect and export
export default connect(mapStateToProps)(MyRaisedHandsScreen);
