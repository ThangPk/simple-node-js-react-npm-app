import { connect } from "react-redux";
import {
  getCategoryTree,
  onChangeCategoryTree,
  addCategory,
  updateCategory,
  deleteCategory,
  listCameraByCategory,
  assignCameraToCategory,
  removeCameraFromCategory
} from "./reducer";
import { getAllCameras } from "../Cameras/reducer";
import CameraCategoryView from "./Components/cameraCategoryView";

const mapStateToProps = state => {
  return {
    isFetching: state.categoryReducer.isFetching,
    treeData: state.categoryReducer.treeData,
    camerasLeftForCategory: state.categoryReducer.camerasLeftForCategory,
    camerasByCategory: state.categoryReducer.camerasByCategory,
    allCameras: state.cameraReducer.allCameras
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategoryTree: () => dispatch(getCategoryTree()),
    onChangeCategoryTree: treeData => dispatch(onChangeCategoryTree(treeData)),
    addCategory: (category, path) => dispatch(addCategory(category, path)),
    updateCategory: (category, node, path) =>
      dispatch(updateCategory(category, node, path)),
    deleteCategory: (categoryId, path) =>
      dispatch(deleteCategory(categoryId, path)),
    listCameraByCategory: categoryId =>
      dispatch(listCameraByCategory(categoryId)),
    getAllCameras: keyword => dispatch(getAllCameras(keyword)),
    assignCameraToCategory: (categoryId, cameraIds) =>
      dispatch(assignCameraToCategory(categoryId, cameraIds)),
    removeCameraFromCategory: (categoryId, cameraIds) =>
      dispatch(removeCameraFromCategory(categoryId, cameraIds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraCategoryView);
