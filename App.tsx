// Components/Screens imports
import AppNavigator from "./navigation/AppNavigator";
import GlobalProvider from "./providers/GlobalProvider";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage.clear();

// App function component
function App() {
  // render
  return (
    <GlobalProvider>
      <AppNavigator />
    </GlobalProvider>
  );
}

// exports
export default App;
