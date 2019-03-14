import { connect } from "react-redux";
import DashboardView from "./Components/dashboardView";
import {
  getCameraStatus,
  getHumanCameraStatus,
  getFaceRecognitionCameraStatus,
  getLicensePlateRecognitionCameraStatus,
  getServerStatus,
  getHumanServerStatus,
  getFaceRecognitionServerStatus,
  getLicensePlateRecognitionServerStatus
} from "./reducer";

const mapStateToProps = state => {
  return {
    isFetching: state.dashboardReducer.isFetching,
    cameraStatus: state.dashboardReducer.cameraStatus,
    HumanCameraStatus: state.dashboardReducer.HumanCameraStatus,
    FaceRecognitionCameraStatus: state.dashboardReducer.FaceRecognitionCameraStatus,
    LicensePlateRecognitionCameraStatus: state.dashboardReducer.LicensePlateRecognitionCameraStatus,
    serverStatus: state.dashboardReducer.serverStatus,
    HumanServerStatus: state.dashboardReducer.HumanServerStatus,
    FaceRecognitionServerStatus: state.dashboardReducer.FaceRecognitionServerStatus,
    LicensePlateRecognitionServerStatus: state.dashboardReducer.LicensePlateRecognitionServerStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCameraStatus: () => dispatch(getCameraStatus()),
    getHumanCameraStatus: () => dispatch(getHumanCameraStatus()),
    getFaceRecognitionCameraStatus: () => dispatch(getFaceRecognitionCameraStatus()),
    getLicensePlateRecognitionCameraStatus: () => dispatch(getLicensePlateRecognitionCameraStatus()),
    getServerStatus: () => dispatch(getServerStatus()),
    getHumanServerStatus: () => dispatch(getHumanServerStatus()),
    getFaceRecognitionServerStatus: () => dispatch(getFaceRecognitionServerStatus()),
    getLicensePlateRecognitionServerStatus: () => dispatch(getLicensePlateRecognitionServerStatus())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardView);
