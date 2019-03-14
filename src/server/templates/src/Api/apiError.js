const API_ERROR_CODE_MESSAGE = [
  {
    /// Common user errors
    section: "common",
    errors: [
      {
        code: "NETWORK_ERROR",
        message:
          "Could not connect to server. Please check your Internet connection or contact system administrator for support."
      },
      {
        code: "SYSTEM_ERROR",
        message:
          "Server is error. Please contact system administrator for support."
      },
      {
        code: "AUTH_FAILED",
        message: "Your session is expired."
      },
      {
        code: "UNAUTHORIZED",
        message: "You don't have permission to do this action."
      }
    ]
  },
  {
    /// API - api/1.0/user/login
    section: "api/1.0/user/login",
    errors: [
      { code: "LOGIN_FAILED", message: "Login failed. Please try again!" }
    ]
  },
  {
    /// API - api/1.0/user/auth
    section: "api/1.0/user/auth",
    errors: [
      { code: "AUTH_FAILED", message: "" },
      {
        code: "PASSWORD_CHANGED_REQUIRED",
        message: "You need to change password before proceed."
      }
    ]
  },
  {
    /// API - api/1.0/user/add
    section: "api/1.0/user/add",
    errors: [
      { code: "USER_EXISTED", message: "This username is already existed." },
      { code: "EMAIL_INVALID", message: "The email is invalid." }
    ]
  },
  {
    /// API - api/1.0/user/update
    section: "api/1.0/user/update",
    errors: [
      {
        code: "SELF_UPDATE_ADMIN_RIGHTS",
        message: "You can't update admin rights by yourself."
      }
    ]
  },
  {
    ///API - api/1.0/user/delete
    section: "api/1.0/user/delete",
    errors: [{ code: "DELETE_YOURSELF", message: "You can't delete yourself." }]
  },
  {
    ///API - api/1.0/user/search
    section: "api/1.0/user/search",
    errors: []
  },
  {
    ///API - api/1.0/user/pwd/change
    section: "api/1.0/user/pwd/change",
    errors: [
      {
        code: "OLD_PASSWORD_INCORRECT",
        message: "Old password is not correct."
      },
      {
        code: "PASSWORD_NO_DIFFERENCE",
        message: "Please select another secured password."
      }
    ]
  },
  {
    ///API - api/1.0/user/pwd/reset
    section: "api/1.0/user/pwd/reset",
    errors: [{ code: "USER_NOT_EXISTED", message: "User is not existed." }]
  },
  {
    ///API - api/1.0/user/<< user-id >>/groups
    section: "api/1.0/user/{id}/groups",
    errors: []
  },
  {
    ///API - api/1.0/user/<< user-id >>/groups/add
    section: "api/1.0/user/{id}/groups/add",
    errors: [{ code: "USER_NOT_EXISTED", message: "User is not existed." }]
  },
  {
    ///API - api/1.0/user/<< user-id >>/remove
    section: "api/1.0/user/{id}/groups/remove",
    errors: [{ code: "USER_NOT_EXISTED", message: "User is not existed." }]
  },
  {
    ///API - api/1.0/group/add
    section: "api/1.0/group/add",
    errors: [
      { code: "USERGROUP_EXISTED", message: "This user group is existed." }
    ]
  },
  {
    ///API - api/1.0/group/update
    section: "api/1.0/group/update",
    errors: [
      { code: "USERGROUP_EXISTED", message: "This user group is existed." }
    ]
  },
  {
    ///API - api/1.0/group/delete
    section: "api/1.0/group/delete",
    errors: []
  },
  {
    ///API - api/1.0/group/search
    section: "api/1.0/group/search",
    errors: []
  },
  {
    ///API - api/1.0/group/<< user-group-id >>/members
    section: "api/1.0/group/{id}/members",
    errors: []
  },
  {
    ///API - api/1.0/group/<< user-group-id >>/members/add
    section: "api/1.0/group/{id}/members/add",
    errors: [
      { code: "USERGROUP_NOT_EXISTED", message: "User group is not existed." }
    ]
  },
  {
    ///API - api/1.0/group/<< user-group-id >>/members/remove
    section: "api/1.0/group/{id}/members/remove",
    errors: [
      { code: "USERGROUP_NOT_EXISTED", message: "User group is not existed." }
    ]
  },
  {
    ///API - Import camera list
    section: "api/1.0/camera/import",
    errors: [
      {
        code: "CSV_FILE_REQUIRED",
        message: "CSV file is required"
      }
    ]
  },
  {
    ///API - Add a camera
    section: "api/1.0/camera/add",
    errors: [
      { code: "EXISTED_NAME", message: "Camera name is already existed." },
      {
        code: "EXISTED_MAC_ADDRESS",
        message: "MAC address is already existed."
      },
      { code: "EXISTED_IP_ADDRESS", message: "IP address is already existed." }
    ]
  },
  {
    ///API - Update a camera
    section: "api/1.0/camera/update",
    errors: [
      { code: "EXISTED_NAME", message: "Camera name is already existed." },
      {
        code: "EXISTED_MAC_ADDRESS",
        message: "MAC address is already existed."
      },
      { code: "EXISTED_IP_ADDRESS", message: "IP address is already existed." },
      { code: "NOT_EXISTED", message: "Camera is not existed." }
    ]
  },
  {
    ///API - Delete a camera
    section: "api/1.0/camera/delete",
    errors: []
  },
  {
    ///API - Search a camera
    section: "api/1.0/camera/search",
    errors: []
  },
  {
    ///API - Add Category
    section: "api/1.0/category/add",
    errors: [
      { code: "EXISTED_NAME", message: "Category name is already existed." }
    ]
  },
  {
    ///API - Delete Category
    section: "api/1.0/category/remove",
    errors: []
  },
  {
    ///API - Update Category
    section: "api/1.0/category/update",
    errors: [
      { code: "EXISTED_NAME", message: "Category name is already existed." }
    ]
  },
  {
    ///API - List camera by category
    section: "api/1.0/category/cameras",
    errors: []
  },
  {
    ///API - Assign camera to category
    section: "api/1.0/category/cameras/assign",
    errors: [
      { code: "CATEGORY_NOT_EXISTED", message: "Category is not existed." }
    ]
  },
  {
    ///API - Remove camera from category
    section: "api/1.0/category/cameras/remove",
    errors: []
  },
  {
    ///API - List permission by user gorup
    section: "api/1.0/permission/camera/list",
    errors: []
  },
  {
    ///API - Save permission
    section: "api/1.0/permission/camera/save",
    errors: [
      { code: "USERGROUP_NOT_EXISTED", message: "User group is not existed." }
    ]
  },
  {
    ///API - Delete permission
    section: "api/1.0/permission/camera/delete",
    errors: []
  },
  {
    ///API - Save map
    section: "api/1.0/map/save",
    errors: [
      { code: "ROOT_MAP_EXISTED", message: "Root map is already existed." }
    ]
  },
  {
    ///API - Extract video camera
    section: "api/1.0/videos/extract",
    errors: [
      { code: "CAMERA_NOT_EXISTED", message: "Camera not found." },
      { code: "INVALID_END_TIME", message: "Check time input again." },
      { code: "EXCEED_60_MINS", message: "Please search and extract videos length lower than 60 minutes." },
      { code: "NOT_FOUND", message: "Search results is empty. Please input another time for search" }
    ]
  },
];

export default class ApiError {
  static getApiErrorMessage(section, errorCode, errorMessageDetail) {
    var userError = getErrorSection(section).errors.find(
      error => error.code === errorCode
    );

    // check with common errors
    if (userError === undefined) {
      userError = getErrorSection("common").errors.find(
        error => error.code === errorCode
      );
    }

    if (errorCode === "ARGURMENT_REQUIRED") {
      return errorMessageDetail;
    }

    if (userError === undefined) {
      return "Server is error. Please contact system administrator for support.";
    }

    return userError.message;
  }
}

function getErrorSection(section) {
  var returnError = API_ERROR_CODE_MESSAGE.find(
    error => error.section === section
  );
  if (returnError === undefined) {
    returnError = { section: "", errors: [] };
  }
  return returnError;
}
