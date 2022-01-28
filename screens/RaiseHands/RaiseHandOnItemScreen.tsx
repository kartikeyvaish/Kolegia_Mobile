// packages Imports
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";

// components Imports
import AppButton from "../../components/AppButton";
import AppTextInput from "./../../components/AppTextInput";
import ColorPallete from "../../utils/ColorPallete";
import Helper from "../../utils/Helper";
import RaisedHandAPI from "../../api/RaisedHands";
import useLoading from "../../hooks/useLoading";

// function component for the screen
function RaiseHandOnItemScreen({ route, navigation, User }: any) {
  const { product_id } = route.params;

  // Local States
  const [Note, SetNote] = useState("");

  const { Loading, SetLoading } = useLoading({ initialValue: false });

  const RaiseHandCall = async () => {
    try {
      SetLoading(true);
      const apiResponse = await RaisedHandAPI.RaiseHandOnItem(
        {
          product_id,
          note: Note,
        },
        User.auth_token
      );

      SetLoading(false);
      Helper.ShowToast(apiResponse.data.message);

      if (apiResponse.ok) {
        navigation.goBack();
      }
    } catch (error) {
      SetLoading(false);
    }
  };

  if (!product_id || !User) return null;

  return (
    <View style={styles.container}>
      <AppTextInput
        label="Any Note (optional)"
        multiline
        containerStyle={{ maxHeight: 150 }}
        textInputStyle={{ maxHeight: 150 }}
        mode="outlined"
        onChangeText={(text) => SetNote(text)}
      />

      <AppButton
        title="Raise Hand"
        backgroundColor={ColorPallete.dodgerblue}
        onPress={RaiseHandCall}
        loading={Loading}
      />
    </View>
  );
}

// Redux store that holds the states
const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

// Exporting the RaiseHandOnItemScreen component with the states and dispatchers
export default connect(mapStateToProps, null)(RaiseHandOnItemScreen);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
