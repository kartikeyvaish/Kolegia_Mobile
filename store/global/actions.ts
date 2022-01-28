// Imports
import * as actionTypes from "./actionTypes";

// UpdateRaisedHandsCount Action Creator
const UpdateRaisedHandsCount = (count: any) => ({
  type: actionTypes.UPDATE_RAISED_HANDS_COUNT,
  payload: count,
});

// UpdateUnreadCount Action Creator
const UpdateUnreadCount = (count: any) => ({
  type: actionTypes.UPDATE_UNREAD_COUNT,
  payload: count,
});

// RESET Action Creator
const Reset = () => ({
  type: actionTypes.RESET,
});

const GlobalActionCreators = {
  UpdateRaisedHandsCount,
  UpdateUnreadCount,
  Reset
}


export default GlobalActionCreators;