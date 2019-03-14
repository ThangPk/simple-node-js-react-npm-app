import Api from "../api";
import BaseApi from "./baseApi";

class People extends BaseApi {
  /**
   * 1. Get people
   */
  static getPeople(keyword, page, pageSize, callback) {
    let apiPath = "api/1.0/peoples/get";
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
   * 2. Save people
   */
  static savePeople(people, images, callback) {
    let apiPath = "api/1.0/peoples/save";
    try {
      let peopleInfo = {
        id: people.id,
        first_name: people.firstName,
        last_name: people.lastName,
        email: people.email,
        phone_number: people.phoneNumber
      };

      let data = new FormData();
      if (images) {
        Array.from(images).forEach(image => {
          data.append("files[]", image, image.name);
        });
      }
      data.append("data", JSON.stringify(peopleInfo));

      let params = data;
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
  /**
   * 3. Delete peoples
   */
  static deletePeoples(peopleIds, callback) {
    let apiPath = "api/1.0/peoples/remove";
    try {
      let params = {
        people_ids: peopleIds
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
  /**
   * 4. Delete images people
   */
  static deletePeopleImage(imageId, callback) {
    let apiPath = "api/1.0/peoples/image/remove/" + imageId;
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

export default People;
