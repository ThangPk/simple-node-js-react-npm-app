import api from "../../Api/ApiClients/group";
import { addErrorMessage } from "../../Store/errorMessageReducer";
import { PAGE_ONE, PAGE_SIZE_ALL } from "../Utils/constant";

const GROUP_FETCHING = "GROUP_FETCHING";

const LIST_GROUP_SUCCESS = "LIST_GROUP_SUCCESS";
const LIST_ALL_GROUP_SUCCESS = "LIST_ALL_GROUP_SUCCESS";
const ADD_GROUP_SUCCESS = "ADD_GROUP_SUCCESS";
const UPDATE_GROUP_SUCCESS = "UPDATE_GROUP_SUCCESS";
const ADD_OR_UPDATE_GROUP_FAILED = "ADD_OR_UPDATE_GROUP_FAILED";
const DELETE_GROUP_SUCCESS = "DELETE_GROUP_SUCCESS";
const RETRIEVE_USER_FOR_GROUP_SUCCESS = "RETRIEVE_USER_FOR_GROUP_SUCCESS";

// Public function
export function getGroups(keyword, page, pageSize) {
  return dispatch => {
    dispatch(setFetching(true));
    api.searchUserGroups(keyword, page, pageSize, apiResults => {
      if (apiResults.isSuccess) {
        let groups = apiResults.data;
        dispatch(setListGroupSuccess(groups, apiResults.totalPages));

        groups.forEach(group => {
          dispatch(retrieveUserForGroup(group.id));
        });
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function getAllGroups(keyword) {
  return dispatch => {
    api.searchUserGroups(keyword, PAGE_ONE, PAGE_SIZE_ALL, apiResults => {
      if (apiResults.isSuccess) {
        let groups = apiResults.data;
        dispatch(setListAllGroupSuccess(groups));
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function addGroup(groupName) {
  return dispatch => {
    dispatch(setAddOrUpdateGroupFailed());
    dispatch(setFetching(true));    
    api.addAnUserGroup(groupName, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setAddGroupSuccess(apiResults.data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function updateGroup(group) {
  return dispatch => {
    dispatch(setAddOrUpdateGroupFailed());
    dispatch(setFetching(true));    
    api.updateAnUserGroup(group, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setUpdateGroupSuccess(apiResults.data));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function deleteGroup(groupIds) {
  return dispatch => {
    dispatch(setFetching(true));
    api.deleteAnUserGroup(groupIds, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setDeleteGroupSuccess(groupIds));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function retrieveUserForGroup(groupId) {
  return dispatch => {
    api.searchUsersGroup(groupId, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setRetrieveGroupForUserSuccess(groupId, apiResults.data));
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function addMembersToGroups(groupId, userIds) {
  return dispatch => {
    api.addMembersToGroup(groupId, userIds, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(retrieveUserForGroup(groupId));
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function removeMembersInGroup(groupId, userIds) {
  return dispatch => {
    api.removeMembersInGroup(groupId, userIds, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(retrieveUserForGroup(groupId));
      } else {
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

// Actions
function setFetching(isFetching) {
  return {
    type: GROUP_FETCHING,
    isFetching: isFetching
  };
}

function setListGroupSuccess(data, totalPages) {
  return {
    type: LIST_GROUP_SUCCESS,
    data: data,
    totalPages: totalPages
  };
}

function setListAllGroupSuccess(data) {
  return {
    type: LIST_ALL_GROUP_SUCCESS,
    data: data
  };
}

function setAddGroupSuccess(newGroup) {
  return {
    type: ADD_GROUP_SUCCESS,
    newGroup: newGroup
  };
}

function setUpdateGroupSuccess(groupUpdated) {
  return {
    type: UPDATE_GROUP_SUCCESS,
    groupUpdated: groupUpdated
  };
}

function setAddOrUpdateGroupFailed() {
  return {
    type: ADD_OR_UPDATE_GROUP_FAILED
  };
}

function setDeleteGroupSuccess(groupIds) {
  return {
    type: DELETE_GROUP_SUCCESS,
    groupIds: groupIds
  };
}

function setRetrieveGroupForUserSuccess(groupId, users) {
  return {
    type: RETRIEVE_USER_FOR_GROUP_SUCCESS,
    groupId: groupId,
    users: users
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
    case GROUP_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });
    case LIST_GROUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        totalPages: action.totalPages
      });
    case LIST_ALL_GROUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        allGroups: action.data
      });
    case ADD_GROUP_SUCCESS:
      let newGroup = action.newGroup;
      newGroup.usersString = [];
      return Object.assign({}, state, {
        isFetching: false,
        data: [...state.data.concat(newGroup)],
        addOrUpdateGroupFailed: false
      });
    case UPDATE_GROUP_SUCCESS:
      let groupUpdated = action.groupUpdated;
      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data.map(group => {
            if (group.id === groupUpdated.id) {
              return Object.assign({}, group, {
                name: groupUpdated.name
              });
            } else {
              return group;
            }
          })
        ],
        addOrUpdateGroupFailed: false
      });
    case ADD_OR_UPDATE_GROUP_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        addOrUpdateGroupFailed: true
      });

    case DELETE_GROUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data.filter(group => !action.groupIds.includes(group.id))
        ]
      });
    case RETRIEVE_USER_FOR_GROUP_SUCCESS:
      let { groupId, users } = action;
      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data.map(group => {
            if (group.id === groupId) {
              return Object.assign({}, group, {
                users: users,
                usersString: usersToString(users)
              });
            } else {
              return group;
            }
          })
        ]
      });
    default:
      return state;
  }
}

// Function helper
function usersToString(users) {
  const usersString = [];
  users.forEach(user => {
    usersString.push(user.user_name);
  });

  return usersString;
}
