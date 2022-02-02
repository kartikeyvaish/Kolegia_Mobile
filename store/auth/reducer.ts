// Imports
import { StoreActionType } from "../../types/StoreTypes";
import * as actionTypes from "./actionTypes";

// Defining the initial state
const InitialState = {
  User: null,
  PushToken: null,
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

    // Update Push Token
    case actionTypes.UPDATE_PUSH_TOKEN: {
      const myState = { ...state };
      myState.PushToken = action.payload;
      return myState;
    }

    // Reset
    case actionTypes.RESET: {
      const myState = { ...state };
      myState.User = null;
      return myState;
    }

    // Default
    default:
      return state;
  }
};

export default authReducer;
