// Imports
import { StoreActionType } from "../../types/StoreTypes";
import * as actionTypes from "./actionTypes";

// Defining the initial state
const InitialState = {
  RaisedHandsCount: 0,
};

// Reducers

const globalReducer = (state = InitialState, action: StoreActionType) => {
  switch (action.type) {
    // UpdateRaisedHandsCount
    case actionTypes.UPDATE_RAISED_HANDS_COUNT:
      return {
        ...state,
        RaisedHandsCount: action.payload,
      };

    // Default
    default:
      return state;
  }
};

export default globalReducer;
