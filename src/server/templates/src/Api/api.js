let apiBaseUrl = document.location.protocol + '//'  + document.location.host;

class Api {
  static login(apiPath, params, callback) {
    let request = new Request(getApiPath(apiPath), {
      method: "POST",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" }
    });

    fetch(request)
      .then(checkStatus)
      .then(parseJSON)
      .then(results => {
        callback(results);
      })
      .catch(() => {
        callback({ data: "NETWORK_ERROR", details: "", success: false });
      });
  }

  static post(apiPath, params, callback) {
    sendRequest("POST", apiPath, params, callback);
  }

  static get(apiPath, params, callback) {
    sendRequest("GET", apiPath, params, callback);
  }
}

export default Api;

// Networking send request
function sendRequest(method, apiPath, params, callback) {
  let request;
  if (method === "GET") {
    request = new Request(getApiPath(apiPath), {
      method: method,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "ACCESS-TOKEN": localStorage.getItem("ACCESS-TOKEN")
      }
    });
  } else {
    let headerRequest;
    if (
      apiPath !== "api/1.0/camera/import" &&
      apiPath !== "api/1.0/map/save" &&
      apiPath !== "api/1.0/peoples/save" && 
      apiPath !== "api/1.0/license_plates/import"
    ) {
      params = JSON.stringify(params);
      headerRequest = {
        "Content-Type": "application/json",
        "ACCESS-TOKEN": localStorage.getItem("ACCESS-TOKEN")
      };
    } else {
      // For upload file, no including Content-Type
      headerRequest = {
        "ACCESS-TOKEN": localStorage.getItem("ACCESS-TOKEN")
      };
    }

    request = new Request(getApiPath(apiPath), {
      method: method,
      body: params,
      withCredentials: true,
      headers: headerRequest
    });
  }

  fetch(request)
    .then(checkStatus)
    .then(parseJSON)
    .then(results => {
      callback(results);
    })
    .catch((e) => {
      console.log(e)
      callback({ data: "NETWORK_ERROR", details: "", success: false });
    });
}

// Check response status in Promise's response
function checkStatus(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

// Convert json from Promise's response object
function parseJSON(response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  } else {
    return response.text().then(image => {
      return { data: image, details: "", success: true };
    });
  }
}

function getApiPath(apiPath) {
  return apiBaseUrl + "/" + apiPath;
}
