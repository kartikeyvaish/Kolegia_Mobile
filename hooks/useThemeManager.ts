// Packages imports
import { useEffect } from "react";
import { Appearance } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';

// Utils imports
import ColorPallete from "../utils/ColorPallete";

// exporting useThemeManager hook
export default function useThemeManager(changeHandler: Function, initialTheme: any, changeNavigationBarColor: any) {
  // Set the initial navigation bar color
  useEffect(() => {
    if (changeNavigationBarColor === false) {
      NavigationBar.setBackgroundColorAsync(ColorPallete.purple);
    } else {
      NavigationBar.setBackgroundColorAsync(initialTheme.colors.background ?? ColorPallete.purple);
    }
  }, []);

  // Light/Dark mode change listener
  useEffect(() => {
    Appearance.addChangeListener(onThemeChange);

    return () => Appearance.removeChangeListener(onThemeChange);
  }, []);

  // Theme change handler
  const onThemeChange = ({ colorScheme }) => {
    if (typeof changeHandler === 'function') changeHandler(colorScheme)

    if (changeNavigationBarColor) {
      // Change navigation bar color according to theme
      // If theme is dark, set navigation bar color to ColorPallete.black
      // Else set navigation bar color to ColorPallete.white
      NavigationBar.setBackgroundColorAsync(colorScheme === "dark" ? ColorPallete.black : ColorPallete.white);
    }

  };

  return null;
}
