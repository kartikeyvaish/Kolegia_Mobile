// Imports
import { Appearance } from "react-native";
import * as NavigationBar from "expo-navigation-bar"

import * as actionTypes from "./actionTypes";
import Dark from "./Dark";
import Light from "./Light";
import { StoreActionType } from "../../types/StoreTypes";
import ColorPallete from "../../utils/ColorPallete";

// Getting the initial scheme
const defaultScheme = Appearance.getColorScheme();

// Defining the initial state
const InitialState = {
  Mode: defaultScheme || "light",
  Theme: defaultScheme === "dark" ? Dark : Light,
};

// Reducers

// Reducer for the theme
const themeReducer = (state = InitialState, action: StoreActionType) => {
  switch (action.type) {
    // Theme Change
    case actionTypes.CHANGE_MODE: {
      const myState = { ...state };
      myState.Mode = action.payload;
      myState.Theme = action.payload === "dark" ? Dark : Light;
      NavigationBar.setBackgroundColorAsync(myState.Theme.colors.background);
      return myState;
    }

    // Reset
    case actionTypes.RESET: {
      return InitialState;
    }

    // Default
    default:
      return state;
  }
};

// Exports
export default themeReducer;
