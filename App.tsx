// packages imports
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-native-paper";

// Components/Screens imports
import AppNavigator from "./navigation/AppNavigator";
import { ChangeMode } from "./store/theme/actions";
import OfflineNotice from "./components/OfflineNotice";
import useThemeManager from "./hooks/useThemeManager";

// App function component
function App(props) {
  // Destructure props
  const { ToggleMode, Theme } = props;

  // Light/Dark Mode manager using custom hook
  useThemeManager(ToggleMode, Theme, true);

  // Render component based on user authentication status
  return (
    <NavigationContainer theme={Theme}>
      <Provider>
        <AppNavigator />
      </Provider>
      <OfflineNotice />
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
    ToggleMode: (colorScheme) => dispatch(ChangeMode(colorScheme)),
  };
};

// Exporting the App component with the states and dispatchers
export default connect(mapStateToProps, mapDispatchToProps)(App);
