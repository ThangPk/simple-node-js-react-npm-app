import * as constant from "../Views/Utils/constant";

let CameraPermission = cameraPermissionJSON => {
  let cameraPermission = {
    id: cameraPermissionJSON.id,
    cameraId: cameraPermissionJSON.camera_id,
    cameraName: cameraPermissionJSON.camera_name,
    cameraDescription: cameraPermissionJSON.camera_description,
    canViewLive: cameraPermissionJSON.can_view_live ? true : false,
    canViewPlaybacks: cameraPermissionJSON.can_search_playbacks ? true : false,
    canDoHumanDetection: cameraPermissionJSON.can_view_human_tracking ? true : false,
    canDoLicensePlate: cameraPermissionJSON.can_view_license_plate ? true : false,
    canDoFaceRecognition: cameraPermissionJSON.can_view_face_recognition ? true : false,
    imagePreviewUrl: constant.BASE_STREAMING_URL + cameraPermissionJSON.camera_id + constant.HSL_STREAM,
    imageSubUrl: constant.BASE_STREAMING_URL + cameraPermissionJSON.camera_id + constant.HSL_STREAM_SUB,
    imageMainUrl: constant.BASE_STREAMING_URL + cameraPermissionJSON.camera_id + constant.HSL_STREAM_MAIN,
  };

  return cameraPermission;
};

export default CameraPermission;
