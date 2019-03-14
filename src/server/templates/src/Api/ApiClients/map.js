import Api from "../api";
import BaseApi from "./baseApi";
import mapRender from "../../Views/Commons/map/mapRender";

class Map extends BaseApi {
  /**
   * 1. Save map
   */  
  static saveMap(map, file, callback) {
    let apiPath = "api/1.0/map/save";
    try {
      let mapData = {
        id: map.id,
        name: map.name,
        parent_id: map.parentId,
        linked_object_id: map.linkedObjectId,
        image_changed: map.isImageChanged ? "changed" : "none",
        image_width: map.imageWidth,
        image_height: map.imageHeight,
        order: map.order ? map.order : ""
      };

      let data = new FormData();
      data.append("image", file);
      data.append("data", JSON.stringify(mapData));

      let params = data;
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
   /**
   * 2. Get map tree
   */  
  static getMapTree(callback) {
    let apiPath = "api/1.0/map/get";
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
   * 3. Remove map
   */  
  static removeMap(mapId, callback) {
    let apiPath = "api/1.0/map/remove/" + mapId;
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
   * 4. Get image of map
   */  
  static getImageOfMap(mapId, callback) {
    let apiPath = "api/1.0/map/image/" + mapId;
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
   * 5. Get thumb image of map
   */  
  static getImageThumbOfMap(mapId, callback) {
    let apiPath = "api/1.0/map/thumb/" + mapId;
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
   * 6. Set camera on map
   */  
  static setCameraOnMap(cameraOnMap, mapId, callback) {
    let apiPath = "api/1.0/map/cameras/set";
    try {
      let params = {
        map_id: mapId,
        camera_id: cameraOnMap.id,
        x_coordinate: cameraOnMap.xCoordinate,
        y_coordinate: cameraOnMap.yCoordinate,
        rotate_angle: cameraOnMap.rotateAngle
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
   /**
   * 7. Update cameras on map
   */  
  static updateCamerasOnMap(camerasOnMap, mapId, callback) {
    let apiPath = "api/1.0/map/cameras/update";
    try {
      let cameras_on_map = [];
      camerasOnMap.forEach(cameraOnMap => {
        cameras_on_map.push({
          map_id: mapId,
          camera_id: cameraOnMap.camera.id,
          x_coordinate: cameraOnMap.x,
          y_coordinate: cameraOnMap.y,
          rotate_angle: cameraOnMap.rotate
        });
      });

      let params = {
        cameras_on_maps: JSON.stringify(cameras_on_map)
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
   /**
   * 8. Remove camera on map
   */  
  static removeCameraOnMap(cameraId, mapId, callback) {
    let apiPath = "api/1.0/map/cameras/remove";
    try {
      let params = {
        map_id: mapId,
        camera_id: cameraId
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
   /**
   * 9. Get camera on map
   */  
  static getCameraOnMap(mapId, callback) {
    let apiPath = "api/1.0/map/cameras/get";
    try {
      let params = {
        map_id: mapId,
        page: 1,
        page_size: 1000
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
   /**
   * 10. Get remain cameras on map
   */  
  static getRemainCameraOnMap(callback) {
    let apiPath = "api/1.0/map/cameras/remain";
    try {
      let params = {};
      Api.get(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
}

export default Map;
