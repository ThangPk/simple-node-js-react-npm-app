import Api from "../api";
import BaseApi from "./baseApi";

class Group extends BaseApi {
  /**
   * 1. Add an user group
   */
  static addAnUserGroup(groupName, callback) {
    let apiPath = "api/1.0/group/add";
    try {
      let params = {
        name: groupName
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 2. Update an user group
   */
  static updateAnUserGroup(group, callback) {
    let apiPath = "api/1.0/group/update";
    try {
      let params = {
        id: group.id,
        name: group.groupName
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 3. Delete an user group
   */
  static deleteAnUserGroup(groupIds, callback) {
    let apiPath = "api/1.0/group/delete";
    try {
      let params = {
        user_group_ids: groupIds
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 4. Search user group
   */
  static searchUserGroups(keyword, page, pageSize, callback) {
    let apiPath = "api/1.0/group/search";
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
   * 5. Remove user groups for an user
   */
  static searchUsersGroup(groupId, callback) {
    let apiPath = "api/1.0/group/" + groupId + "/members";
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
   * 6. Add members to an user group
   */
  static addMembersToGroup(groupId, userIds, callback) {
    let apiPath = "api/1.0/group/" + groupId + "/members/add";
    try {
      let params = { user_ids: userIds };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 7. Remove members to an user group
   */
  static removeMembersInGroup(groupId, userIds, callback) {
    let apiPath = "api/1.0/group/" + groupId + "/members/remove";
    try {
      let params = { user_ids: userIds };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
}

export default Group;
