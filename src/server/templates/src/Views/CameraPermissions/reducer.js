import api from "../../Api/ApiClients/permission";
import { addErrorMessage } from "../../Store/errorMessageReducer";
import CameraPermission from "../../Model/cameraPermission";

const PERMISSION_FETCHING = "PERMISSION_FETCHING";
const LIST_PERMISSION_BY_GROUP_SUCCESS = "LIST_PERMISSION_BY_GROUP_SUCCESS";
const SAVE_PERMISSION_SUCCESS = "SAVE_PERMISSION_SUCCESS";
const DELETE_PERMISSION_SUCCESS = "DELETE_PERMISSION_SUCCESS";

export function listPermissionByGroup(groupId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.listPermissionByGroup(groupId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(
          setListPermissionByGroupSuccess(
            cameraPermissionListMapping(apiResults.data)
          )
        );
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function savePermission(groupId, cameraId, permission) {
  return dispatch => {
    dispatch(setFetching(true));
    api.savePermission(groupId, cameraId, permission, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setSavePermissionSuccess(apiResults.data));
        dispatch(listPermissionByGroup(groupId));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function deletePermission(permissionId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.deletePermission(permissionId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setDeletePermissionSuccess(permissionId));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

function setFetching(isFetching) {
  return {
    type: PERMISSION_FETCHING,
    isFetching: isFetching
  };
}

function setListPermissionByGroupSuccess(data) {
  return {
    type: LIST_PERMISSION_BY_GROUP_SUCCESS,
    data: data
  };
}

function setSavePermissionSuccess(data) {
  return {
    type: SAVE_PERMISSION_SUCCESS,
    data: data
  };
}

function setDeletePermissionSuccess(permissionId) {
  return {
    type: DELETE_PERMISSION_SUCCESS,
    permissionIdDeleted: permissionId
  };
}

// initialize state
const initState = {
  isFetching: false
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case PERMISSION_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });
    case LIST_PERMISSION_BY_GROUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        cameraPermissionsByGroup: action.data
      });

    case SAVE_PERMISSION_SUCCESS:
      let cameraPermissionSaved = action.data;
      return Object.assign({}, state, {
        isFetching: false,
        cameraPermissionsByGroup: [
          ...state.cameraPermissionsByGroup.map(cameraPermission => {
            if (cameraPermission.id === cameraPermissionSaved.id) {
              return Object.assign(
                {},                
                CameraPermission(cameraPermissionSaved)
              );
            } else {
              return cameraPermission;
            }
          })
        ]
      });
    case DELETE_PERMISSION_SUCCESS:
      let cameraPermissionIdDeleted = action.permissionIdDeleted;
      return Object.assign({}, state, {
        isFetching: false,
        cameraPermissionsByGroup: [
          ...state.cameraPermissionsByGroup.filter(
            cameraPermission =>
              cameraPermission.id !== cameraPermissionIdDeleted
          )
        ]
      });
    default:
      return state;
  }
}

// Function helper
export function cameraPermissionListMapping(cameraPermissions) {
  const cameraPermissionUIs = [];
  cameraPermissions.forEach(cameraPermission => {
    let cameraPermissionUI = CameraPermission(cameraPermission);
    cameraPermissionUIs.push(cameraPermissionUI);
  });

  return cameraPermissionUIs;
}
