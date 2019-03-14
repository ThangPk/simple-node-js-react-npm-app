import * as constant from "../Views/Utils/constant";

let Camera = cameraJSON => {
  let camera = {
    //General information
    id: cameraJSON.id,
    name: cameraJSON.name,
    description: cameraJSON.description,
    ipAddress: cameraJSON.ip_address,
    macAddress: cameraJSON.mac_address,
    vendor: cameraJSON.vendor,
    siteName: cameraJSON.site_name,
    loginPassword: cameraJSON.login_password,
    loginUserName: cameraJSON.login_username,
    videoCodec: cameraJSON.video_codec,

    //Streaming information
    rtspUrl: cameraJSON.rtsp_url,
    rtspUrlSub: cameraJSON.rtsp_url_sub,
    rtspStreamingUrl: cameraJSON.streaming_url,
    connection: cameraJSON.pipeline_status,
    connectionError: cameraJSON.pipeline_error,
    streamingStatus: cameraJSON.streaming_status,
    streamingError: cameraJSON.streaming_error,
    
    //Human tracking
    humanStreamingStatus: cameraJSON.human_streaming_status,
    humanStreamingError: cameraJSON.human_streaming_error,
    humanStreamingRtspUrl: cameraJSON.human_streaming_url,
    humanTrackingRegions:cameraJSON.human_tracking_regions,

    //Face tracking
    faceStreamingStatus: cameraJSON.face_streaming_status,
    faceStreamingError: cameraJSON.face_streaming_error,
    faceStreamingRtspUrl: cameraJSON.face_streaming_url,
    faceRecognitionRegions:cameraJSON.face_recognition_regions,

    //License plate tracking
    licensePlateStreamingStatus: cameraJSON.lic_plate_streaming_status,
    licensePlateStreamingError: cameraJSON.lic_plate_streaming_error,
    licensePlateStreamingRtspUrl: cameraJSON.lic_plate_streaming_url,
    licensePlateRecognitionRegions:cameraJSON.lic_plate_recognition_regions,
    
    //Capability
    enabled: cameraJSON.enabled,
    recordingEnabled: cameraJSON.recording_enabled,
    humanTrackingEnabled: cameraJSON.human_tracking_enabled,
    faceEnabled: cameraJSON.face_enabled,
    licensePlateEnabled: cameraJSON.lic_plate_enabled,
    isEnabled: cameraJSON.enabled ? "Yes" : "No",

    //preview link
    imagePreviewUrl: constant.BASE_STREAMING_URL + cameraJSON.id + constant.HSL_STREAM,
    imageSubUrl: constant.BASE_STREAMING_URL + cameraJSON.id + constant.HSL_STREAM_SUB,
    imageMainUrl: constant.BASE_STREAMING_URL + cameraJSON.id + constant.HSL_STREAM_MAIN,
    
    
  };

  return camera;
};

export default Camera;
