import { connect } from "react-redux";
import ServerView from "./Components/serverView";
import {
  getServers,
  startServer,
  stopServer,
  removeServer,
  getHumanServers,
  startHumanServer,
  stopHumanServer,
  removeHumanServer,
  getFaceRecognitionServers,
  startFaceRecognitionServer,
  stopFaceRecognitionServer,
  removeFaceRecognitionServer,
  getLicensePlateRecognitionServers,
  startLicensePlateRecognitionServer,
  stopLicensePlateRecognitionServer,
  removeLicensePlateRecognitionServer,
} from "./reducer";

const mapStateToProps = state => {
  return {
    isFetching: state.serverReducer.isFetching,
    servers: state.serverReducer.servers,
    humanServers: state.serverReducer.humanServers,
    faceRecognitionServers: state.serverReducer.faceRecognitionServers,
    licensePlateRecognitionServers: state.serverReducer.licensePlateRecognitionServers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getServers: () => dispatch(getServers()),
    startServer: serverId => dispatch(startServer(serverId)),
    stopServer: serverId => dispatch(stopServer(serverId)),
    removeServer: serverId => dispatch(removeServer(serverId)),
    getHumanServers: () => dispatch(getHumanServers()),
    startHumanServer: serverId => dispatch(startHumanServer(serverId)),
    stopHumanServer: serverId => dispatch(stopHumanServer(serverId)),
    removeHumanServer: serverId => dispatch(removeHumanServer(serverId)),
    getFaceRecognitionServers: () => dispatch(getFaceRecognitionServers()),
    startFaceRecognitionServer: serverId => dispatch(startFaceRecognitionServer(serverId)),
    stopFaceRecognitionServer: serverId => dispatch(stopFaceRecognitionServer(serverId)),
    removeFaceRecognitionServer: serverId => dispatch(removeFaceRecognitionServer(serverId)),
    getLicensePlateRecognitionServers: () => dispatch(getLicensePlateRecognitionServers()),
    startLicensePlateRecognitionServer: serverId => dispatch(startLicensePlateRecognitionServer(serverId)),
    stopLicensePlateRecognitionServer: serverId => dispatch(stopLicensePlateRecognitionServer(serverId)),
    removeLicensePlateRecognitionServer: serverId => dispatch(removeLicensePlateRecognitionServer(serverId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerView);
