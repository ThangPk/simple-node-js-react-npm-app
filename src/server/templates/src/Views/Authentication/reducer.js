import api from "../../Api/ApiClients/user";

const FETCHING_AUTHENTICATED = "FETCHING_AUTHENTICATED";
const AUTHENTICATED = "AUTHENTICATED";

export function authenticate() {
  return dispatch => {
    if (localStorage.getItem("ACCESS-TOKEN")) {
      api.auth(apiResults => {
        if (apiResults.isSuccess) {
          dispatch(setAuthenticated(true, false));
        } else {
          if (apiResults.data === "PASSWORD_CHANGED_REQUIRED") {
            dispatch(setAuthenticated(false, true));
          } else {
            window.localStorage.clear();
            dispatch(setAuthenticated(false, false));
          }
        }
      });
    } else {
      dispatch(setAuthenticated(false, false));
    }
  };
}

export function setUserAuthenticated(
  isAuthenticated,
  isPasswordRequiredChanged
) {
  return dispatch => {
    dispatch(setAuthenticated(isAuthenticated, isPasswordRequiredChanged));
  };
}

function setAuthenticated(isAuthenticated, isPasswordRequiredChanged) {
  return {
    type: AUTHENTICATED,
    isAuthenticated: isAuthenticated,
    isPasswordRequiredChanged: isPasswordRequiredChanged
  };
}

// initialize state
const initState = {
  isFetching: true,
  isAuthenticated: false,
  isPasswordRequiredChanged: false
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case FETCHING_AUTHENTICATED:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        isPasswordRequiredChanged: false
      });
    case AUTHENTICATED:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: action.isAuthenticated,
        isPasswordRequiredChanged: action.isPasswordRequiredChanged
      });

    default:
      return state;
  }
}
