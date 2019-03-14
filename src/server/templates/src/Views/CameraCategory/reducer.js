import api from "../../Api/ApiClients/category";
import { addErrorMessage } from "../../Store/errorMessageReducer";
import {
  addNodeUnderParent,
  changeNodeAtPath,
  removeNodeAtPath
} from "react-sortable-tree";
import Camera from "../../Model/camera";

const CATEGORY_FETCHING = "CATEGORY_FETCHING";
const LIST_CATEGORY_TREE_SUCCESS = "LIST_CATEGORY_TREE_SUCCESS";
const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS";
const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
const LIST_CAMERA_BY_CATEGORY_SUCCESS = "LIST_CAMERA_BY_CATEGORY_SUCCESS";

export function getCategoryTree() {
  return dispatch => {
    dispatch(setFetching(true));
    api.listCategory(apiResults => {
      if (apiResults.isSuccess) {
        let treeData = [
          {
            id: 0,
            title: "Add category",
            className: "root-icon",
            expanded: true,
            children: apiResults.data
          }
        ];
        dispatch(setListCategorySuccess(treeData));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function onChangeCategoryTree(treeData) {
  return dispatch => {
    dispatch(setListCategorySuccess(treeData));
  };
}

export function addCategory(category, path) {
  return dispatch => {
    dispatch(setFetching(true));
    api.addCategory(category, apiResults => {
      if (apiResults.isSuccess) {
        let newCategory = apiResults.data;
        dispatch(setAddCategorySuccess(newCategory, path));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function updateCategory(category, node, path) {
  return dispatch => {
    dispatch(setFetching(true));
    api.updateCategory(category, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setUpdateCategorySuccess(category, node, path));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function deleteCategory(categoryId, path) {
  return dispatch => {
    dispatch(setFetching);
    api.deleteCategory(categoryId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setDeleteCategorySuccess(categoryId, path));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function listCameraByCategory(categoryId) {
  return dispatch => {
    dispatch(setFetching);
    api.listCameraByCategory(categoryId, apiResults => {
      if (apiResults.isSuccess) {
        let cameras = cameraListMapping(apiResults.data);
        dispatch(setListCameraByCategorySuccess(cameras));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function assignCameraToCategory(categoryId, cameraIds) {
  return dispatch => {
    dispatch(setFetching);
    api.assignCameraToCategory(categoryId, cameraIds, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(listCameraByCategory(categoryId));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function removeCameraFromCategory(categoryId, cameraIds) {
  return dispatch => {
    dispatch(setFetching);
    api.removeCameraFromCategory(categoryId, cameraIds, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(listCameraByCategory(categoryId));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

function setFetching(isFetching) {
  return {
    type: CATEGORY_FETCHING,
    isFetching: isFetching
  };
}

function setListCategorySuccess(treeData) {
  return {
    type: LIST_CATEGORY_TREE_SUCCESS,
    treeData: treeData
  };
}

function setAddCategorySuccess(newCategory, path) {
  return {
    type: ADD_CATEGORY_SUCCESS,
    newCategory: newCategory,
    path: path
  };
}

function setUpdateCategorySuccess(categoryUpdated, node, pathUpdate) {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    categoryUpdated: categoryUpdated,
    node: node,
    pathUpdate: pathUpdate
  };
}

function setDeleteCategorySuccess(categoryId, pathDelete) {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    categoryId: categoryId,
    pathDelete: pathDelete
  };
}

function setListCameraByCategorySuccess(cameras) {
  return {
    type: LIST_CAMERA_BY_CATEGORY_SUCCESS,
    camerasByCategory: cameras
  };
}

// initialize state
const initState = {
  isFetching: false,
  treeData: [],
  camerasByCategory: []
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case CATEGORY_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });
    case LIST_CATEGORY_TREE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        treeData: action.treeData,
        camerasByCategory: []
      });
    case ADD_CATEGORY_SUCCESS:
      let { newCategory, path } = action;

      let newTreeData = addNewCategoryToTreeData(
        state.treeData,
        newCategory,
        path
      );
      return Object.assign({}, state, {
        isFetching: false,
        treeData: newTreeData
      });
    case UPDATE_CATEGORY_SUCCESS:
      let { categoryUpdated, pathUpdate, node } = action;
      let treeDataUpdated = updateCategoryOfTreeData(
        state.treeData,
        categoryUpdated,
        node,
        pathUpdate
      );
      return Object.assign({}, state, {
        isFetching: false,
        treeData: treeDataUpdated
      });
    case DELETE_CATEGORY_SUCCESS:
      let { categoryId, pathDelete } = action;
      let treeDataDeletedUpdated = deleteCategoryOfTreeData(
        state.treeData,
        categoryId,
        pathDelete
      );
      return Object.assign({}, state, {
        isFetching: false,
        treeData: treeDataDeletedUpdated
      });
    case LIST_CAMERA_BY_CATEGORY_SUCCESS:
      let camerasByCategory = action.camerasByCategory;
      return Object.assign({}, state, {
        isFetching: false,
        camerasByCategory: camerasByCategory
      });
    default:
      return state;
  }
}

// Function helper
function addNewCategoryToTreeData(treeData, newCategory, path) {
  const getNodeKey = ({ treeIndex }) => treeIndex;
  let newTreeData = addNodeUnderParent({
    treeData: treeData,
    parentKey: path[path.length - 1],
    expandParent: true,
    getNodeKey,
    newNode: {
      title: newCategory.name,
      id: newCategory.id
    }
  }).treeData;

  return newTreeData;
}

function updateCategoryOfTreeData(treeData, categoryUpdated, node, path) {
  const getNodeKey = ({ treeIndex }) => treeIndex;
  let title = categoryUpdated.name;
  let treeDataUpdated = changeNodeAtPath({
    treeData: treeData,
    path,
    getNodeKey,
    newNode: { ...node, title }
  });

  return treeDataUpdated;
}

function deleteCategoryOfTreeData(treeData, categoryId, path) {
  const getNodeKey = ({ treeIndex }) => treeIndex;
  let treeDataUpdated = removeNodeAtPath({
    treeData: treeData,
    path,
    getNodeKey
  });

  return treeDataUpdated;
}

function cameraListMapping(cameras) {
  const cameraUIs = [];
  cameras.forEach(camera => {
    let cameraUI = new Camera(camera);
    cameraUIs.push(cameraUI);
  });

  return cameraUIs;
}
