import api from "../../Api/ApiClients/user";
import { addErrorMessage } from "../../Store/errorMessageReducer";
import { PAGE_ONE, PAGE_SIZE_ALL } from "../Utils/constant";
import User from "../../Model/user";

const USER_FETCHING = "USER_FETCHING";

const LIST_USERS_SUCCESS = "LIST_USERS_SUCCESS";
const LIST_ALL_USERS_SUCCESS = "LIST_ALL_USERS_SUCCESS";
const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
const ADD_OR_UPDATE_USER_FAILED = "ADD_OR_UPDATE_USER_FAILED";
const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
const RETRIEVE_GROUP_FOR_USER_SUCCESS = "RETRIEVE_GROUP_FOR_USER_SUCCESS";

// Public function
export function getUsers(keyword, page, pageSize) {
  return dispatch => {
    dispatch(setFetching(true));
    api.searchUser(keyword, page, pageSize, apiResults => {
      if (apiResults.isSuccess) {
        let users = apiResults.data;
        dispatch(
          setListUserSuccess(userListMapping(users), apiResults.totalPages)
        );
        users.forEach(user => {
          dispatch(retrieveGroupForUser(user.id));
        });
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function getAllUsers(keyword) {
  return dispatch => {
    api.searchUser(keyword, PAGE_ONE, PAGE_SIZE_ALL, apiResults => {
      if (apiResults.isSuccess) {
        let users = apiResults.data;
        dispatch(setListAllUserSuccess(userListMapping(users)));
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function addUser(user) {
  return dispatch => {
    dispatch(setAddOrUpdateUserFailed());
    dispatch(setFetching(true));    
    api.createNewUser(user, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setAddUserSuccess(apiResults.data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function deleteUser(userIds) {
  return dispatch => {
    dispatch(setFetching(true));    
    api.deleteUser(userIds, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setDeleteUserSuccess(userIds));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function updateUser(user) {
  return dispatch => {
    dispatch(setAddOrUpdateUserFailed());
    dispatch(setFetching(true));
    api.updateUser(user, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setUpdateUserSuccess(apiResults.data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

function setAddOrUpdateUserFailed() {
  return {
    type: ADD_OR_UPDATE_USER_FAILED
  };
}

export function retrieveGroupForUser(userId) {
  return dispatch => {
    api.getUserGroup(userId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setRetrieveGroupForUserSuccess(userId, apiResults.data));
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function addUserToGroups(userId, groupIds) {  
  return dispatch => {
    dispatch(setFetching(true));
    api.addUserToGroups(userId, groupIds, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(retrieveGroupForUser(userId));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function removeUserInGroups(userId, groupIds) { 
  return dispatch => {
    dispatch(setFetching(true));
    api.removeUserInGroups(userId, groupIds, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(retrieveGroupForUser(userId));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

// Actions
function setFetching(isFetching) {
  return {
    type: USER_FETCHING,
    isFetching: isFetching
  };
}

function setListUserSuccess(data, totalPages) {
  return {
    type: LIST_USERS_SUCCESS,
    data: data,
    totalPages: totalPages
  };
}

function setListAllUserSuccess(data) {
  return {
    type: LIST_ALL_USERS_SUCCESS,
    data: data
  };
}

function setAddUserSuccess(newUser) {
  return {
    type: ADD_USER_SUCCESS,
    newUser: newUser
  };
}

function setDeleteUserSuccess(userIds) {
  return {
    type: DELETE_USER_SUCCESS,
    userIds: userIds
  };
}

function setUpdateUserSuccess(userUpdated) {
  return {
    type: UPDATE_USER_SUCCESS,
    userUpdated: userUpdated
  };
}

function setRetrieveGroupForUserSuccess(userId, groups) {
  return {
    type: RETRIEVE_GROUP_FOR_USER_SUCCESS,
    userId: userId,
    groups: groups
  };
}

// initialize state
const initState = {
  isFetching: false,
  data: [],
  totalPages: 1
};

// Reducer
export default function reducer(state = initState, action) {
  switch (action.type) {
    case USER_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });
    case LIST_USERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        totalPages: action.totalPages
      });
    case LIST_ALL_USERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        allUsers: action.data
      });
    case ADD_USER_SUCCESS:
      let newUser = User(action.newUser);
      return Object.assign({}, state, {
        isFetching: false,
        data: [...state.data.concat(newUser)],
        addOrUpdateUserFailed: false
      });
    case DELETE_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: [...state.data.filter(user => !action.userIds.includes(user.id))]
      });
    case UPDATE_USER_SUCCESS:
      let userUpdated = User(action.userUpdated);      
      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data.map(user => {
            if (user.id === userUpdated.id) {
              userUpdated.groups = user.groups;
              userUpdated.groupsString = user.groupsString;
              return Object.assign({}, user, userUpdated);
            } else {
              return user;
            }
          })
        ],
        addOrUpdateUserFailed: false
      });
    case ADD_OR_UPDATE_USER_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        addOrUpdateUserFailed: true
      });
    case RETRIEVE_GROUP_FOR_USER_SUCCESS:
      let { userId, groups } = action;

      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data.map(user => {
            if (user.id === userId) {
              return Object.assign({}, user, {
                groups: groups,
                groupsString: groupToString(groups)
              });
            } else {
              return user;
            }
          })
        ]
      });
    default:
      return state;
  }
}

// Function helper
function userListMapping(users) {
  const userUIs = [];
  users.forEach(user => {
    let userUI = User(user);
    userUIs.push(userUI);
  });

  return userUIs;
}

function groupToString(groups) {
  const groupsString = [];
  groups.forEach(group => {
    groupsString.push(group.name);
  });

  return groupsString;
}
