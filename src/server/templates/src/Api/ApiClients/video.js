import Api from "../api";
import BaseApi from "./baseApi";

class Video extends BaseApi {
  /**
   * 1. Get camera
   */
  static getCamera(id, callback) {
    let apiPath = "api/1.0/camera/get/" + id;
    try {
      let params = {};
      Api.get(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 2. Search video for extract
   */
  static searchVideoForExtract(cameraId, startTime, endTime, callback) {
    let apiPath = "api/1.0/videos/extract";
    try {
      let params = {
        camera_id: cameraId,
        start_at: startTime,
        end_at: endTime
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 1. Assigned video playback
   */
  static assignedVideoPlaybackFor(
    videoId,
    expiredAt,
    comment,
    groupIds,
    userIds,
    callback
  ) {
    let apiPath = "api/1.0/videos/assign";
    try {
      let params = {
        video_id: videoId,
        expired_at: expiredAt,
        comment: comment,
        user_ids: userIds,
        user_group_ids: groupIds
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
}

export default Video;
