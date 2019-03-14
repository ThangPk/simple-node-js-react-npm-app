// rootReducer.js
import { combineReducers } from "redux";
import loginReducer from "../Views/Login/reducer";
import userReducer from "../Views/Users/reducer";
import groupReducer from "../Views/Groups/reducer";
import changePasswordReducer from "../Views/ChangePassword/reducer";
import authenticateReducer from "../Views/Authentication/reducer";
import cameraReducer from "../Views/Cameras/reducer";
import extractVideoCameraReducer from "../Views/CameraExtractVideo/reducer";
import categoryReducer from "../Views/CameraCategory/reducer";
import cameraPermissionReducer from "../Views/CameraPermissions/reducer";
import dashboardReducer from "../Views/Dashboards/reducer";
import serverReducer from "../Views/Servers/reducer";
import mapReducer from "../Views/Map/reducer";
import peopleReducer from "../Views/Peoples/reducer";
import licensePlateReducer from "../Views/LicensePlates/reducer";
import notificationRuleReducer from "../Views/NotificationRules/reducer";
import errorMessageReducer from "./errorMessageReducer";

export default combineReducers({
  loginReducer,
  userReducer,
  groupReducer,
  changePasswordReducer,
  authenticateReducer,
  cameraReducer,
  extractVideoCameraReducer,
  categoryReducer,
  cameraPermissionReducer,
  dashboardReducer,
  serverReducer,
  mapReducer,
  peopleReducer,
  licensePlateReducer,
  notificationRuleReducer,
  errorMessageReducer
});
