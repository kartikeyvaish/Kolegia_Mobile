// Imports
import { Appearance } from "react-native";

import * as actionTypes from "./actionTypes";
import Dark from "./Dark";
import Light from "./Light";
import { StoreActionType } from "../../types/StoreTypes";

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
