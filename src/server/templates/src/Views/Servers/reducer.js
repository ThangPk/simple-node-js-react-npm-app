import api from "../../Api/ApiClients/system";
import { addErrorMessage } from "../../Store/errorMessageReducer";

const SERVER_FETCHING = "SERVER_FETCHING";
const LIST_SERVER_SUCCESS = "LIST_SERVER_SUCCESS";
const START_SERVER_SUCCESS = "START_SERVER_SUCCESS";
const STOP_SERVER_SUCCESS = "STOP_SERVER_SUCCESS";
const REMOVE_SERVER_SUCCESS = "REMOVE_SERVER_SUCCESS";
//human tracking
const LIST_HUMAN_SERVER_SUCCESS = "LIST_HUMAN_SERVER_SUCCESS";
const START_HUMAN_SERVER_SUCCESS = "START_HUMAN_SERVER_SUCCESS";
const STOP_HUMAN_SERVER_SUCCESS = "STOP_HUMAN_SERVER_SUCCESS";
const REMOVE_HUMAN_SERVER_SUCCESS = "REMOVE_HUMAN_SERVER_SUCCESS";

//face recognition
const LIST_FACE_SERVER_SUCCESS = "LIST_FACE_SERVER_SUCCESS";
const START_FACE_SERVER_SUCCESS = "START_FACE_SERVER_SUCCESS";
const STOP_FACE_SERVER_SUCCESS = "STOP_FACE_SERVER_SUCCESS";
const REMOVE_FACE_SERVER_SUCCESS = "REMOVE_FACE_SERVER_SUCCESS";

//license plate recognition
const LIST_LICENSE_PLATE_SERVER_SUCCESS = "LIST_LICENSE_PLATE_SERVER_SUCCESS";
const START_LICENSE_PLATE_SERVER_SUCCESS = "START_LICENSE_PLATE_SERVER_SUCCESS";
const STOP_LICENSE_PLATE_SERVER_SUCCESS = "STOP_LICENSE_PLATE_SERVER_SUCCESS";
const REMOVE_LICENSE_PLATE_SERVER_SUCCESS = "REMOVE_LICENSE_PLATE_SERVER_SUCCESS";

