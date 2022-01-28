// Packages Imports
import { DefaultTheme, Provider } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

// interface PaperProviderProps
export interface PaperProviderProps {
  children: React.ReactNode;
  theme: any;
}

function PaperProvider({ children, theme }: PaperProviderProps) {
  // Theme Hook
  const { colors } = useTheme();

  // construct theme
  const Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...colors,
    },
  };

  // render
  return <Provider theme={Theme}>{children}</Provider>;
}

// exports
export default PaperProvider;
