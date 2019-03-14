import Api from "../api";
import BaseApi from "./baseApi";

class User extends BaseApi {
  /**
   * 1. Login
   */
  static login(username, password, callback) {
    let apiPath = "api/1.0/user/login";
    try {
      let params = {
        user_name: username,
        password: password
      };

      Api.login(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 2. Authenticate with ACCESS-TOKEN
   */
  static auth(callback) {
    let apiPath = "api/1.0/user/auth";
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
   * 3. Create new user
   */
  static createNewUser(user, callback) {
    let apiPath = "api/1.0/user/add";
    try {
      let params = {
        user_name: user.userName,
        password: user.password,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone_number: user.phoneNumber,
        is_admin: user.isAdmin
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 4. Update user
   */
  static updateUser(user, callback) {
    let apiPath = "api/1.0/user/update";
    try {
      let params = {
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone_number: user.phoneNumber,
        is_admin: user.isAdmin
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 5. Delete users
   */
  static deleteUser(userIds, callback) {
    let apiPath = "api/1.0/user/delete";
    try {
      let params = {
        user_ids: userIds
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 6. Search users
   */
  static searchUser(keyword, page, pageSize, callback) {
    let apiPath = "api/1.0/user/search";
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
   * 7. Change password
   */
  static changeUserPassword(oldPassword, newPassword, callback) {
    let apiPath = "api/1.0/user/pwd/change";
    try {
      let params = {
        old_password: oldPassword,
        new_password: newPassword
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 8. Reset password
   */
  static resetUserPassword(userId, callback) {
    let apiPath = "api/1.0/user/pwd/reset";
    try {
      let params = {
        user_id: userId
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }

  /**
   * 9. Retrieve user groups for an user
   */
  static getUserGroup(userId, callback) {
    let apiPath = "api/1.0/user/" + userId + "/groups";
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
   * 10. Retrieve user groups for an user
   */
  static getUserGroup(userId, callback) {
    let apiPath = "api/1.0/user/" + userId + "/groups";
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
   * 11. Add user groups for an user
   */
  static addUserToGroups(userId, groupIds, callback) {
    let apiPath = "api/1.0/user/" + userId + "/groups/add";
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
   * 12. Remove user groups for an user
   */
  static removeUserInGroups(userId, groupIds, callback) {
    let apiPath = "api/1.0/user/" + userId + "/groups/remove";
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
}

export default User;
