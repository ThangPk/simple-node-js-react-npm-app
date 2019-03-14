import { connect } from "react-redux";
import CamerasView from "./Components/cameraView";
import {
  importCameraListFile,
  exportCameraList,
  getCameras,
  addCamera,
  updateCamera,
  enableCamera,
  enableCameraRecoding,
  enableHumanTracking,
  enableCameraFaceTracking,
  enableCameraLicensePlateTracking,
  deleteCamera,
  saveHumanTrackingRegions,
  saveFaceRecognitionRegions,
  saveLicensePlateRecognitions
} from "./reducer";

const mapStateToProps = state => {
  return {
    isFetching: state.cameraReducer.isFetching,
    data: state.cameraReducer.data,
    totalPages: state.cameraReducer.totalPages,
    addOrUpdateFailed: state.cameraReducer.addOrUpdateFailed,
    isSavedHumanTracking: state.cameraReducer.isSavedHumanTracking,
    isSavedFaceRecognition: state.cameraReducer.isSavedFaceRecognition,
    isSavedLicensePlateRecognition:
      state.cameraReducer.isSavedLicensePlateRecognition,
    drawingType: state.cameraReducer.drawingType,
    isExportCameraSuccess: state.cameraReducer.isExportCameraSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    importCameraListFile: cameraListFile =>
      dispatch(importCameraListFile(cameraListFile)),
    exportCameraList: () => dispatch(exportCameraList()),
    getCameras: (
      keyword,
      enabled,
      connectionStatus,
      streamingStatus,
      humanDectectionStatus,
      faceStreamingStatus,
      licensePlateStreamingStatus,
      page,
      pageSize
    ) =>
      dispatch(
        getCameras(
          keyword,
          enabled,
          connectionStatus,
          streamingStatus,
          humanDectectionStatus,
          faceStreamingStatus,
          licensePlateStreamingStatus,
          page,
          pageSize
        )
      ),
    addCamera: camera => dispatch(addCamera(camera)),
    updateCamera: camera => dispatch(updateCamera(camera)),
    enableCamera: (id, enabled) => dispatch(enableCamera(id, enabled)),
    enableCameraRecoding: (id, enabled) =>
      dispatch(enableCameraRecoding(id, enabled)),
    enableHumanTracking: (id, enabled) =>
      dispatch(enableHumanTracking(id, enabled)),
    enableCameraFaceTracking: (id, enabled) =>
      dispatch(enableCameraFaceTracking(id, enabled)),
    enableCameraLicensePlateTracking: (id, enabled) =>
      dispatch(enableCameraLicensePlateTracking(id, enabled)),
    deleteCamera: cameraIds => dispatch(deleteCamera(cameraIds)),
    saveHumanTrackingRegions: (id, data) =>
      dispatch(saveHumanTrackingRegions(id, data)),
    saveFaceRecognitionRegions: (id, data) =>
      dispatch(saveFaceRecognitionRegions(id, data)),
    saveLicensePlateRecognitions: (id, data) =>
      dispatch(saveLicensePlateRecognitions(id, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CamerasView);
