import Api from "../api";
import ApiResults from "../apiResult";
import ApiError from "../apiError";

export default class BaseApi {
  static returnValue(path, response) {
    console.log(path + ": " + JSON.stringify(response));
    let data = new ApiResults();
    data.isSuccess = response.success;
    data.errorMessage = response.success
      ? null
      : ApiError.getApiErrorMessage(path, response.data, response.details);
    data.data = response.success ? response.data : null;

    if (response.data === "PASSWORD_CHANGED_REQUIRED") {
      data.data = response.data;
    }
    if (isNotEmpty(response.total_pages)) {
      data.totalPages = response.total_pages;
    }

    return data;
  }

  static catchError(error) {
    console.log("catchError " + error);
    let data = new ApiResults();
    return data;
  }
}

function isNotEmpty(object) {
  return object !== null && object !== undefined && object !== "";
}
