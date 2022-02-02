// Imports
import * as actionTypes from "./actionTypes";

// Auth Action Creators
// Login User
const Login = (User: any) => ({
  type: actionTypes.LOGIN,
  payload: User,
});

// Update User
const UpdateUser = (User: any) => ({
  type: actionTypes.UPDATE_USER,
  payload: User,
});

// Logout User
const Logout = () => ({
  type: actionTypes.LOGOUT,
});

// Update Push Token for User
const UpdatePushToken = (PushToken) => ({
  type: actionTypes.UPDATE_PUSH_TOKEN,
  payload: PushToken,
});

const AuthActionCreators = {
  Login,
  UpdateUser,
  Logout,
  UpdatePushToken
}

export default AuthActionCreators;