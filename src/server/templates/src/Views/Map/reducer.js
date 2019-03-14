import api from "../../Api/ApiClients/map";
import {
  addErrorMessage,
  addInfoMessage
} from "../../Store/errorMessageReducer";
import {
  addNodeUnderParent,
  changeNodeAtPath,
  removeNodeAtPath
} from "react-sortable-tree";
import * as Snap from "snapsvg-cjs";

import { BASE_IMAGE_MAP_URL } from "../Utils/constant";
import CameraOnMap from "../../Model/cameraOnMap";

const MAP_FETCHING = "MAP_FETCHING";
const LIST_MAP_TREE_SUCCESS = "LIST_MAP_TREE_SUCCESS";
const SAVE_MAP_SUCCESS = "SAVE_MAP_SUCCESS";
const UPDATE_MAP_SUCCESS = "UPDATE_MAP_SUCCESS";
const DELETE_MAP_SUCCESS = "DELETE_MAP_SUCCESS";

const GET_CAMERA_ON_MAP_SUCCESS = "GET_CAMERA_ON_MAP_SUCCESS";
const GET_REMAIN_CAMERA_ON_MAP_SUCCESS = "GET_REMAIN_CAMERA_ON_MAP_SUCCESS";
const SET_CAMERA_ON_MAP_SUCCESS = "SET_CAMERA_ON_MAP_SUCCESS";
const UPDATE_CAMERA_ON_MAP_SUCCESS = "UPDATE_CAMERA_ON_MAP_SUCCESS";
const REMOVE_CAMERA_ON_MAP_SUCCESS = "REMOVE_CAMERA_ON_MAP_SUCCESS";
const SET_CAMERA_ON_MAP_UPDATE_SUCCESS = "SET_CAMERA_ON_MAP_UPDATE_SUCCESS";

