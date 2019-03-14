import api from "../../Api/ApiClients/people";
import { addErrorMessage } from "../../Store/errorMessageReducer";
import People from "../../Model/people";

const PEOPLE_FETCHING = "PEOPLE_FETCHING";

const LIST_PEOPLE_SUCCESS = "LIST_PEOPLE_SUCCESS";
const ADD_PEOPLE_SUCCESS = "ADD_PEOPLE_SUCCESS";
const UPDATE_PEOPLE_SUCCESS = "UPDATE_PEOPLE_SUCCESS";
const ADD_OR_UPDATE_PEOPLE_FAILED = "ADD_OR_UPDATE_PEOPLE_FAILED";
const DELETE_PEOPLE_SUCCESS = "DELETE_PEOPLE_SUCCESS";
const DELETE_PEOPLE_IMAGE_SUCCESS = "DELETE_PEOPLE_IMAGE_SUCCESS";

export function getPeoples(keyword, page, pageSize) {
  return dispatch => {
    dispatch(setFetching(true));
    api.getPeople(keyword, page, pageSize, apiResults => {
      if (apiResults.isSuccess) {
        let peoples = apiResults.data;
        dispatch(
          setListPeopleSuccess(
            peopleListMapping(peoples),
            apiResults.totalPages
          )
        );
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function addPeople(people, images) {
  return dispatch => {
    dispatch(setAddOrUpdatePeopleFailed());
    dispatch(setFetching(true));    
    api.savePeople(people, images, apiResults => {
      if (apiResults.isSuccess) {
        let newPeople = People(apiResults.data);
        dispatch(setAddPeopleSuccess(newPeople));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function updatePeople(people, images) {
  return dispatch => {
    dispatch(setAddOrUpdatePeopleFailed());
    dispatch(setFetching(true));
    api.savePeople(people, images, apiResults => {
      if (apiResults.isSuccess) {
        let peopleUpdated = People(apiResults.data);
        dispatch(setUpdatePeopleSuccess(peopleUpdated));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function deletePeoples(peopleIds) {
  return dispatch => {
    dispatch(setFetching(true));    
    api.deletePeoples(peopleIds, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setDeletePeopleSuccess(peopleIds));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function deletePeopleImage(peopleId, peopleImageId) {
  return dispatch => {    
    dispatch(setAddOrUpdatePeopleFailed());
    dispatch(setFetching(true));
    api.deletePeopleImage(peopleImageId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setDeletePeopleImageSuccess(peopleId, peopleImageId));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

function setFetching(isFetching) {
  return {
    type: PEOPLE_FETCHING,
    isFetching: isFetching
  };
}

function setListPeopleSuccess(people, totalPages) {
  return {
    type: LIST_PEOPLE_SUCCESS,
    people: people,
    totalPages: totalPages
  };
}

function setAddPeopleSuccess(newPeople) {
  return {
    type: ADD_PEOPLE_SUCCESS,
    newPeople: newPeople
  };
}

function setUpdatePeopleSuccess(peopleUpdated) {
  return {
    type: UPDATE_PEOPLE_SUCCESS,
    peopleUpdated: peopleUpdated
  };
}

function setAddOrUpdatePeopleFailed() {
  return {
    type: ADD_OR_UPDATE_PEOPLE_FAILED
  };
}

function setDeletePeopleSuccess(peopleIdsDeleted) {
  return {
    type: DELETE_PEOPLE_SUCCESS,
    peopleIdsDeleted: peopleIdsDeleted
  };
}

function setDeletePeopleImageSuccess(peopleId, peopleImageId) {
  return {
    type: DELETE_PEOPLE_IMAGE_SUCCESS,
    peopleId: peopleId,
    peopleImageId: peopleImageId
  };
}

// initialize state
const initState = {
  isFetching: false,
  people: [],
  totalPages: 1
};

// Reducer
export default function reducer(state = initState, action) {
  switch (action.type) {
    case PEOPLE_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });
    case LIST_PEOPLE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        people: action.people,
        totalPages: action.totalPages
      });
    case ADD_PEOPLE_SUCCESS:
      let newPeople = action.newPeople;
      return Object.assign({}, state, {
        isFetching: false,
        people: [...state.people.concat(newPeople)],
        addOrUpdatePeopleFailed: false
      });
    case UPDATE_PEOPLE_SUCCESS:
      let peopleUpdated = action.peopleUpdated;
      return Object.assign({}, state, {
        isFetching: false,
        people: [
          ...state.people.map(people => {
            if (people.id === peopleUpdated.id) {
              return Object.assign({}, people, peopleUpdated);
            } else {
              return people;
            }
          })
        ],
        addOrUpdatePeopleFailed: false
      });
    case ADD_OR_UPDATE_PEOPLE_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        addOrUpdatePeopleFailed: true
      });
    case DELETE_PEOPLE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        people: [
          ...state.people.filter(
            people => !action.peopleIdsDeleted.includes(people.id)
          )
        ]
      });
    case DELETE_PEOPLE_IMAGE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        people: [
          ...state.people.map(people => {
            if (people.id === action.peopleId) {
              return Object.assign({}, people, {
                images: people.images.filter(
                  image => image !== "peoples/image/" + action.peopleImageId
                ),
                imageIds: people.imageIds.filter(
                  imageId => imageId !== action.peopleImageId
                )
              });
            } else {
              return people;
            }
          })
        ]
      });
    default:
      return state;
  }
}

// Function helper
function peopleListMapping(peoples) {
  const peopleUIs = [];
  peoples.forEach(people => {
    let peopleUI = People(people);
    peopleUIs.push(peopleUI);
  });

  return peopleUIs;
}
