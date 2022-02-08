// packages imports
import { connect } from "react-redux";

// Components/Screens imports
import AuthActionCreators from "../store/auth/actions";
import GlobalContext from "../contexts/GlobalContext";
import { GlobalContextProps } from "../types/ComponentTypes";
import LoadingOverlay from "./../components/LoadingOverlay";
import OfflineNotice from "../components/OfflineNotice";
import ThemeProvider from "./ThemeProvider";

// Custom Hooks
import useExpoUpdates from "./../hooks/useExpoUpdates";
import useLoadingOverlay from "./../hooks/useLoadingOverlay";
import useNotifications from "../hooks/useNotifications";

// GlobalProvider function component
function GlobalProvider(props: GlobalContextProps) {
  // Destructure props
  const { User, children, PushToken, SetPushToken, SetUpdates, ...otherProps } =
    props;

  // Use modal custom hook
  const loadingProps = useLoadingOverlay({});

  // Notification/Push Token handlers using custom hook
  useNotifications(PushToken, SetPushToken);

  // use CheckForUpdates custom hook
  const { checkForUpdates } = useExpoUpdates();

  // Global Provider Value
  const provider_value = {
    User,
    PushToken,
    checkForUpdates,
    ...loadingProps,
    ...otherProps,
  };

  // Render component based on user authentication status
  return (
    <GlobalContext.Provider value={provider_value}>
      <ThemeProvider>
        <LoadingOverlay
          IsLoading={loadingProps.IsLoading}
          OverlayText={loadingProps.OverlayText}
        />
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
    FoundItemsCount: state.GlobalState.FoundItemsCount,
    UnreadMessagesCount: state.GlobalState.UnreadMessagesCount,
    LostItemsCount: state.GlobalState.LostItemsCount,
    RaisedHandsCount: state.GlobalState.RaisedHandsCount,
    UsersCount: state.GlobalState.UsersCount,
    IsUpdateAvailable: state.GlobalState.IsUpdateAvailable,
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
