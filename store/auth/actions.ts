// Imports
import * as actionTypes from "./actionTypes";

// Auth Action Creators
// Login User
export const Login = (User: any) => ({
  type: actionTypes.LOGIN,
  payload: User,
});

// Update User
export const UpdateUser = (User: any) => ({
  type: actionTypes.UPDATE_USER,
  payload: User,
});

// Logout User
export const Logout = () => ({
  type: actionTypes.LOGOUT,
});