// Servers
export function getServers() {
  return dispatch => {
    dispatch(setFetching(true));
    api.getServers(apiResults => {
      if (apiResults.isSuccess) {
        let servers = serverListMapping(apiResults.data);
        dispatch(setListServerSuccess(servers));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function startServer(serverId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.startServer(serverId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setStartServerSuccess(apiResults.data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function stopServer(serverId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.stopServer(serverId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setStopServerSuccess(apiResults.data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function removeServer(serverId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.removeServer(serverId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setRemoveServerSuccess(serverId));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

// Human servers
export function getHumanServers() {
  return dispatch => {
    dispatch(setFetching(true));
    api.getHumanServers(apiResults => {
      if (apiResults.isSuccess) {
        let servers = serverListMapping(apiResults.data);
        dispatch(setListHumanServerSuccess(servers));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function startHumanServer(serverId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.startHumanServer(serverId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setStartHumanServerSuccess(apiResults.data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function stopHumanServer(serverId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.stopHumanServer(serverId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setStopHumanServerSuccess(apiResults.data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function removeHumanServer(serverId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.removeHumanServer(serverId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setRemoveHumanServerSuccess(serverId));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

// face recognition

// Human servers
export function getFaceRecognitionServers() {
  return dispatch => {
    dispatch(setFetching(true));
    api.getFaceRecognitionServers(apiResults => {
      if (apiResults.isSuccess) {
        let servers = serverListMapping(apiResults.data);
        dispatch(setListFaceRecognitionServerSuccess(servers));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function startFaceRecognitionServer(serverId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.startFaceRecognitionServer(serverId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setStartFaceRecognitionServerSuccess(apiResults.data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function stopFaceRecognitionServer(serverId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.stopFaceRecognitionServer(serverId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setStopFaceRecognitionServerSuccess(apiResults.data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function removeFaceRecognitionServer(serverId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.removeFaceRecognitionServer(serverId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setRemoveFaceRecognitionServerSuccess(serverId));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

// license plate recognition
// Human servers
export function getLicensePlateRecognitionServers() {
  return dispatch => {
    dispatch(setFetching(true));
    api.getLicensePlateRecognitionServers(apiResults => {
      if (apiResults.isSuccess) {
        let servers = serverListMapping(apiResults.data);
        dispatch(setListLicensePlateRecognitionServerSuccess(servers));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function startLicensePlateRecognitionServer(serverId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.startLicensePlateRecognitionServer(serverId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setStartLicensePlateRecognitionServerSuccess(apiResults.data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function stopLicensePlateRecognitionServer(serverId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.stopLicensePlateRecognitionServer(serverId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setStopLicensePlateRecognitionServerSuccess(apiResults.data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function removeLicensePlateRecognitionServer(serverId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.removeLicensePlateRecognitionServer(serverId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setRemoveLicensePlateRecognitionServerSuccess(serverId));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

function setFetching(isFetching) {
  return {
    type: SERVER_FETCHING,
    isFetching: isFetching
  };
}

function setListServerSuccess(data) {
  return {
    type: LIST_SERVER_SUCCESS,
    data: data
  };
}

function setStartServerSuccess(server) {
  return {
    type: START_SERVER_SUCCESS,
    server: server
  };
}

function setStopServerSuccess(server) {
  return {
    type: STOP_SERVER_SUCCESS,
    server: server
  };
}

function setRemoveServerSuccess(serverId) {
  return {
    type: REMOVE_SERVER_SUCCESS,
    serverId: serverId
  };
}

function setListHumanServerSuccess(data) {
  return {
    type: LIST_HUMAN_SERVER_SUCCESS,
    data: data
  };
}

function setStartHumanServerSuccess(server) {
  return {
    type: START_HUMAN_SERVER_SUCCESS,
    server: server
  };
}

function setStopHumanServerSuccess(server) {
  return {
    type: STOP_HUMAN_SERVER_SUCCESS,
    server: server
  };
}

function setRemoveHumanServerSuccess(serverId) {
  return {
    type: REMOVE_HUMAN_SERVER_SUCCESS,
    serverId: serverId
  };
}

function setListFaceRecognitionServerSuccess(data) {
  return {
    type: LIST_FACE_SERVER_SUCCESS,
    data: data
  };
}

function setStartFaceRecognitionServerSuccess(server) {
  return {
    type: START_FACE_SERVER_SUCCESS,
    server: server
  };
}

function setStopFaceRecognitionServerSuccess(server) {
  return {
    type: STOP_FACE_SERVER_SUCCESS,
    server: server
  };
}

function setRemoveFaceRecognitionServerSuccess(serverId) {
  return {
    type: REMOVE_FACE_SERVER_SUCCESS,
    serverId: serverId
  };
}

function setListLicensePlateRecognitionServerSuccess(data) {
  return {
    type: LIST_LICENSE_PLATE_SERVER_SUCCESS,
    data: data
  };
}

function setStartLicensePlateRecognitionServerSuccess(server) {
  return {
    type: START_LICENSE_PLATE_SERVER_SUCCESS,
    server: server
  };
}

function setStopLicensePlateRecognitionServerSuccess(server) {
  return {
    type: STOP_LICENSE_PLATE_SERVER_SUCCESS,
    server: server
  };
}

function setRemoveLicensePlateRecognitionServerSuccess(serverId) {
  return {
    type: REMOVE_LICENSE_PLATE_SERVER_SUCCESS,
    serverId: serverId
  };
}

// initialize state
const initState = {
  isFetching: false,
  servers: [],
  humanServers: [],
  faceRecognitionServers:[],
  licensePlateRecognitionServers:[]
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case SERVER_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });

    case LIST_SERVER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        servers: action.data
      });
    case START_SERVER_SUCCESS:
      let serverStarted = action.server;
      return Object.assign({}, state, {
        isFetching: false,
        servers: [
          ...state.servers.map(server => {
            if (server.id === serverStarted.id) {
              return Object.assign({}, server, serverMapping(serverStarted));
            } else {
              return server;
            }
          })
        ]
      });
    case STOP_SERVER_SUCCESS:
      let serverStopped = action.server;
      return Object.assign({}, state, {
        isFetching: false,
        servers: [
          ...state.servers.map(server => {
            if (server.id === serverStopped.id) {
              return Object.assign({}, server, serverMapping(serverStopped));
            } else {
              return server;
            }
          })
        ]
      });
    case REMOVE_SERVER_SUCCESS:
      let serverIdDeleted = action.serverId;
      return Object.assign({}, state, {
        isFetching: false,
        servers: [
          ...state.servers.filter(server => server.id !== serverIdDeleted)
        ]
      });
    case LIST_HUMAN_SERVER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        humanServers: action.data
      });
    case START_HUMAN_SERVER_SUCCESS:
      let humanServerStarted = action.server;
      return Object.assign({}, state, {
        isFetching: false,
        humanServers: [
          ...state.humanServers.map(server => {
            if (server.id === humanServerStarted.id) {
              return Object.assign({}, server, serverMapping(humanServerStarted));
            } else {
              return server;
            }
          })
        ]
      });
    case STOP_HUMAN_SERVER_SUCCESS:
      let humanServerStopped = action.server;
      return Object.assign({}, state, {
        isFetching: false,
        humanServers: [
          ...state.humanServers.map(server => {
            if (server.id === humanServerStopped.id) {
              return Object.assign({}, server, serverMapping(humanServerStopped));
            } else {
              return server;
            }
          })
        ]
      });
    case REMOVE_HUMAN_SERVER_SUCCESS:
      let humanServerIdDeleted = action.serverId;
      return Object.assign({}, state, {
        isFetching: false,
        humanServers: [
          ...state.humanServers.filter(server => server.id !== humanServerIdDeleted)
        ]
      });
    case LIST_FACE_SERVER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        faceRecognitionServers: action.data
      });
    case START_FACE_SERVER_SUCCESS:
      let faceRecognitionServerStarted = action.server;
      return Object.assign({}, state, {
        isFetching: false,
        faceRecognitionServers: [
          ...state.faceRecognitionServers.map(server => {
            if (server.id === faceRecognitionServerStarted.id) {
              return Object.assign({}, server, serverMapping(faceRecognitionServerStarted));
            } else {
              return server;
            }
          })
        ]
      });
    case STOP_FACE_SERVER_SUCCESS:
      let faceRecognitionServerStopped = action.server;
      return Object.assign({}, state, {
        isFetching: false,
        faceRecognitionServers: [
          ...state.faceRecognitionServers.map(server => {
            if (server.id === faceRecognitionServerStopped.id) {
              return Object.assign({}, server, serverMapping(faceRecognitionServerStopped));
            } else {
              return server;
            }
          })
        ]
      });
    case REMOVE_FACE_SERVER_SUCCESS:
      let faceRecognitionServerIdDeleted = action.serverId;
      return Object.assign({}, state, {
        isFetching: false,
        faceRecognitionServers: [
          ...state.faceRecognitionServers.filter(server => server.id !== faceRecognitionServerIdDeleted)
        ]
      });
    case LIST_LICENSE_PLATE_SERVER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        licensePlateRecognitionServers: action.data
      });
    case START_LICENSE_PLATE_SERVER_SUCCESS:
      let licensePlateRecognitionServerStarted = action.server;
      return Object.assign({}, state, {
        isFetching: false,
        licensePlateRecognitionServers: [
          ...state.licensePlateRecognitionServers.map(server => {
            if (server.id === licensePlateRecognitionServerStarted.id) {
              return Object.assign({}, server, serverMapping(licensePlateRecognitionServerStarted));
            } else {
              return server;
            }
          })
        ]
      });
    case STOP_LICENSE_PLATE_SERVER_SUCCESS:
      let licensePlateRecognitionServerStopped = action.server;
      return Object.assign({}, state, {
        isFetching: false,
        licensePlateRecognitionServers: [
          ...state.licensePlateRecognitionServers.map(server => {
            if (server.id === licensePlateRecognitionServerStopped.id) {
              return Object.assign({}, server, serverMapping(licensePlateRecognitionServerStopped));
            } else {
              return server;
            }
          })
        ]
      });
    case REMOVE_LICENSE_PLATE_SERVER_SUCCESS:
      let licensePlateRecognitionServerServerIdDeleted = action.serverId;
      return Object.assign({}, state, {
        isFetching: false,
        licensePlateRecognitionServers: [
          ...state.licensePlateRecognitionServers.filter(server => server.id !== licensePlateRecognitionServerServerIdDeleted)
        ]
      });
    default:
      return state;
  }
}

function serverListMapping(servers) {
  const serverUIs = [];
  servers.forEach(server => {
    let serverUI = serverMapping(server);
    serverUIs.push(serverUI);
  });

  return serverUIs;
}

function serverMapping(serverJSON) {
  let server = {
    id: serverJSON.id,
    ipAddress: serverJSON.ip_address,
    status: serverJSON.status,
    isMaster: serverJSON.is_master ? "Yes" : "No",
    enabled: serverJSON.enabled,
    serverModule: serverJSON.module_name
  };

  return server;
}
