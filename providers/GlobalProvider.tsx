// packages imports
import { connect } from "react-redux";

// Components/Screens imports
import AuthActionCreators from "../store/auth/actions";
import GlobalContext from "../contexts/GlobalContext";
import OfflineNotice from "../components/OfflineNotice";
import Overlay from "../components/OverlayModal";
import ThemeProvider from "./ThemeProvider";
import ThemeActionCreators from "../store/theme/actions";
import useThemeManager from "../hooks/useThemeManager";
import useModalOverlay from "../hooks/useModalOverlay";

// import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage.clear();

interface GlobalProviderProps {
  children?: any;
  ToggleMode?: any;
  User?: any;
  SetUser?: any;
  GlobalState?: any;
  modal_props?: any;
  Theme?: any;
}

// GlobalProvider function component
function GlobalProvider(props: GlobalProviderProps) {
  // Destructure props
  const { GlobalState, children, Theme, ToggleMode, ...otherProps } = props;

  // Use modal custom hook
  const modal_props = useModalOverlay();

  // Light/Dark Mode manager using custom hook
  useThemeManager(ToggleMode, Theme, true);

  // Global Provider Value
  const provider_value = {
    ToggleMode,
    ...GlobalState,
    ...modal_props,
    ...otherProps,
  };

  // Render component based on user authentication status
  return (
    <GlobalContext.Provider value={provider_value}>
      <ThemeProvider theme={Theme}>
        <Overlay {...modal_props} />
        {children}
        <OfflineNotice />
      </ThemeProvider>
    </GlobalContext.Provider>
  );
}

// Redux store that holds the states
const mapStateToProps = (state) => {
  return {
    Theme: state.ThemeState.Theme,
    User: state.AuthState.User,
    GlobalState: state.GlobalState,
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

// Exporting the GlobalProvider component with the states and dispatchers
export default connect(mapStateToProps, mapDispatchToProps)(GlobalProvider);
