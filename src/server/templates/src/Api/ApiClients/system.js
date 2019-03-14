import Api from "../api";
import BaseApi from "./baseApi";

class System extends BaseApi {
  /**
   * 1. Get Human server status
   */

  static getHumanServerStatus(callback) {
    let apiPath = "api/1.0/system/human-servers/status";
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
   * 2. Get Face recognition server status
   */
  static getFaceRecognitionServerStatus(callback) {
    let apiPath = "api/1.0/system/face-recognition-servers/status";
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
   * 3. Get License plate server status
   */
  static getLicensePlateRecognitionServerStatus(callback) {
    let apiPath = "api/1.0/system/license-plate-recognition-servers/status";
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
   * 4. Get servers
   */
  static getServers(callback) {
    let apiPath = "api/1.0/system/servers/get";
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
   * 5. Get human tracking servers
   */
  static getHumanServers(callback) {
    let apiPath = "api/1.0/system/human-servers/get";
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
   * 6. Get face recognition servers
   */
  static getFaceRecognitionServers(callback) {
    let apiPath = "api/1.0/system/face-recognition-servers/get";
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
   * 7. Get license plate recognition servers
   */
  static getLicensePlateRecognitionServers(callback) {
    let apiPath = "api/1.0/system/license-plate-recognition-servers/get";
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
   * 8. Stop server
   */
  static stopServer(serverId, callback) {
    let apiPath = "api/1.0/system/servers/stop/" + serverId;
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
   * 9. Stop human tracking server
   */
  static stopHumanServer(serverId, callback) {
    let apiPath = "api/1.0/system/human-servers/stop/" + serverId;
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
   * 10. Stop face recognition server
   */
  static stopFaceRecognitionServer(serverId, callback) {
    let apiPath = "api/1.0/system/face-recognition-servers/stop/" + serverId;
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
   * 11. Stop license plate recognition server
   */
  static stopLicensePlateRecognitionServer(serverId, callback) {
    let apiPath =
      "api/1.0/system/license-plate-recognition-servers/stop/" + serverId;
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
   * 12. Start server
   */
  static startServer(serverId, callback) {
    let apiPath = "api/1.0/system/servers/start/" + serverId;
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
   * 13. Start human tracking server
   */
  static startHumanServer(serverId, callback) {
    let apiPath = "api/1.0/system/human-servers/start/" + serverId;
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
   * 14. Start face recognition server
   */
  static startFaceRecognitionServer(serverId, callback) {
    let apiPath = "api/1.0/system/face-recognition-servers/start/" + serverId;
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
   * 15. Start license plate recognition server
   */
  static startLicensePlateRecognitionServer(serverId, callback) {
    let apiPath =
      "api/1.0/system/license-plate-recognition-servers/start/" + serverId;
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
   * 16. Remove server
   */
  static removeServer(serverId, callback) {
    let apiPath = "api/1.0/system/servers/remove/" + serverId;
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
   * 17. Remove human tracking server
   */
  static removeHumanServer(serverId, callback) {
    let apiPath = "api/1.0/system/human-servers/remove/" + serverId;
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
   * 18. Remove face recognition server
   */
  static removeFaceRecognitionServer(serverId, callback) {
    let apiPath = "api/1.0/system/face-recognition-servers/remove/" + serverId;
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
   * 19. Remove license plate recognition server
   */
  static removeLicensePlateRecognitionServer(serverId, callback) {
    let apiPath =
      "api/1.0/system/license-plate-recognition-servers/remove/" + serverId;
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
   * 20. Get camera status
   */
  static getCameraStatus(callback) {
    let apiPath = "api/1.0/system/cameras/status";
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
   * 21. Get human tracking camera status
   */
  static getHumanCameraStatus(callback) {
    let apiPath = "api/1.0/system/human-cameras/status";
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
   * 22. Get face recognition camera status
   */
  static getFaceRecognitionCameraStatus(callback) {
    let apiPath = "api/1.0/system/face-recognition-cameras/status";
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
   * 23. Get license plate recognition camera status
   */
  static getLicensePlateRecognitionCameraStatus(callback) {
    let apiPath = "api/1.0/system/license-plate-recognition-cameras/status";
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
   * 24. Get server status
   */
  static getServerStatus(callback) {
    let apiPath = "api/1.0/system/servers/status";
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

export default System;
