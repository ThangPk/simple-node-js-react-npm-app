import { connect } from "react-redux";
import {
  getMapTree,
  onChangeMapTree,
  saveMap,
  updateMap,
  removeMap,
  getCameraOnMaps,
  setCameraOnMaps,
  updateCamerasOnMap,
  removeCameraOnMap,
  setCameraOnMapsUpdate,
  getRemainCameraOnMaps
} from "./reducer";
import MapView from "./Components/mapView";

const mapStateToProps = state => {
  return {
    isFetching: state.mapReducer.isFetching,
    treeData: state.mapReducer.treeData,
    cameraOnMaps: state.mapReducer.cameraOnMaps,
    remainCameraOnMaps: state.mapReducer.remainCameraOnMaps,
    cameraOnMapsUpdate: state.mapReducer.cameraOnMapsUpdate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMapTree: () => dispatch(getMapTree()),
    onChangeMapTree: treeData => dispatch(onChangeMapTree(treeData)),
    saveMap: (map, file, path, treeData) => dispatch(saveMap(map, file, path, treeData)),
    updateMap: (map, file, node, path) => dispatch(updateMap(map, file, node, path)),
    removeMap: (mapId, path) => dispatch(removeMap(mapId, path)),
    getCameraOnMaps: mapId => dispatch(getCameraOnMaps(mapId)),
    getRemainCameraOnMaps: () => dispatch(getRemainCameraOnMaps()),
    setCameraOnMaps: (cameraOnMap, mapId) => dispatch(setCameraOnMaps(cameraOnMap, mapId)),
    updateCamerasOnMap: (camerasOnMap, mapId) => dispatch(updateCamerasOnMap(camerasOnMap, mapId)),
    removeCameraOnMap: (cameraOnMap, mapId) => dispatch(removeCameraOnMap(cameraOnMap, mapId)),
    setCameraOnMapsUpdate: cameraOnMapsUpdate => dispatch(setCameraOnMapsUpdate(cameraOnMapsUpdate))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView);
