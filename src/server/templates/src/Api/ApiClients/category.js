import Api from "../api";
import BaseApi from "./baseApi";

class Category extends BaseApi {  
  /**
   * 1. List Category
   */
  static listCategory(callback) {
    let apiPath = "api/1.0/category/list";
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
   * 2. Add Category
   */
  static addCategory(category, callback) {
    let apiPath = "api/1.0/category/add";
    try {
      let params = {
        name: category.name,
        parent_category_id: category.parentCategoryId
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
  /**
   * 3. Remove Category
   */
  static deleteCategory(categoryId, callback) {
    let apiPath = "api/1.0/category/remove";
    try {
      let params = {
        id: categoryId
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
  /**
   * 4. Update Category
   */
  static updateCategory(category, callback) {
    let apiPath = "api/1.0/category/update";
    try {
      let params = {
        id: category.id,
        name: category.name
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
  /**
   * 5. List camera by category
   */
  static listCameraByCategory(categoryId, callback) {
    let apiPath = "api/1.0/category/cameras";
    try {
      let params = {
        category_id: categoryId
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
  /**
   * 6. Assign camera to category
   */
  static assignCameraToCategory(categoryId, cameraIds, callback) {
    let apiPath = "api/1.0/category/cameras/assign";
    try {
      let params = {
        category_id: categoryId,
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
   * 7. Remove camera from category
   */
  static removeCameraFromCategory(categoryId, cameraIds, callback) {
    let apiPath = "api/1.0/category/cameras/remove";
    try {
      let params = {
        category_id: categoryId,
        camera_ids: cameraIds
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
}

export default Category;
