import api from "../../Api/ApiClients/licensePlate";
import { addErrorMessage } from "../../Store/errorMessageReducer";
import { PAGE_ONE, PAGE_SIZE } from "../Utils/constant";

const LICENSE_PLATE_FETCHING = "LICENSE_PLATE_FETCHING";
const LIST_LICENSE_PLATE_SUCCESS = "LIST_LICENSE_PLATE_SUCCESS";
const SAVE_LICENSE_PLATE_SUCCESS = "SAVE_LICENSE_PLATE_SUCCESS";
const ADD_OR_UPDATE_LICENSE_PLATE_FAILED = "ADD_OR_UPDATE_LICENSE_PLATE_FAILED";
const DELETE_LICENSE_PLATE_SUCCESS = "DELETE_LICENSE_PLATE_SUCCESS";

export function importLicensePlateListFile(licensePlateListFile) {
  return dispatch => {
    dispatch(setFetching(true));
    api.importLicensePlateList(licensePlateListFile, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(getLicensePlates("", PAGE_ONE, PAGE_SIZE));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function getLicensePlates(keyword, page, pageSize) {
  return dispatch => {
    dispatch(setFetching(true));
    api.getLicensePlates(keyword, page, pageSize, apiResults => {
      if (apiResults.isSuccess) {
        let licensePlates = apiResults.data;
        dispatch(
          setListLicensePlateSuccess(licensePlates, apiResults.totalPages)
        );
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function saveLicensePlate(licensePlate) {
  return dispatch => {
    dispatch(setSaveLicensePlateFailed());
    dispatch(setFetching(true));    
    api.saveLicensePlate(licensePlate, apiResults => {
      if (apiResults.isSuccess) {
        let isUpdated = licensePlate.id ? true : false;
        dispatch(setSaveLicensePlateSuccess(apiResults.data, isUpdated));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function removeLicensePlate(licensePlatesIds) {
  return dispatch => {
    dispatch(setFetching(true));
    api.removeLicensePlate(licensePlatesIds, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setRemoveLicensePlateSuccess(licensePlatesIds));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

function setFetching(isFetching) {
  return {
    type: LICENSE_PLATE_FETCHING,
    isFetching: isFetching
  };
}
function setListLicensePlateSuccess(licensePlates, totalPages) {
  return {
    type: LIST_LICENSE_PLATE_SUCCESS,
    licensePlates: licensePlates,
    totalPages: totalPages
  };
}

function setSaveLicensePlateSuccess(licensePlateUpdated, isUpdated) {
  return {
    type: SAVE_LICENSE_PLATE_SUCCESS,
    licensePlateUpdated: licensePlateUpdated,
    isUpdated: isUpdated
  };
}

function setSaveLicensePlateFailed() {
  return {
    type: ADD_OR_UPDATE_LICENSE_PLATE_FAILED
  };
}

function setRemoveLicensePlateSuccess(licensePlateIds) {
  return {
    type: DELETE_LICENSE_PLATE_SUCCESS,
    licensePlateIds: licensePlateIds
  };
}

// initialize state
const initState = {
  isFetching: false,
  licensePlates: [],
  totalPages: 1
};

// Reducer
export default function reducer(state = initState, action) {
  switch (action.type) {
    case LICENSE_PLATE_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });
    case LIST_LICENSE_PLATE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        licensePlates: action.licensePlates,
        totalPages: action.totalPages
      });
    case SAVE_LICENSE_PLATE_SUCCESS:
      let { licensePlateUpdated, isUpdated } = action;

      if (isUpdated) {
        return Object.assign({}, state, {
          isFetching: false,
          licensePlates: [
            ...state.licensePlates.map(licensePlate => {
              if (licensePlate.id === licensePlateUpdated.id) {
                return Object.assign({}, licensePlate, {
                  value: licensePlateUpdated.value
                });
              } else {
                return licensePlate;
              }
            })
          ],
          addOrUpdateLicensePlateFailed: false
        });
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          licensePlates: [...state.licensePlates.concat(licensePlateUpdated)],
          addOrUpdateLicensePlateFailed: false
        });
      }

    case ADD_OR_UPDATE_LICENSE_PLATE_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        addOrUpdateLicensePlateFailed: true
      });
    case DELETE_LICENSE_PLATE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        licensePlates: [
          ...state.licensePlates.filter(
            licensePlate => !action.licensePlateIds.includes(licensePlate.id)
          )
        ]
      });
    default:
      return state;
  }
}
