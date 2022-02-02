// packages imports
import { connect } from "react-redux";

// Components/Screens imports
import AuthActionCreators from "../store/auth/actions";
import GlobalContext from "../contexts/GlobalContext";
import { GlobalContextProps } from "../types/ComponentTypes";
import OfflineNotice from "../components/OfflineNotice";
import Overlay from "../components/OverlayModal";
import ThemeProvider from "./ThemeProvider";

// Custom Hooks
import useModalOverlay from "../hooks/useModalOverlay";
import useNotifications from "../hooks/useNotifications";

// import AsncStoreage from "@react-native-async-storage/async-storage";
// AsncStoreage.clear();

// GlobalProvider function component
function GlobalProvider(props: GlobalContextProps) {
  // Destructure props
  const {
    GlobalState,
    children,
    User,
    PushToken,
    SetPushToken,
    ...otherProps
  } = props;

  // Use modal custom hook
  const modal_props = useModalOverlay();

  // Notification/Push Token handlers using custom hook
  useNotifications(PushToken, SetPushToken);

  // Global Provider Value
  const provider_value = {
    User,
    PushToken,
    ...GlobalState,
    ...modal_props,
    ...otherProps,
  };

  // Render component based on user authentication status
  return (
    <GlobalContext.Provider value={provider_value}>
      <ThemeProvider>
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
    PushToken: state.AuthState.PushToken,
  };
};

// Dispatchers that will change the states
const mapDispatchToProps = (dispatch) => {
  return {
    SetUser: (user: any) => dispatch(AuthActionCreators.Login(user)),
    SetPushToken: (pushToken: any) =>
      dispatch(AuthActionCreators.UpdatePushToken(pushToken)),
  };
};

// Exporting the GlobalProvider component with the states and dispatchers
export default connect(mapStateToProps, mapDispatchToProps)(GlobalProvider);
