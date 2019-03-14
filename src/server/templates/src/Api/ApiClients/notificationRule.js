import Api from "../api";
import BaseApi from "./baseApi";

class NotificationRule extends BaseApi {
  /**
   * 1. Get notification rules
   */  
  static getNotificationRules(
    cameraId,
    aiType,
    notificationType,
    page,
    pageSize,
    callback
  ) {
    let apiPath = "api/1.0/notification_rules/get";
    try {
      let params = {
        camera_id: cameraId,
        ai_type: aiType,
        notification_type: notificationType,
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
   * 2. Set notification rule
   */ 
  static setNotificationRule(notificationRule, callback) {
    let apiPath = "api/1.0/notification_rules/set";
    try {
      let params = {
        id: notificationRule.id ? notificationRule.id : "",
        camera_id: notificationRule.cameraId,
        ai_type: notificationRule.aiType,
        notification_type: notificationRule.notificationType,
        notification_data: notificationRule.notificationData,
        send_in_app: notificationRule.sendInApp,
        send_sms: notificationRule.sendSms,
        send_email: notificationRule.sendEmail
      };

      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
  
   /**
   * 3. Remove notification rule
   */ 
  static deleteNotificationRules(notificationRuleIds, callback) {
    let apiPath = "api/1.0/notification_rules/remove";
    try {
      let params = {
        notification_rule_ids: notificationRuleIds
      };
      Api.post(apiPath, params, results => {
        callback(super.returnValue(apiPath, results));
      });
    } catch (error) {
      callback(super.catchError(error));
    }
  }
}

export default NotificationRule;

