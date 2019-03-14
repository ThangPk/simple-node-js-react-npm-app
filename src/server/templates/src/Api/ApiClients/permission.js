import Api from "../api";
import BaseApi from "./baseApi";

class Permission extends BaseApi {  
  /**
   * 1. List permission by group
   */
  static listPermissionByGroup(groupId, callback) {
    let apiPath = "api/1.0/permission/camera/list";
    try {
      let params = {
        user_group_id: groupId
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
  /**
   * 2. Save camera permission
   */
  static savePermission(groupId, cameraId, permission, callback) {
    let apiPath = "api/1.0/permission/camera/save";
    try {
      let params = {
        user_group_id: groupId,
        camera_id: cameraId,
        can_view_live: permission.canViewLive,
        can_search_playbacks: permission.canViewPlaybacks,
        can_view_human_tracking: permission.canDoHumanDetection,
        can_view_license_plate: permission.canDoLicensePlate,
        can_view_face_recognition: permission.canDoFaceRecognition
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
  /**
   * 3. Delete camera permission
   */
  static deletePermission(permissionId, callback) {
    let apiPath = "api/1.0/permission/camera/delete";
    try {
      let params = {
        permission_id: permissionId
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
}

export default Permission;
