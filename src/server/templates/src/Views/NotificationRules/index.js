import { connect } from "react-redux";
import NotificationRulesView from "./Components/notificationRulesView";
import { getAllCameras } from "../Cameras/reducer";
import { getPeoples } from "../Peoples/reducer";
import { getLicensePlates } from "../LicensePlates/reducer";
import {
  getNotificationRules,
  setNotificationRule,
  deleteNotificationRules
} from "./reducer";
import { PAGE_SIZE_ALL, PAGE_ONE } from "../Utils/constant";

const mapStateToProps = state => {
  return {
    isFetching: state.notificationRuleReducer.isFetching,
    notificationRules: state.notificationRuleReducer.notificationRules,
    totalPages: state.notificationRuleReducer.totalPages,
    allCameras: state.cameraReducer.allCameras,
    people: state.peopleReducer.people,
    setNotificationRuleFailed:
      state.notificationRuleReducer.setNotificationRuleFailed,
    licensePlates: state.licensePlateReducer.licensePlates
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNotificationRules: (
      cameraId,
      aiType,
      notificationType,
      page,
      pageSize
    ) =>
      dispatch(
        getNotificationRules(cameraId, aiType, notificationType, page, pageSize)
      ),
    setNotificationRule: (notificationRule, isUpdated) =>
      dispatch(setNotificationRule(notificationRule, isUpdated)),
    deleteNotificationRules: nofiticationRuleIds =>
      dispatch(deleteNotificationRules(nofiticationRuleIds)),
    getAllCameras: keyword => dispatch(getAllCameras(keyword)),
    getAllPeoples: () => dispatch(getPeoples("", PAGE_ONE, PAGE_SIZE_ALL)),
    getAllLicensePlates: () =>
      dispatch(getLicensePlates("", PAGE_ONE, PAGE_SIZE_ALL))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationRulesView);
