// Imports
import { combineReducers } from "@reduxjs/toolkit";

// Importing all the reducers
import authReducer from "./auth/reducer";
import globalReducer from "./global/reducer";
import themeReducer from "./theme/reducer";

// Combining all the reducers and exporting
export default combineReducers({
  // Auth reducer which has User Details
  AuthState: authReducer,
  // Global reducer which has GlobalVariables
  GlobalState: globalReducer,
  // Theme reducer which has Theme Details
  ThemeState: themeReducer
});
