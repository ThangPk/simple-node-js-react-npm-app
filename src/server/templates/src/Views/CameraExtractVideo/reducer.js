import api from "../../Api/ApiClients/video";
import { addErrorMessage } from "../../Store/errorMessageReducer";

const EXTRACT_VIDEO_CAMERA_FETCHING = "EXTRACT_VIDEO_CAMERA_FETCHING";
const CAMERA_DATA_SUCCESS = "CAMERA_DATA_SUCCESS";
const SEARCH_VIDEO_SUCCESS = "SEARCH_VIDEO_SUCCESS";
const ASSIGNED_VIDEO_SUCCESS = "ASSIGNED_VIDEO_SUCCESS";
const STATE_CHANGED = "STATE_CHANGED";

export function getCamera(id) {
  return dispatch => {
    dispatch(actionChanged(true, EXTRACT_VIDEO_CAMERA_FETCHING));
    api.getCamera(id, apiResults => {
      if (apiResults.isSuccess) {
        let data = apiResults.data;
        dispatch(actionChanged(data, CAMERA_DATA_SUCCESS));
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function searchVideoForExtract(cameraId, startTime, endTime) {
  return dispatch => {
    dispatch(actionChanged(true, EXTRACT_VIDEO_CAMERA_FETCHING));
    api.searchVideoForExtract(cameraId, startTime, endTime, results => {
      if (results.isSuccess) {
        dispatch(actionChanged(results.data, SEARCH_VIDEO_SUCCESS));
      } else {
        dispatch(addErrorMessage(results.errorMessage));
      }
    });
  };
}

export function assignedVideoPlaybackFor(
  videoId,
  expiredAt,
  comment,
  groupIds,
  userIds
) {
  return dispatch => {
    dispatch(actionChanged(true, EXTRACT_VIDEO_CAMERA_FETCHING));
    api.assignedVideoPlaybackFor(
      videoId,
      expiredAt,
      comment,
      groupIds,
      userIds,
      results => {
        if (results.isSuccess) {
          dispatch(actionChanged(results.data, ASSIGNED_VIDEO_SUCCESS));
        } else {
          dispatch(addErrorMessage(results.errorMessage));
        }
      }
    );
  };
}

export function stateChanged() {
  return dispatch => {
    dispatch(actionChanged("", STATE_CHANGED));
  };
}

// initialize state
const initState = {
  isFetching: false,
  data: "",
  searchData: "",
  groupDatas: "",
  userDatas: "",
  isAssignedSuccess: false
};

function actionChanged(data, actionType) {
  switch (actionType) {
    case EXTRACT_VIDEO_CAMERA_FETCHING:
      return {
        type: EXTRACT_VIDEO_CAMERA_FETCHING,
        isFetching: data
      };
    case CAMERA_DATA_SUCCESS:
      return {
        type: CAMERA_DATA_SUCCESS,
        data: data
      };
    case SEARCH_VIDEO_SUCCESS:
      return {
        type: SEARCH_VIDEO_SUCCESS,
        searchData: data
      };
    case ASSIGNED_VIDEO_SUCCESS:
      return {
        type: ASSIGNED_VIDEO_SUCCESS,
        isAssignedSuccess: true
      };
    case STATE_CHANGED:
      return {
        type: STATE_CHANGED,
        searchData: "",
        isAssignedSuccess: false,
        isFetching: false
      };
    default:
      return null;
  }
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case EXTRACT_VIDEO_CAMERA_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });
    case CAMERA_DATA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data
      });
    case SEARCH_VIDEO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        searchData: action.searchData
      });
    case ASSIGNED_VIDEO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAssignedSuccess: action.isAssignedSuccess
      });
    case STATE_CHANGED:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        searchData: action.searchData,
        isAssignedSuccess: action.isAssignedSuccess
      });
    default:
      return state;
  }
}
