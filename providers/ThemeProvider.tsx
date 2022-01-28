// Packages Imports
import { NavigationContainer } from "@react-navigation/native";
import PaperProvider from "./PaperProvider";

// ThemeProvider function component
function ThemeProvider({ theme, children }) {
  // Render
  return (
    <NavigationContainer theme={theme}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </NavigationContainer>
  );
}

// exports
export default ThemeProvider;
