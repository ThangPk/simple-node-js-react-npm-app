let NotificationRule = notificationRuleJSON => {
  let notificationRule = {
    id: notificationRuleJSON.id,
    cameraId: notificationRuleJSON.camera_id,
    cameraName: notificationRuleJSON.camera_name,
    aiType: notificationRuleJSON.ai_type,
    aiTypeText:
      notificationRuleJSON.ai_type === "human-tracking"
        ? "Human tracking"
        : notificationRuleJSON.ai_type === "license-plate"
        ? "License plate"
        : "Fae recognition",
    notificationType: notificationRuleJSON.notification_type,
    notificationTypeText:
      notificationRuleJSON.notification_type === "live-duration"
        ? "Live duration"
        : "Appearance",
    notificationData: getNotificationData(notificationRuleJSON),
    notificationDataText: getNotificationDataText(notificationRuleJSON),
    sendInApp: notificationRuleJSON.send_in_app,
    sendSms: notificationRuleJSON.send_sms,
    sendEmail: notificationRuleJSON.send_email
  };

  return notificationRule;
};

function getNotificationDataText(notificationRuleJSON) {
  if (
    notificationRuleJSON.ai_type === "face-recognition" &&
    notificationRuleJSON.notification_type === "appearance"
  ) {
    if (notificationRuleJSON.notification_data["known_ids"] == "all") {
      return "All";
    }
    return JSON.stringify(notificationRuleJSON.peoples);
  }

  if (
    notificationRuleJSON.ai_type === "license-plate" &&
    notificationRuleJSON.notification_type === "appearance"
  ) {
    if (notificationRuleJSON.notification_data["license-plate"] == "all") {
      return "All";
    }
    return JSON.stringify(notificationRuleJSON.license_plates);
  }

  return getNotificationData(notificationRuleJSON);
}

function getNotificationData(notificationRuleJSON) {
  return notificationRuleJSON.notification_type === "live-duration"
    ? notificationRuleJSON.notification_data.duration
    : notificationRuleJSON.ai_type === "license-plate"
    ? notificationRuleJSON.notification_data["license-plate"]
    : notificationRuleJSON.notification_data.known_ids;
}

export default NotificationRule;
