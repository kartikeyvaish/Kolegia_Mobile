// Components/Screens imports
import AppNavigator from "./navigation/AppNavigator";
import GlobalProvider from "./providers/GlobalProvider";

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
