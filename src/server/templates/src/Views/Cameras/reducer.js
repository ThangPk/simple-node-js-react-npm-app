import api from "../../Api/ApiClients/camera";
import {
  addErrorMessage,
  addInfoMessage
} from "../../Store/errorMessageReducer";
import { PAGE_ONE, PAGE_SIZE_ALL, PAGE_SIZE } from "../Utils/constant";
import Camera from "../../Model/camera";

const CAMERA_FETCHING = "CAMERA_FETCHING";
const CAMERA_IMPORT_FILE_SUCCESS = "CAMERA_IMPORT_FILE_SUCCESS";
const EXPORT_CAMERA_LIST_SUCCESS = "EXPORT_CAMERA_LIST_SUCCESS";
const LIST_CAMERA_SUCCESS = "LIST_CAMERA_SUCCESS";
const LIST_ALL_CAMERA_SUCCESS = "LIST_ALL_CAMERA_SUCCESS";
const ADD_CAMERA_SUCCESS = "ADD_CAMERA_SUCCESS";
const UPDATE_CAMERA_SUCCESS = "UPDATE_CAMERA_SUCCESS";
const ENABLE_CAMERA_SUCCESS = "ENABLE_CAMERA_SUCCESS";
const ENABLE_CAMERA_RECODING_SUCCESS = "ENABLE_CAMERA_RECODING_SUCCESS";
const ENABLE_CAMERA_HUMAN_TRACKING_SUCCESS =
  "ENABLE_CAMERA_HUMAN_TRACKING_SUCCESS";
const ENABLE_CAMERA_FACE_TRACKING_SUCCESS =
  "ENABLE_CAMERA_FACE_TRACKING_SUCCESS";
const ENABLE_CAMERA_LICENSE_PLATE_TRACKING_SUCCESS =
  "ENABLE_CAMERA_LICENSE_PLATE_TRACKING_SUCCESS";
const ADD_OR_UPDATE_CAMERA_FAILED = "ADD_OR_UPDATE_CAMERA_FAILED";
const DELETE_CAMERA_SUCCESS = "DELETE_CAMERA_SUCCESS";
const HUMAN_TRACKING_REGIONS = "HUMAN_TRACKING_REGIONS";
const FACE_RECOGNITION_REGIONS = "FACE_RECOGNITION_REGIONS";
const LICENSE_PLATE_RECOGNITION_REGIONS = "LICENSE_PLATE_RECOGNITION_REGIONS";

