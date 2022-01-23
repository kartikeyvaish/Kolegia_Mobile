// Imports
import * as actionTypes from "./actionTypes";

// UpdateRaisedHandsCount Action Creator
const UpdateRaisedHandsCount = (count: any) => ({
  type: actionTypes.UPDATE_RAISED_HANDS_COUNT,
  payload: count,
});


const GlobalActionCreators = {
  UpdateRaisedHandsCount,
}

export default GlobalActionCreators;