export function getMapTree() {
  return dispatch => {
    dispatch(setFetching(true));
    api.getMapTree(apiResults => {
      if (apiResults.isSuccess) {
        let treeData;
        if (apiResults.data.length === 0) {
          treeData = [
            {
              id: 0,
              title: "Add map",
              className: "root-icon",
              expanded: true,
              children: apiResults.data
            }
          ];
        } else {
          treeData = apiResults.data;
        }

        dispatch(setListMapTreeSuccess(treeData));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function onChangeMapTree(treeData) {
  return dispatch => {
    dispatch(setListMapTreeSuccess(treeData));
  };
}

export function saveMap(map, file, path, treeData) {
  let newTreeIndexOfNewNode = 0;
  if (map.parentId !== "") {
    newTreeIndexOfNewNode = getTreeIndexOfNewNode(treeData, map, path);
  }
  map.order = "" + newTreeIndexOfNewNode;

  return dispatch => {
    dispatch(setFetching(true));
    api.saveMap(map, file, apiResults => {
      if (apiResults.isSuccess) {
        let mapResult = apiResults.data;
        let newtreeData = addNewMapToTreeData(treeData, mapResult, path);
        dispatch(setSaveMapSuccess(newtreeData));

        // Extract polygon from image
        Snap.load(BASE_IMAGE_MAP_URL + mapResult.image_url, data => {
          let linkedObjects = data.selectAll("polygon");
          if (linkedObjects.length > 0) {
            let linkedObjectIds = [];
            linkedObjects.forEach(linkedObject => {
              linkedObjectIds.push(linkedObject.attr("id"));
            });

            dispatch(
              saveMapLinkedObjects(
                linkedObjectIds,
                mapResult.id,
                newTreeIndexOfNewNode
              )
            );
          }
        });
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function updateMap(map, file, nodeUpdated, path) {
  return dispatch => {
    dispatch(setFetching(true));
    api.saveMap(map, file, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setUpdateMapSuccess(apiResults.data, nodeUpdated, path));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function removeMap(mapId, path) {
  return dispatch => {
    dispatch(setFetching(true));
    api.removeMap(mapId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setRemoveMapSuccess(mapId, path));
        dispatch(getRemainCameraOnMaps());
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function getCameraOnMaps(mapId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.getCameraOnMap(mapId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setGetCameraOnMapSuccess(cameraOnMapMapping(apiResults.data)));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function getRemainCameraOnMaps() {
  return dispatch => {
    dispatch(setFetching(true));
    api.getRemainCameraOnMap(apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setGetRemainCameraOnMapsSuccess(apiResults.data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function setCameraOnMaps(cameraOnMap, mapId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.setCameraOnMap(cameraOnMap, mapId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setCameraOnMapSuccess(apiResults.data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function updateCamerasOnMap(camerasOnMap, mapId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.updateCamerasOnMap(camerasOnMap, mapId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(addInfoMessage("Cameras has just updated."));
        dispatch(setUpdateCameraOnMapSuccess(camerasOnMap));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function removeCameraOnMap(cameraOnMap, mapId) {
  return dispatch => {
    dispatch(setFetching(true));
    api.removeCameraOnMap(cameraOnMap.camera.id, mapId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setRemoveCameraOnMapSuccess(cameraOnMap));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function setCameraOnMapsUpdate(cameraOnMapsUpdate) {
  return dispatch => {
    dispatch(setGetCameraOnMapsUpdatedSuccess(cameraOnMapsUpdate));
  };
}

function saveMapLinkedObjects(linkedObjectIds, parentId, treeIndexOfParent) {
  return dispatch => {
    dispatch(setFetching(true));
    if (linkedObjectIds.length > 0) {
      linkedObjectIds.forEach((linkedObjectId, index) => {
        let map = {
          id: "",
          name: linkedObjectId,
          parentId: parentId,
          linkedObjectId: linkedObjectId,
          imageWidth: null,
          imageHeight: null,
          isImageChanged: true,
          order: "" + (treeIndexOfParent + (index + 1))
        };

        api.saveMap(map, null, apiResults => {
          if (apiResults.isSuccess) {
            // Cause collapse tree
            dispatch(getMapTree());
          } else {
            dispatch(setFetching(false));
            dispatch(addErrorMessage(apiResults.errorMessage));
          }
        });
      });
    }
  };
}

function setFetching(isFetching) {
  return {
    type: MAP_FETCHING,
    isFetching: isFetching
  };
}

function setListMapTreeSuccess(treeData) {
  return {
    type: LIST_MAP_TREE_SUCCESS,
    treeData: treeData
  };
}

function setSaveMapSuccess(newTreeData) {
  return {
    type: SAVE_MAP_SUCCESS,
    newTreeData: newTreeData
  };
}

function setUpdateMapSuccess(mapUpdated, nodeUpdated, pathUpdated) {
  return {
    type: UPDATE_MAP_SUCCESS,
    mapUpdated: mapUpdated,
    nodeUpdated: nodeUpdated,
    pathUpdated: pathUpdated
  };
}

function setRemoveMapSuccess(mapId, pathDeleted) {
  return {
    type: DELETE_MAP_SUCCESS,
    mapId: mapId,
    pathDeleted: pathDeleted
  };
}

function setGetCameraOnMapSuccess(cameraOnMaps) {
  return {
    type: GET_CAMERA_ON_MAP_SUCCESS,
    cameraOnMaps: cameraOnMaps
  };
}

function setCameraOnMapSuccess(cameraOnMap) {
  return {
    type: SET_CAMERA_ON_MAP_SUCCESS,
    cameraOnMap: cameraOnMap
  };
}

function setUpdateCameraOnMapSuccess(camerasOnMapUpdated) {
  return {
    type: UPDATE_CAMERA_ON_MAP_SUCCESS,
    camerasOnMapUpdated: camerasOnMapUpdated
  };
}

function setRemoveCameraOnMapSuccess(cameraOnMapDeleted) {
  return {
    type: REMOVE_CAMERA_ON_MAP_SUCCESS,
    cameraOnMapDeleted: cameraOnMapDeleted
  };
}

function setGetRemainCameraOnMapsSuccess(remainCameraOnMaps) {
  return {
    type: GET_REMAIN_CAMERA_ON_MAP_SUCCESS,
    remainCameraOnMaps: remainCameraOnMaps
  };
}

function setGetCameraOnMapsUpdatedSuccess(cameraOnMapsUpdate) {
  return {
    type: SET_CAMERA_ON_MAP_UPDATE_SUCCESS,
    cameraOnMapsUpdate: cameraOnMapsUpdate
  };
}

// initialize state
const initState = {
  isFetching: false,
  treeData: [],
  cameraOnMaps: [],
  cameraOnMapsUpdate: null,
  remainCameraOnMaps: []
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case MAP_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });
    case LIST_MAP_TREE_SUCCESS:
      let treeData = action.treeData;

      return Object.assign({}, state, {
        isFetching: false,
        treeData: treeData
      });
    case SAVE_MAP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        treeData: action.newTreeData
      });
    case UPDATE_MAP_SUCCESS:
      let { mapUpdated, pathUpdated, nodeUpdated } = action;
      let treeDataUpdated = updateMapOfTreeData(
        state.treeData,
        mapUpdated,
        nodeUpdated,
        pathUpdated
      );

      return Object.assign({}, state, {
        isFetching: false,
        treeData: treeDataUpdated
      });
    case DELETE_MAP_SUCCESS:
      let { mapId, pathDeleted } = action;
      let treeDataAfterDeleted = deleteMapOfTreeData(
        state.treeData,
        mapId,
        pathDeleted
      );

      return Object.assign({}, state, {
        isFetching: false,
        treeData: treeDataAfterDeleted
      });

    case GET_REMAIN_CAMERA_ON_MAP_SUCCESS:
      let remainCameraOnMaps = action.remainCameraOnMaps;

      return Object.assign({}, state, {
        isFetching: false,
        remainCameraOnMaps: remainCameraOnMaps
      });

    case GET_CAMERA_ON_MAP_SUCCESS:
      let cameraOnMaps = action.cameraOnMaps;

      return Object.assign({}, state, {
        isFetching: false,
        cameraOnMaps: cameraOnMaps
      });
    case SET_CAMERA_ON_MAP_SUCCESS:
      let cameraOnMapAdded = CameraOnMap(action.cameraOnMap);
      if (state.cameraOnMapsUpdate) {
        return Object.assign({}, state, {
          isFetching: false,
          remainCameraOnMaps: [
            ...state.remainCameraOnMaps.filter(
              cameraOnMap => cameraOnMap.camera.id !== cameraOnMapAdded.id
            )
          ],
          cameraOnMapsUpdate: [
            ...state.cameraOnMapsUpdate.concat(cameraOnMapAdded)
          ]
        });
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          remainCameraOnMaps: [
            ...state.remainCameraOnMaps.filter(
              cameraOnMap => cameraOnMapAdded.camera.id !== cameraOnMap.id
            )
          ],
          cameraOnMaps: [...state.cameraOnMaps.concat(cameraOnMapAdded)]
        });
      }

    case UPDATE_CAMERA_ON_MAP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        cameraOnMaps: state.cameraOnMapsUpdate,
        cameraOnMapsUpdate: null
      });

    case REMOVE_CAMERA_ON_MAP_SUCCESS:
      let cameraOnMapDeleted = action.cameraOnMapDeleted;

      if (state.cameraOnMapsUpdate) {
        return Object.assign({}, state, {
          isFetching: false,
          remainCameraOnMaps: [
            ...state.remainCameraOnMaps.concat(cameraOnMapDeleted.camera)
          ],
          cameraOnMapsUpdate: [
            ...state.cameraOnMapsUpdate.filter(
              cameraOnMap => cameraOnMapDeleted.id !== cameraOnMap.id
            )
          ]
        });
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          remainCameraOnMaps: [
            ...state.remainCameraOnMaps.concat(cameraOnMapDeleted.camera)
          ],
          cameraOnMaps: [
            ...state.cameraOnMaps.filter(
              cameraOnMap => cameraOnMapDeleted.id !== cameraOnMap.id
            )
          ]
        });
      }
    case SET_CAMERA_ON_MAP_UPDATE_SUCCESS:
      let cameraOnMapsUpdate = action.cameraOnMapsUpdate;

      return Object.assign({}, state, {
        cameraOnMapsUpdate: cameraOnMapsUpdate
      });
    default:
      return state;
  }
}

// Function helper
function addNewMapToTreeData(treeData, newMap, path) {
  let newNodeUnderParent = addNewNodeToTreeData(treeData, newMap, path);
  let newtreeData = newNodeUnderParent.treeData;

  return newtreeData;
}

function getTreeIndexOfNewNode(treeData, newMap, path) {
  let newNodeUnderParent = addNewNodeToTreeData(treeData, newMap, path);

  return newNodeUnderParent.treeIndex;
}

function addNewNodeToTreeData(treeData, newMap, path) {
  const getNodeKey = ({ treeIndex }) => treeIndex;
  let newNodeUnderParent = addNodeUnderParent({
    treeData: treeData,
    parentKey: path[path.length - 1],
    expandParent: true,
    getNodeKey,
    newNode: newMap
  });

  return newNodeUnderParent;
}

function updateMapOfTreeData(treeData, mapUpdated, node, path) {
  const getNodeKey = ({ treeIndex }) => treeIndex;
  let title = mapUpdated.name;

  let treeDataUpdated = changeNodeAtPath({
    treeData: treeData,
    path,
    getNodeKey,
    newNode: { ...node, title }
  });

  return treeDataUpdated;
}

function deleteMapOfTreeData(treeData, mapId, path) {
  const getNodeKey = ({ treeIndex }) => treeIndex;
  let treeDataUpdated = removeNodeAtPath({
    treeData: treeData,
    path,
    getNodeKey
  });

  return treeDataUpdated;
}

function cameraOnMapMapping(cameraOnMaps) {
  const cameraOnMapUIs = [];
  cameraOnMaps.forEach(cameraOnMap => {
    let cameraOnMapUI = CameraOnMap(cameraOnMap);
    cameraOnMapUIs.push(cameraOnMapUI);
  });

  return cameraOnMapUIs;
}
