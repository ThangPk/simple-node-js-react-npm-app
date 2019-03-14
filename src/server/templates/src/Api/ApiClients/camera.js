import Api from "../api";
import BaseApi from "./baseApi";

class Camera extends BaseApi {
  /**
   * 1. Import camera list
   */
  static importCameraList(csvImport, callback) {
    let apiPath = "api/1.0/camera/import";
    try {
      let data = new FormData();
      data.append("camera-list", csvImport);

      let params = data;
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 2. Export camera list
   */
  static exportCameraList(callback) {
    let apiPath = "api/1.0/camera/export";
    try {
      let params = {};
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 3. Add a camera
   */
  static addCamera(camera, callback) {
    let apiPath = "api/1.0/camera/add";
    try {
      let params = {
        name: camera.name,
        description: camera.description,
        ip_address: camera.ipAddress,
        mac_address: camera.macAddress,
        vendor: camera.vendor,
        rtsp_url: camera.rtspUrl,
        rtsp_url_sub: camera.rtspUrlSub,
        login_password: camera.loginPassword,
        login_username: camera.loginUserName,
        video_codec: camera.videoCodec,
        enabled: camera.enabled,
        recording_enabled: camera.recordingEnabled,
        human_tracking_enabled: camera.humanTrackingEnabled,
        face_enabled: camera.faceEnabled,
        lic_plate_enabled: camera.licensePlateEnabled,
        site_name: camera.siteName
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 4. Update a camera
   */
  static updateCamera(camera, callback) {
    let apiPath = "api/1.0/camera/update";
    try {
      let params = {
        id: camera.id,
        name: camera.name,
        description: camera.description,
        ip_address: camera.ipAddress,
        mac_address: camera.macAddress,
        vendor: camera.vendor,
        rtsp_url: camera.rtspUrl,
        rtsp_url_sub: camera.rtspUrlSub,
        login_password: camera.loginPassword,
        login_username: camera.loginUserName,
        video_codec: camera.videoCodec,
        enabled: camera.enabled,
        recording_enabled: camera.recordingEnabled,
        human_tracking_enabled: camera.humanTrackingEnabled,
        face_enabled: camera.faceEnabled,
        lic_plate_enabled: camera.licensePlateEnabled,
        site_name: camera.siteName
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 5. Enable/disable a camera
   */
  static enableCamera(id, enabled, callback) {
    let apiPath = "api/1.0/camera/enable";
    try {
      let params = {
        id: id,
        enabled: enabled
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 6. Enable/disable a camera recoding
   */
  static enableCameraRecoding(id, enabled, callback) {
    let apiPath = "api/1.0/camera/enable-recording";
    try {
      let params = {
        id: id,
        enabled: enabled
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 7. Enable/disable a camera human-tracking
   */
  static enableHumanTracking(id, enabled, callback) {
    let apiPath = "api/1.0/camera/enable-human-tracking";
    try {
      let params = {
        id: id,
        enabled: enabled
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 8. Enable/disable a camera face tracking
   */
  static enableCameraFaceTracking(id, enabled, callback) {
    let apiPath = "api/1.0/camera/enable-face-tracking";
    try {
      let params = {
        id: id,
        enabled: enabled
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 9. Enable/disable a camera license plate
   */
  static enableCameraLicensePlateTracking(id, enabled, callback) {
    let apiPath = "api/1.0/camera/enable-license-plate-tracking";
    try {
      let params = {
        id: id,
        enabled: enabled
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 10. Delete a camera
   */
  static deleteCameras(cameraIds, callback) {
    let apiPath = "api/1.0/camera/delete";
    try {
      let params = {
        camera_ids: cameraIds
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 11. Search a camera
   */
  static searchCameras(
    keyword,
    enabled,
    conectionStatus,
    streamingStatus,
    humanDectectionStatus,
    faceStreamingStatus,
    licensePlateStreamingStatus,
    page,
    pageSize,
    callback
  ) {
    let apiPath = "api/1.0/camera/search";
    try {
      let params = {
        keyword: keyword,
        enabled: enabled,
        pipeline_status: conectionStatus,
        streaming_status: streamingStatus,
        human_streaming_status: humanDectectionStatus,
        face_streaming_status: faceStreamingStatus,
        lic_plate_streaming_status: licensePlateStreamingStatus,
        page: page,
        page_size: pageSize
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 12. Save faceRecognition regions
   */
  static saveFaceRecognitionRegions(id, data, callback) {
    let apiPath = "api/1.0/camera/regions/face-recognition";
    try {
      let params = {
        id: id,
        regions: JSON.stringify(data),
        frame_width: 600,
        frame_height: 400
      };

      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 13. Save license plate recognitions
   */
  static saveLicensePlateRecognitions(id, data, callback) {
    let apiPath = "api/1.0/camera/regions/license-plate-recognition";
    try {
      let params = {
        id: id,
        regions: JSON.stringify(data),
        frame_width: 600,
        frame_height: 400
      };

      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 14. Save human tracking regions
   */
  static saveHumanTrackingRegions(id, data, callback) {
    let apiPath = "api/1.0/camera/regions/human-tracking";
    try {
      let params = {
        id: id,
        regions: JSON.stringify(data),
        frame_width: 600,
        frame_height: 400
      };

      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
}

export default Camera;
