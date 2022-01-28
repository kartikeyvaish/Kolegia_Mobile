// Packages Imports
import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";

// Local Imports
import AppRadioButton from "./../../components/AppRadioButton";
import AppText from "../../components/AppText";
import FontNames from "../../constants/FontNames";
import GlobalContext from "./../../contexts/GlobalContext";

// function component for the ChangeThemeScreen
function ChangeThemeScreen({ Mode }) {
  const { ToggleMode } = useContext(GlobalContext);

  // Render
  return (
    <View style={styles.container}>
      <AppText
        text="Choose A Mode"
        size={25}
        family={FontNames.Sofia_Pro_Bold}
        marginBottom={20}
      />
      <AppRadioButton
        label="Dark"
        labelSize={20}
        status={Mode === "dark"}
        onPress={() => ToggleMode("dark")}
      />
      <AppRadioButton
        label="Light"
        labelSize={20}
        status={Mode === "light"}
        onPress={() => ToggleMode("light")}
      />
    </View>
  );
}

// Map State To Props
const mapStateToProps = (state: any) => {
  return {
    Mode: state.ThemeState.Mode,
  };
};

// Connect and Export
export default connect(mapStateToProps, null)(ChangeThemeScreen);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
