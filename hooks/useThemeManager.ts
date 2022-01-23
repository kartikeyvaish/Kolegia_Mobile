// Packages imports
import { useEffect } from "react";
import { Appearance } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';


// exporting useThemeManager hook
export default function useThemeManager(changeHandler: Function, initialTheme: any, changeNavigationBarColor: any) {
  // Set the initial navigation bar color
  useEffect(() => {
    if (changeNavigationBarColor)
      NavigationBar.setBackgroundColorAsync(initialTheme.colors.background);
  }, []);

  // Light/Dark mode change listener
  useEffect(() => {
    Appearance.addChangeListener(onThemeChange);

    return () => Appearance.removeChangeListener(onThemeChange);
  }, []);

  // Theme change handler
  const onThemeChange = ({ colorScheme }) => {
    if (typeof changeHandler === 'function') changeHandler(colorScheme)
  };

  return null;
}