export function importCameraListFile(cameraListFile) {
  return dispatch => {
    dispatch(setFetching(true));
    api.importCameraList(cameraListFile, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(getCameras("", "", "", "", "", "", "", PAGE_ONE, PAGE_SIZE));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function exportCameraList() {
  return dispatch => {
    dispatch(setFetching(true));
    api.exportCameraList(apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setExportCameraListSuccess());
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function getCameras(
  keyword,
  enabled,
  connectionsStatus,
  streamingStatus,
  humanDectectionStatus,
  faceStreamingStatus,
  licensePlateStreamingStatus,
  page,
  pageSize
) {
  return dispatch => {
    dispatch(setFetching(true));
    api.searchCameras(
      keyword,
      enabled,
      connectionsStatus,
      streamingStatus,
      humanDectectionStatus,
      faceStreamingStatus,
      licensePlateStreamingStatus,
      page,
      pageSize,
      apiResults => {
        if (apiResults.isSuccess) {
          let cameras = apiResults.data;
          dispatch(
            setListCameraSuccess(
              cameraListMapping(cameras),
              apiResults.totalPages
            )
          );
        } else {
          dispatch(setFetching(false));
          dispatch(addErrorMessage(apiResults.errorMessage));
        }
      }
    );
  };
}

export function getAllCameras(keyword) {
  return dispatch => {
    api.searchCameras(
      keyword,
      "",
      "",
      "",
      "",
      "",
      "",
      PAGE_ONE,
      PAGE_SIZE_ALL,
      apiResults => {
        if (apiResults.isSuccess) {
          let cameras = apiResults.data;
          dispatch(setListAllCameraSuccess(cameraListMapping(cameras)));
        } else {
          dispatch(addErrorMessage(apiResults.errorMessage));
        }
      }
    );
  };
}

export function addCamera(camera) {
  return dispatch => {
    dispatch(setAddOrUpdateCameraFailed());
    dispatch(setFetching(true));    
    api.addCamera(camera, apiResults => {
      if (apiResults.isSuccess) {
        let newCamera = apiResults.data;
        dispatch(setAddCameraSuccess(newCamera));
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function updateCamera(camera) {
  return dispatch => {
    dispatch(setAddOrUpdateCameraFailed());
    dispatch(setFetching(true));    
    api.updateCamera(camera, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setUpdateCameraSuccess(apiResults.data));
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function enableCamera(id, enabled) {
  return dispatch => {
    dispatch(setFetching(true));
    api.enableCamera(id, enabled, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setEnableCameraSuccess(id, enabled));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function enableCameraRecoding(id, enabled) {
  return dispatch => {
    dispatch(setFetching(true));
    api.enableCameraRecoding(id, enabled, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setEnableCameraRecodingSuccess(id, enabled));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function enableHumanTracking(id, enabled) {
  return dispatch => {
    dispatch(setFetching(true));
    api.enableHumanTracking(id, enabled, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setEnableCameraHumanTracking(id, enabled));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function enableCameraFaceTracking(id, enabled) {
  return dispatch => {
    dispatch(setFetching(true));
    api.enableCameraFaceTracking(id, enabled, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setEnableCameraFaceTrackingSuccess(id, enabled));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function enableCameraLicensePlateTracking(id, enabled) {
  return dispatch => {
    dispatch(setFetching(true));
    api.enableCameraLicensePlateTracking(id, enabled, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setEnableCameraLicensePlateTrackingSuccess(id, enabled));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function deleteCamera(cameraIds) {
  return dispatch => {
    dispatch(setFetching);
    api.deleteCameras(cameraIds, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setDeleteCameraSuccess(cameraIds));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function saveHumanTrackingRegions(id, data) {
  return dispatch => {
    dispatch(setAddOrUpdateCameraFailed());
    dispatch(setFetching(true));    
    api.saveHumanTrackingRegions(id, data, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(addInfoMessage("Human tracking regions updated!"));
        dispatch(setHumanTrackingRegions(id, data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function saveFaceRecognitionRegions(id, data) {
  return dispatch => {
    dispatch(setAddOrUpdateCameraFailed());
    dispatch(setFetching(true));    
    api.saveFaceRecognitionRegions(id, data, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(addInfoMessage("Face recognition regions updated!"));
        dispatch(setFaceRecognitionRegions(id, data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function saveLicensePlateRecognitions(id, data) {
  return dispatch => {
    dispatch(setAddOrUpdateCameraFailed());
    dispatch(setFetching(true));    
    api.saveLicensePlateRecognitions(id, data, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(addInfoMessage("License plate recognition regions updated!"));
        dispatch(setLicensePlateRecognitions(id, data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

function setFetching(isFetching) {
  return {
    type: CAMERA_FETCHING,
    isFetching: isFetching
  };
}

function setListCameraSuccess(data, totalPages) {
  return {
    type: LIST_CAMERA_SUCCESS,
    data: data,
    totalPages: totalPages
  };
}

function setExportCameraListSuccess() {
  return {
    type: EXPORT_CAMERA_LIST_SUCCESS
  };
}

function setListAllCameraSuccess(data) {
  return {
    type: LIST_ALL_CAMERA_SUCCESS,
    data: data
  };
}

function setAddCameraSuccess(newCamera) {
  return {
    type: ADD_CAMERA_SUCCESS,
    newCamera: newCamera
  };
}

function setUpdateCameraSuccess(cameraUpdated) {
  return {
    type: UPDATE_CAMERA_SUCCESS,
    cameraUpdated: cameraUpdated
  };
}

function setEnableCameraSuccess(cameraId, enabled) {
  return {
    type: ENABLE_CAMERA_SUCCESS,
    cameraId: cameraId,
    enabled: enabled
  };
}

function setEnableCameraRecodingSuccess(cameraId, enabled) {
  return {
    type: ENABLE_CAMERA_RECODING_SUCCESS,
    cameraId: cameraId,
    enabled: enabled
  };
}

function setEnableCameraHumanTracking(cameraId, enabled) {
  return {
    type: ENABLE_CAMERA_HUMAN_TRACKING_SUCCESS,
    cameraId: cameraId,
    enabled: enabled
  };
}

function setEnableCameraFaceTrackingSuccess(cameraId, enabled) {
  return {
    type: ENABLE_CAMERA_FACE_TRACKING_SUCCESS,
    cameraId: cameraId,
    enabled: enabled
  };
}

function setEnableCameraLicensePlateTrackingSuccess(cameraId, enabled) {
  return {
    type: ENABLE_CAMERA_LICENSE_PLATE_TRACKING_SUCCESS,
    cameraId: cameraId,
    enabled: enabled
  };
}

function setAddOrUpdateCameraFailed() {
  return {
    type: ADD_OR_UPDATE_CAMERA_FAILED
  };
}

function setDeleteCameraSuccess(cameraIds) {
  return {
    type: DELETE_CAMERA_SUCCESS,
    cameraIds: cameraIds
  };
}

function setHumanTrackingRegions(id, data) {
  return {
    type: HUMAN_TRACKING_REGIONS,
    id: id,
    data: data
  };
}

function setFaceRecognitionRegions(id, data) {
  return {
    type: FACE_RECOGNITION_REGIONS,
    id: id,
    data: data
  };
}

function setLicensePlateRecognitions(id, data) {
  return {
    type: LICENSE_PLATE_RECOGNITION_REGIONS,
    id: id,
    data: data
  };
}
// initialize state
const initState = {
  isFetching: false,
  isExportCameraSuccess: false,
  data: [],
  allCameras: [],
  isSavedHumanTracking: false,
  isSavedFaceRecognition: false,
  isSavedLicensePlateRecognition: false,
  drawingType: ""
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case CAMERA_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        isExportCameraSuccess: false
      });
    case CAMERA_IMPORT_FILE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data
      });
    case EXPORT_CAMERA_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isExportCameraSuccess: true
      });
    case LIST_CAMERA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        totalPages: action.totalPages
      });
    case LIST_ALL_CAMERA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        allCameras: action.data
      });
    case ADD_CAMERA_SUCCESS:
      let newCamera = action.newCamera;
      return Object.assign({}, state, {
        isFetching: false,
        data: [...state.data.concat(Camera(newCamera))],
        addOrUpdateFailed: false
      });
    case UPDATE_CAMERA_SUCCESS:
      let cameraUpdated = action.cameraUpdated;
      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data.map(camera => {
            if (camera.id === cameraUpdated.id) {
              return Object.assign({}, Camera(cameraUpdated));
            } else {
              return camera;
            }
          })
        ],
        addOrUpdateFailed: false
      });
    case ENABLE_CAMERA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data.map(camera => {
            if (camera.id === action.cameraId) {
              return Object.assign({}, camera, {
                enabled: action.enabled,
                isEnabled: action.enabled ? "Yes" : "No"
              });
            } else {
              return camera;
            }
          })
        ]
      });
    case ENABLE_CAMERA_RECODING_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data.map(camera => {
            if (camera.id === action.cameraId) {
              return Object.assign({}, camera, {
                recordingEnabled: action.enabled
              });
            } else {
              return camera;
            }
          })
        ]
      });
    case ENABLE_CAMERA_HUMAN_TRACKING_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data.map(camera => {
            if (camera.id === action.cameraId) {
              return Object.assign({}, camera, {
                humanTrackingEnabled: action.enabled
              });
            } else {
              return camera;
            }
          })
        ]
      });
    case ENABLE_CAMERA_FACE_TRACKING_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data.map(camera => {
            if (camera.id === action.cameraId) {
              return Object.assign({}, camera, {
                faceEnabled: action.enabled
              });
            } else {
              return camera;
            }
          })
        ]
      });
    case ENABLE_CAMERA_LICENSE_PLATE_TRACKING_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data.map(camera => {
            if (camera.id === action.cameraId) {
              return Object.assign({}, camera, {
                licensePlateEnabled: action.enabled
              });
            } else {
              return camera;
            }
          })
        ]
      });
    case ADD_OR_UPDATE_CAMERA_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        addOrUpdateFailed: true
      });
    case DELETE_CAMERA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data.filter(camera => !action.cameraIds.includes(camera.id))
        ]
      });

    case HUMAN_TRACKING_REGIONS:
      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data.map(camera => {
            if (camera.id === action.id) {
              return Object.assign({}, camera, {
                humanTrackingRegions: action.data
              });
            } else {
              return camera;
            }
          })
        ],
        addOrUpdateFailed: true,
        isSavedHumanTracking: true,
        drawingType: "human"
      });

    case FACE_RECOGNITION_REGIONS:
      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data.map(camera => {
            if (camera.id === action.id) {
              return Object.assign({}, camera, {
                faceRecognitionRegions: action.data
              });
            } else {
              return camera;
            }
          })
        ],
        addOrUpdateFailed: true,
        isSavedFaceRecognition: true,
        drawingType: "face"
      });

    case LICENSE_PLATE_RECOGNITION_REGIONS:
      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data.map(camera => {
            if (camera.id === action.id) {
              return Object.assign({}, camera, {
                licensePlateRecognitionRegions: action.data
              });
            } else {
              return camera;
            }
          })
        ],
        addOrUpdateFailed: true,
        isSavedLicensePlateRecognition: true,
        drawingType: "licensePlate"
      });
    default:
      return state;
  }
}

// Function helper
function cameraListMapping(cameras) {
  const cameraUIs = [];
  cameras.forEach(camera => {
    let cameraUI = Camera(camera);
    cameraUIs.push(cameraUI);
  });

  return cameraUIs;
}
