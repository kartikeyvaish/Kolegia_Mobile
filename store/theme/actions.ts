// Imports
import * as actionTypes from "./actionTypes";

// Action Creators

// Action Creators: Change theme state variable
const ChangeMode = (Mode: string) => ({
  type: actionTypes.CHANGE_MODE,
  payload: Mode,
});

// Action Creators: Reset the state
const Reset = () => ({
  type: actionTypes.RESET,
});

const ThemeActionCreators = {
  ChangeMode,
  Reset,
}

export default ThemeActionCreators;
