// Imports
import { StoreActionType } from "../../types/StoreTypes";
import * as actionTypes from "./actionTypes";

// Defining the initial state
const InitialState = {
  User: null,
};

// Reducers
const authReducer = (state = InitialState, action: StoreActionType) => {
  switch (action.type) {
    // User Login
    case actionTypes.LOGIN: {
      const myState = { ...state };
      myState.User = action.payload;
      return myState;
    }

    // Update User
    case actionTypes.UPDATE_USER: {
      const myState = { ...state };
      myState.User = { ...myState.User, ...action.payload };
      return myState;
    }

    // User Logout
    case actionTypes.LOGOUT: {
      const myState = { ...state };
      myState.User = null;
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

export default authReducer;
