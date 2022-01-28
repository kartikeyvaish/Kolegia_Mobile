// Packages Imports
import { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";

// Local components/Types imports
import AuthAPI from "../../api/AuthAPI";
import AuthActionCreators from "../../store/auth/actions";
import GlobalContext from "./../../contexts/GlobalContext";
import Helper from "./../../utils/Helper";
import MenuSwitch from "../../components/MenuSwitch";
import ToastMessages from "./../../constants/Messages";
import useLoading from "../../hooks/useLoading";

// function component for the NotificationsPreferenceScreen
function NotificationsPreferenceScreen({ UpdateUser }) {
  // Global Context
  const { User } = useContext(GlobalContext);

  const { Loading, SetLoading } = useLoading({ initialValue: false });

  // API call to toggle mode
  const TogglePushNotification = async () => {
    try {
      SetLoading(true);
      const apiResponse = await AuthAPI.TogglePushNotification(User.auth_token);

      if (apiResponse.ok) {
        UpdateUser({
          send_push_notification: apiResponse.data.current_status,
        });
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }

      SetLoading(false);
    } catch (error) {
      SetLoading(false);
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // Render
  return (
    <View style={styles.container}>
      <MenuSwitch
        title="Send Notifications"
        value={User.send_push_notification}
        onPress={TogglePushNotification}
        loading={Loading}
      />
    </View>
  );
}

// Map Dispatch to Props
const mapDispatchToProps = (dispatch) => ({
  UpdateUser: (data) => dispatch(AuthActionCreators.UpdateUser(data)),
});

// Connect and export the screen
export default connect(null, mapDispatchToProps)(NotificationsPreferenceScreen);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
