import { connect } from "react-redux";
import { getAllGroups } from "../Groups/reducer";
import { getAllCameras } from "../Cameras/reducer";
import {
  listPermissionByGroup,
  savePermission,
  deletePermission
} from "./reducer";
import CameraPermissionsView from "./Components/cameraPermissionsView";

const mapStateToProps = state => {
  return {
    isFetching: state.cameraPermissionReducer.isFetching,
    allGroups: state.groupReducer.allGroups,
    allCameraPermissions: cameraToCameraPermission(
      state.cameraReducer.allCameras
    ),
    cameraPermissionsByGroup:
      state.cameraPermissionReducer.cameraPermissionsByGroup
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllGroups: keyword => dispatch(getAllGroups(keyword)),
    getAllCameras: keyword => dispatch(getAllCameras(keyword)),
    listPermissionByGroup: groupId => dispatch(listPermissionByGroup(groupId)),
    savePermission: (groupId, cameraId, permission) =>
      dispatch(savePermission(groupId, cameraId, permission)),
    deletePermission: cameraPermissionId =>
      dispatch(deletePermission(cameraPermissionId))
  };
};

function cameraToCameraPermission(cameras) {
  const cameraPermissions = [];
  if (cameras) {
    cameras.forEach(camera => {
      let cameraPermission = {
        cameraId: camera.id,
        cameraName: camera.name,
        cameraDescription: camera.description,
        canViewLive: false,
        canViewPlaybacks: false,
        canDoHumanDetection: false,
        canDoLicensePlate: false,
        canDoFaceRecognition: false,
        imagePreviewUrl: camera.imagePreviewUrl,
        imageSubUrl: camera.imageSubUrl,
        imageMainUrl: camera.imageMainUrl
      };
      cameraPermissions.push(cameraPermission);
    });
  }
  return cameraPermissions;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraPermissionsView);
