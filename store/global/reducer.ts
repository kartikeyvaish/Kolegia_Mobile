// Imports
import { StoreActionType } from "../../types/StoreTypes";
import * as actionTypes from "./actionTypes";

// Defining the initial state
const InitialState = {
  LostItemsCount: 0,
  FoundItemsCount: 0,
  UsersCount: 0,
  RaisedHandsCount: 0,
  UnreadMessagesCount: 0,
  IsUpdateAvailable: false,
};

// Reducers

const globalReducer = (state = InitialState, action: StoreActionType) => {
  switch (action.type) {
    // Update counts
    case actionTypes.UPDATE_COUNT:
      return {
        ...state,
        ...action.payload,
      };

    // UpdateRaisedHandsCount
    case actionTypes.UPDATE_RAISED_HANDS_COUNT:
      return {
        ...state,
        RaisedHandsCount: action.payload,
      };

    // UpdateUnreadMessagesCount
    case actionTypes.UPDATE_UNREAD_MESSAGES_COUNT:
      return {
        ...state,
        UnreadMessagesCount: action.payload,
      };

    case actionTypes.UPDATE_CHECK_FOR_UPDATES:
      return {
        ...state,
        IsUpdateAvailable: action.payload,
      };

    // Reset
    case actionTypes.RESET: {
      return InitialState;
    }

    // Default
    default:
      return state;
  }
};

export default globalReducer;
