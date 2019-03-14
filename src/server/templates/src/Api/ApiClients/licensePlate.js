import Api from "../api";
import BaseApi from "./baseApi";

class LicensePlate extends BaseApi {
  /**
   * 1. Import license plates
   */  
  static importLicensePlateList(csvImport, callback) {
    let apiPath = "api/1.0/license_plates/import";
    try {
      let data = new FormData();
      data.append("license-plate-list", csvImport);

      let params = data;
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
  /**
   * 2. Get license plates
   */  
  static getLicensePlates(keyword, page, pageSize, callback) {
    let apiPath = "api/1.0/license_plates/get";
    try {
      let params = {
        keyword: keyword,
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
   * 3. Save license plate
   */  
  static saveLicensePlate(licensePlate, callback) {
    let apiPath = "api/1.0/license_plates/save";
    try {
      let params = {
        id: licensePlate.id,
        value: licensePlate.value
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
  /**
   * 4. Remove license plate
   */  
  static removeLicensePlate(licensePlateIds, callback) {
    let apiPath = "api/1.0/license_plates/remove";
    try {
      let params = {
        license_plate_ids: licensePlateIds
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
}

export default LicensePlate;
