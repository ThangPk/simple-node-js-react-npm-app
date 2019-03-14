const RESET_MESSAGE = "RESET_MESSAGE";
const ADD_ERROR_MESSAGE = "ADD_ERROR_MESSAGE";
const ADD_INFO_MESSAGE = "ADD_INFO_MESSAGE";

export function resetMessage() {
  return dispatch => {
    dispatch(setResetMessage());
  };
}

export function addErrorMessage(errorMessage) {
  return dispatch => {
    dispatch(setAddErrorMessage(errorMessage));
  };
}

export function addInfoMessage(infoMessage) {
  return dispatch => {
    dispatch(setAddInfoMessage(infoMessage));
  };
}

function setResetMessage() {
  return {
    type: RESET_MESSAGE
  };
}

function setAddErrorMessage(errorMessage) {
  return {
    type: ADD_ERROR_MESSAGE,
    errorMessage: errorMessage
  };
}

function setAddInfoMessage(infoMessage) {
  return {
    type: ADD_INFO_MESSAGE,
    infoMessage: infoMessage
  };
}

export default function reducer(
  state = { errorMessage: null, infoMessage: null },
  action
) {
  const { type, errorMessage, infoMessage } = action;
  switch (type) {
    case RESET_MESSAGE:
      return { errorMessage: null, infoMessage: null };
    case ADD_ERROR_MESSAGE:
      return { errorMessage: errorMessage };
    case ADD_INFO_MESSAGE:
      return { infoMessage: infoMessage };
    default:
      return state;
  }
}
