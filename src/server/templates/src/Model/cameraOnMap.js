import * as constant from "../Views/Utils/constant";

let CameraOnMap = cameraOnMapJSON => {
  let cameraOnMap = {
    type: "polygon",
    id: cameraOnMapJSON.id,
    camera: cameraOnMapJSON.camera,
    rotate: cameraOnMapJSON.rotate_angle,
    x: cameraOnMapJSON.x_coordinate,
    y: cameraOnMapJSON.y_coordinate,
    imagePreviewUrl: constant.BASE_STREAMING_URL + cameraOnMapJSON.camera.id + constant.HSL_STREAM,
    imageSubUrl: constant.BASE_STREAMING_URL + cameraOnMapJSON.camera.id + constant.HSL_STREAM_SUB,
    imageMainUrl: constant.BASE_STREAMING_URL + cameraOnMapJSON.camera.id + constant.HSL_STREAM_MAIN,
  };

  return cameraOnMap;
};

export default CameraOnMap;
