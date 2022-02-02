// Packages Imports
import { View, StyleSheet, Switch } from "react-native";
import { connect } from "react-redux";

// Local Imports
import AppText from "../../components/AppText";
import ColorPallete from "../../utils/ColorPallete";
import FontNames from "../../constants/FontNames";
import ThemeActionCreators from "./../../store/theme/actions";
import AppContainer from "../../components/AppContainer";

// function component for the ChangeThemeScreen
function ChangeThemeScreen({ Mode, ToggleMode }) {
  // Constants
  const trackColor = {
    false: ColorPallete.properBlack,
    true: ColorPallete.googleColor,
  };

  const thumbColor = Mode !== "light" ? ColorPallete.white : ColorPallete.grey;

  // Render
  return (
    <AppContainer style={styles.container}>
      <AppText
        text="Choose A Mode"
        size={25}
        family={FontNames.Sofia_Pro_Bold}
        marginBottom={20}
      />

      <View style={styles.modeChangeContainer}>
        <AppText text="Dark Mode" family={FontNames.Inter_Regular} />
        <Switch
          trackColor={trackColor}
          thumbColor={thumbColor}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => ToggleMode(!value ? "light" : "dark")}
          value={Mode !== "light"}
        />
      </View>
    </AppContainer>
  );
}

// Map State To Props
const mapStateToProps = (state: any) => {
  return {
    Mode: state.ThemeState.Mode,
  };
};

// Dispatchers that will change the states
const mapDispatchToProps = (dispatch) => {
  return {
    ToggleMode: (colorScheme) =>
      dispatch(ThemeActionCreators.ChangeMode(colorScheme)),
  };
};

// Connect and Export
export default connect(mapStateToProps, mapDispatchToProps)(ChangeThemeScreen);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  modeChangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
