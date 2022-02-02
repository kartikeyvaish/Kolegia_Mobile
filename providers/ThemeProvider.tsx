// Packages Imports
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";

// Local imports
import PaperProvider from "./PaperProvider";
import ThemeActionCreators from "../store/theme/actions";
import useThemeManager from "../hooks/useThemeManager";

// ThemeProvider function component
function ThemeProvider({ ToggleMode, children, Theme }) {
  // Light/Dark Mode manager using custom hook
  useThemeManager(ToggleMode, Theme, true);

  // Render
  return (
    <NavigationContainer
      theme={Theme}
      linking={{
        prefixes: ["https://kolegia.com", "kolegia://"],
      }}
    >
      <PaperProvider theme={Theme}>{children}</PaperProvider>
    </NavigationContainer>
  );
}

// Redux store that holds the states
const mapStateToProps = (state) => {
  return {
    Theme: state.ThemeState.Theme,
  };
};

// Dispatchers that will change the states
const mapDispatchToProps = (dispatch) => {
  return {
    ToggleMode: (colorScheme: any) =>
      dispatch(ThemeActionCreators.ChangeMode(colorScheme)),
  };
};

// Exporting the GlobalProvider component with the states and dispatchers
export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider);
