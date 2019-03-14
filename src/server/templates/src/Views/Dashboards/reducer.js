import api from "../../Api/ApiClients/system";
import { addErrorMessage } from "../../Store/errorMessageReducer";

const GET_CAMERA_STATUS_SUCCESS = "GET_CAMERA_STATUS_SUCCESS";
const GET_HUMAN_CAMERA_STATUS_SUCCESS = "GET_HUMAN_CAMERA_STATUS_SUCCESS";
const GET_FACE_RECOGNITION_CAMERA_STATUS_SUCCESS =
  "GET_FACE_RECOGNITION_CAMERA_STATUS_SUCCESS";
const GET_LICENSE_PLATE_RECOGNITION_CAMERA_STATUS_SUCCESS =
  "GET_LICENSE_PLATE_RECOGNITION_CAMERA_STATUS_SUCCESS";
const GET_SERVER_STATUS_SUCCESS = "GET_SERVER_STATUS_SUCCESS";
const GET_HUMAN_SERVER_STATUS_SUCCESS = "GET_HUMAN_SERVER_STATUS_SUCCESS";
const GET_FACE_RECOGNITION_SERVER_STATUS_SUCCESS =
  "GET_FACE_RECOGNITION_SERVER_STATUS_SUCCESS";
const GET_LICENSE_PLATE_RECOGNITION_SERVER_STATUS_SUCCESS =
  "GET_LICENSE_PLATE_RECOGNITION_SERVER_STATUS_SUCCESS";

export function getCameraStatus() {
  return dispatch => {
    api.getCameraStatus(apiResults => {
      if (apiResults.isSuccess) {
        dispatch(
          setCameraStatusSuccess(apiResults.data, GET_CAMERA_STATUS_SUCCESS)
        );
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function getHumanCameraStatus() {
  return dispatch => {
    api.getHumanCameraStatus(apiResults => {
      if (apiResults.isSuccess) {
        dispatch(
          setCameraStatusSuccess(
            apiResults.data,
            GET_HUMAN_CAMERA_STATUS_SUCCESS
          )
        );
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function getFaceRecognitionCameraStatus() {
  return dispatch => {
    api.getFaceRecognitionCameraStatus(apiResults => {
      if (apiResults.isSuccess) {
        dispatch(
          setCameraStatusSuccess(
            apiResults.data,
            GET_FACE_RECOGNITION_CAMERA_STATUS_SUCCESS
          )
        );
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function getLicensePlateRecognitionCameraStatus() {
  return dispatch => {
    api.getLicensePlateRecognitionCameraStatus(apiResults => {
      if (apiResults.isSuccess) {
        dispatch(
          setCameraStatusSuccess(
            apiResults.data,
            GET_LICENSE_PLATE_RECOGNITION_CAMERA_STATUS_SUCCESS
          )
        );
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function getServerStatus() {
  return dispatch => {
    api.getServerStatus(apiResults => {
      if (apiResults.isSuccess) {
        dispatch(
          setServerStatusSuccess(apiResults.data, GET_SERVER_STATUS_SUCCESS)
        );
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function getHumanServerStatus() {
  return dispatch => {
    api.getHumanServerStatus(apiResults => {
      if (apiResults.isSuccess) {
        dispatch(
          setServerStatusSuccess(
            apiResults.data,
            GET_HUMAN_SERVER_STATUS_SUCCESS
          )
        );
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function getFaceRecognitionServerStatus() {
  return dispatch => {
    api.getFaceRecognitionServerStatus(apiResults => {
      if (apiResults.isSuccess) {
        dispatch(
          setServerStatusSuccess(
            apiResults.data,
            GET_FACE_RECOGNITION_SERVER_STATUS_SUCCESS
          )
        );
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function getLicensePlateRecognitionServerStatus() {
  return dispatch => {
    api.getLicensePlateRecognitionServerStatus(apiResults => {
      if (apiResults.isSuccess) {
        dispatch(
          setServerStatusSuccess(
            apiResults.data,
            GET_LICENSE_PLATE_RECOGNITION_SERVER_STATUS_SUCCESS
          )
        );
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

function setCameraStatusSuccess(cameraStatus, typeStatus) {
  return {
    type: typeStatus,
    cameraStatus: cameraStatus
  };
}

function setServerStatusSuccess(serverStatus, serverType) {
  return {
    type: serverType,
    serverStatus: serverStatus
  };
}

// initialize state
const initState = {
  cameraStatus: { labels: [], datasets: [] },
  HumanCameraStatus: { labels: [], datasets: [] },
  FaceRecognitionCameraStatus: { labels: [], datasets: [] },
  LicensePlateRecognitionCameraStatus: { labels: [], datasets: [] },
  serverStatus: { labels: [], datasets: [] },
  HumanServerStatus: { labels: [], datasets: [] },
  FaceRecognitionServerStatus: { labels: [], datasets: [] },
  LicensePlateRecognitionServerStatus: { labels: [], datasets: [] }
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case GET_CAMERA_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        cameraStatus: chartDataMapping(action.cameraStatus)
      });
    case GET_HUMAN_CAMERA_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        HumanCameraStatus: chartDataMapping(action.cameraStatus)
      });
    case GET_FACE_RECOGNITION_CAMERA_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        FaceRecognitionCameraStatus: chartDataMapping(action.cameraStatus)
      });
    case GET_LICENSE_PLATE_RECOGNITION_CAMERA_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        LicensePlateRecognitionCameraStatus: chartDataMapping(
          action.cameraStatus
        )
      });
    case GET_SERVER_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        serverStatus: chartDataMapping(action.serverStatus)
      });
    case GET_HUMAN_SERVER_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        HumanServerStatus: chartDataMapping(action.serverStatus)
      });
    case GET_FACE_RECOGNITION_SERVER_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        FaceRecognitionServerStatus: chartDataMapping(action.serverStatus)
      });
    case GET_LICENSE_PLATE_RECOGNITION_SERVER_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        LicensePlateRecognitionServerStatus: chartDataMapping(
          action.serverStatus
        )
      });
    default:
      return state;
  }
}

// Function helper
function chartDataMapping(statusDatum) {
  let chartDataMapping = {
    labels: [],
    datasets: [],
    hasData: true
  };
  if (statusDatum.length === 0) chartDataMapping.hasData = false;

  let dataSet = { data: [], backgroundColor: [], hoverBackgroundColor: [] };
  statusDatum.forEach(statusData => {
    chartDataMapping.labels.push(statusData.status);

    dataSet.data.push(statusData.count);
    let color;
    if (statusData.status === "stop") {
      color = statusColor.stop;
    } else if (statusData.status === "error") {
      color = statusColor.error;
    } else if (statusData.status === "disabled") {
      color = statusColor.disabled;
    } else if (
      statusData.status === "live" ||
      statusData.status === "running"
    ) {
      color = statusColor.live;
    }

    dataSet.backgroundColor.push(color);
    dataSet.hoverBackgroundColor.push(color);
  });

  chartDataMapping.datasets.push(dataSet);

  return chartDataMapping;
}

const statusColor = {
  stop: "#FF6384",
  error: "#cc0000",
  live: "#20a8d8",
  disabled: "#EBEBE4"
};
