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


const AuthActionCreators = {
  Login,
  UpdateUser,
  Logout,
}

export default AuthActionCreators;