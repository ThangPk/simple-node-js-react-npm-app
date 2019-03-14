import api from "../../Api/ApiClients/user";
import { setUserAuthenticated } from "../Authentication/reducer";

const CHANGE_PASSWORD_FETCHING = "CHANGE_PASSWORD_FETCHING";
const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
const RESET = "RESET";
const CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR";

export function changePassword(oldPassword, newPassword) {
  return dispatch => {
    dispatch(setFetching());
    api.changeUserPassword(oldPassword, newPassword, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setUserAuthenticated(true, false));
        dispatch(setChangePasswordSuccess());
      } else {
        dispatch(setGetError(apiResults.errorMessage));
      }
    });
  };
}

export function resetState() {
  return dispatch => {
    dispatch(setReset());
  };
}

function setFetching() {
  return {
    type: CHANGE_PASSWORD_FETCHING
  };
}

function setChangePasswordSuccess() {
  return {
    type: CHANGE_PASSWORD_SUCCESS
  };
}

function setGetError(errorMessage) {
  return {
    type: CHANGE_PASSWORD_ERROR,
    errorMessage: errorMessage
  };
}

function setReset() {
  return {
    type: RESET
  };
}

// initialize state
const initState = {
  isFetching: false,
  isChangePasswordSuccess: false,
  hasError: false,
  errorMessage: null
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_PASSWORD_FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
        isChangePasswordSuccess: false,
        hasError: false,
        errorMessage: null
      });

    case CHANGE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isChangePasswordSuccess: true,
        hasError: false,
        errorMessage: null
      });

    case CHANGE_PASSWORD_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isChangePasswordSuccess: false,
        hasError: true,
        errorMessage: action.errorMessage
      });
    case RESET:
      return Object.assign({}, state, initState);
    default:
      return state;
  }
}
