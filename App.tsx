// packages imports
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-native-paper";

// Components/Screens imports
import AppNavigator from "./navigation/AppNavigator";
import GlobalContext from "./contexts/GlobalContext";
import OfflineNotice from "./components/OfflineNotice";
import Overlay from "./components/OverlayModal";
import useModalOverlay from "./hooks/useModalOverlay";
import useThemeManager from "./hooks/useThemeManager";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeActionCreators from "./store/theme/actions";
import AuthActionCreators from "./store/auth/actions";

// AsyncStorage.clear();

// App function component
function App(props) {
  // Destructure props
  const { ToggleMode, Theme, User, SetUser } = props;

  // Use modal custom hook
  const modal_props = useModalOverlay();

  // Light/Dark Mode manager using custom hook
  useThemeManager(ToggleMode, Theme, true);

  // Global Provider Value
  const provider_value = {
    User: User,
    SetUser: SetUser,
    ...modal_props,
  };

  // Render component based on user authentication status
  return (
    <GlobalContext.Provider value={provider_value}>
      <NavigationContainer theme={Theme}>
        <Provider>
          <Overlay
            visible={modal_props.OverlayVisible}
            text={modal_props.Text}
          />
          <AppNavigator />
        </Provider>
        <OfflineNotice />
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

// Redux store that holds the states
const mapStateToProps = (state) => {
  return {
    Theme: state.ThemeState.Theme,
    User: state.AuthState.User,
  };
};

// Dispatchers that will change the states
const mapDispatchToProps = (dispatch) => {
  return {
    ToggleMode: (colorScheme) =>
      dispatch(ThemeActionCreators.ChangeMode(colorScheme)),
    SetUser: (user: any) => dispatch(AuthActionCreators.Login(user)),
  };
};

// Exporting the App component with the states and dispatchers
export default connect(mapStateToProps, mapDispatchToProps)(App);
