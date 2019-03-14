import api from "../../Api/ApiClients/user";
import { setUserAuthenticated } from "../Authentication/reducer";

const LOGIN_FETCHING = "LOGIN_FETCHING";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

export function login(username, password) {
  return dispatch => {
    dispatch(setFetching());

    api.login(username, password, apiResults => {
      if (apiResults.isSuccess) {
        let user = apiResults.data;
        saveLocalUserInfo(user);

        if (user.need_to_change_pwd) {
          dispatch(setUserAuthenticated(false, true));
        } else {
          dispatch(setUserAuthenticated(true, true));
        }
        dispatch(setLoginSuccess());
      } else {
        dispatch(setGetError(apiResults.errorMessage));
      }
    });
  };
}

function saveLocalUserInfo(user) {
  localStorage.setItem("ACCESS-TOKEN", user.access_token);
  localStorage.setItem("USER_NAME", user.first_name + " " + user.last_name);
}

function setFetching() {
  return {
    type: LOGIN_FETCHING
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: LOGIN_SUCCESS
  };
}

function setGetError(errorMessage) {
  return {
    type: LOGIN_ERROR,
    errorMessage: errorMessage
  };
}

// initialize state
const initState = {
  isFetching: false,
  isLoginSuccess: false,
  hasError: false,
  errorMessage: null
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
        isLoginSuccess: false,
        hasError: false,
        errorMessage: null
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isLoginSuccess: true,
        hasError: false,
        errorMessage: null
      });

    case LOGIN_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isLoginSuccess: false,
        hasError: true,
        errorMessage: action.errorMessage
      });

    default:
      return state;
  }
}
