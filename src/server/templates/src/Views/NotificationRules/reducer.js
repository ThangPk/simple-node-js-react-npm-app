import api from "../../Api/ApiClients/notificationRule";
import { addErrorMessage } from "../../Store/errorMessageReducer";
import NotificationRule from "../../Model/notificationRule";

const NOTIFICATION_RULE_FETCHING = "NOTIFICATION_RULE_FETCHING";

const LIST_NOTIFICATION_RULE_SUCCESS = "LIST_NOTIFICATION_RULE_SUCCESS";
const SET_NOTIFICATION_RULE_SUCCESS = "SET_NOTIFICATION_RULE_SUCCESS";
const SET_NOTIFICATION_RULE_FAILED = "SET_NOTIFICATION_RULE_FAILED";
const DELETE_NOTIFICATION_RULE_SUCCESS = "DELETE_NOTIFICATION_RULE_SUCCESS";

export function getNotificationRules(
  cameraId,
  aiType,
  notificationType,
  page,
  pageSize
) {
  return dispatch => {
    dispatch(setFetching(true));
    api.getNotificationRules(
      cameraId,
      aiType,
      notificationType,
      page,
      pageSize,
      apiResults => {
        if (apiResults.isSuccess) {
          let notificationRules = apiResults.data;
          let totalPages = apiResults.totalPages;
          dispatch(
            setListNotificationRulesSuccess(
              notificationRuleListMapping(notificationRules),
              totalPages
            )
          );
        } else {
          dispatch(setFetching(false));
          dispatch(addErrorMessage(apiResults.errorMessage));
        }
      }
    );
  };
}

export function setNotificationRule(notificationRule, isUpdated) {
  return dispatch => {
    dispatch(setSetNotificationRuleFailed());
    dispatch(setFetching(true));    
    api.setNotificationRule(notificationRule, apiResults => {
      if (apiResults.isSuccess) {
        let notificationRule = NotificationRule(apiResults.data);
        dispatch(setSetNotificationRuleSuccess(notificationRule, isUpdated));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

export function deleteNotificationRules(nofiticationRuleIds) {
  return dispatch => {
    dispatch(setFetching(true));    
    api.deleteNotificationRules(nofiticationRuleIds, apiResults => {
      if (apiResults.isSuccess) {
        dispatch(setDeleteNotificationRuleSuccess(nofiticationRuleIds));
      } else {
        dispatch(setFetching(false));
        dispatch(addErrorMessage(apiResults.errorMessage));
      }
    });
  };
}

function setFetching(isFetching) {
  return {
    type: NOTIFICATION_RULE_FETCHING,
    isFetching: isFetching
  };
}

function setListNotificationRulesSuccess(notificationRules, totalPages) {
  return {
    type: LIST_NOTIFICATION_RULE_SUCCESS,
    notificationRules: notificationRules,
    totalPages: totalPages
  };
}

function setSetNotificationRuleSuccess(notificationRule, isUpdated) {
  return {
    type: SET_NOTIFICATION_RULE_SUCCESS,
    notificationRule: notificationRule,
    isUpdated: isUpdated
  };
}

function setSetNotificationRuleFailed() {
  return {
    type: SET_NOTIFICATION_RULE_FAILED
  };
}

function setDeleteNotificationRuleSuccess(notificationRuleIdsDeleted) {
  return {
    type: DELETE_NOTIFICATION_RULE_SUCCESS,
    notificationRuleIdsDeleted: notificationRuleIdsDeleted
  };
}

// initialize state
const initState = {
  isFetching: false,
  notificationRules: [],
  totalPages: 1
};

// Reducer
export default function reducer(state = initState, action) {
  switch (action.type) {
    case NOTIFICATION_RULE_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      });
    case LIST_NOTIFICATION_RULE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        notificationRules: action.notificationRules,
        totalPages: action.totalPages
      });
    case SET_NOTIFICATION_RULE_SUCCESS:
      let { isUpdated, notificationRule } = action;
      if (isUpdated) {        
        return Object.assign({}, state, {
          isFetching: false,
          notificationRules: [
            ...state.notificationRules.map(notificationRuleMap => {
              if (notificationRuleMap.id === notificationRule.id) {
                return Object.assign({}, notificationRuleMap, notificationRule);
              } else {
                return notificationRuleMap;
              }
            })
          ],
          setNotificationRuleFailed: false
        });
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          notificationRules: [
            ...state.notificationRules.concat(notificationRule)
          ],
          setNotificationRuleFailed: false
        });
      }
    case SET_NOTIFICATION_RULE_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        setNotificationRuleFailed: true
      });
    case DELETE_NOTIFICATION_RULE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        notificationRules: [
          ...state.notificationRules.filter(
            notificationRule =>
              !action.notificationRuleIdsDeleted.includes(notificationRule.id)
          )
        ]
      });
    default:
      return state;
  }
}

// Function helper
function notificationRuleListMapping(notificationRules) {
  const notificationRuleUIs = [];
  notificationRules.forEach(notificationRule => {
    let notificationRuleUI = NotificationRule(notificationRule);
    notificationRuleUIs.push(notificationRuleUI);
  });

  return notificationRuleUIs;
}
