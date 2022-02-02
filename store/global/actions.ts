// Imports
import * as actionTypes from "./actionTypes";

// Update Counts
const UpdateCounts = (payload) => ({
  type: actionTypes.UPDATE_COUNT,
  payload,
});

// UpdateRaisedHandsCount Action Creator
const UpdateRaisedHandsCount = (count: any) => ({
  type: actionTypes.UPDATE_RAISED_HANDS_COUNT,
  payload: count,
});

// UpdateUnreadMessagesCount Action Creator
const UpdateUnreadMessagesCount = (count: any) => ({
  type: actionTypes.UPDATE_UNREAD_MESSAGES_COUNT,
  payload: count,
});

// RESET Action Creator
const Reset = () => ({
  type: actionTypes.RESET,
});

const GlobalActionCreators = {
  UpdateRaisedHandsCount,
  UpdateUnreadMessagesCount,
  Reset,
  UpdateCounts
}


export default GlobalActionCreators;