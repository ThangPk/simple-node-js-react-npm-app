import React, { Component } from "react";
import Formsy from "formsy-react";
import Select from "react-select";

import { Button, Input, FormGroup, Row, Col, Label } from "reactstrap";
import MySelect from "../../../Commons/selectForm";
import MyCheckbox from "../../../Commons/checkbox";
import {
  AiType,
  NotificationType,
  NotificationData
} from "../../../../Enums/index";
import { CUSTOM_REACT_SELECT_STYPE } from "../../../Utils/constant";

class NotificationRuleEditForm extends Component {
  state = {
    canSubmit: false,
    cameraIdSelected: this.props.notificationRuleEdit
      ? this.props.notificationRuleEdit.cameraId
      : null,
    peopleIdsSelected: this.props.notificationRuleEdit
      ? this.props.notificationRuleEdit.notificationData
      : [],
    licensePlateIdsSelected: this.props.notificationRuleEdit
      ? this.props.notificationRuleEdit.notificationData
      : [],
    currentAiType: this.props.notificationRuleEdit
      ? this.props.notificationRuleEdit.aiType
      : AiType.HUMAN_TRACKING,
    currentNotificationType: this.props.notificationRuleEdit
      ? this.props.notificationRuleEdit.notificationType
      : NotificationType.LIVE_DURATION,
    selectAllLicensePlatesApperance: this.props.notificationRuleEdit
      ? this.props.notificationRuleEdit.notificationData === "all"
        ? true
        : false
      : false,
    selectAllPeoplesApperance: this.props.notificationRuleEdit
      ? this.props.notificationRuleEdit.notificationData === "all"
        ? true
        : false
      : false
  };

  isFormValid = (
    cameraIdSelectedFromChange,
    peopleIdsSelectedFromChange,
    licensePlateIdsSelectedFromChange,
    selectAllPeoplesApperanceFromChange,
    selectAllLicensePlatesApperanceFromChange
  ) => {
    let {
      cameraIdSelected,
      peopleIdsSelected,
      licensePlateIdsSelected,
      currentAiType,
      currentNotificationType,
      selectAllPeoplesApperance,
      selectAllLicensePlatesApperance
    } = this.state;

    if (cameraIdSelectedFromChange) {
      cameraIdSelected = cameraIdSelectedFromChange;
    }

    if (peopleIdsSelectedFromChange) {
      peopleIdsSelected = peopleIdsSelectedFromChange;
    }

    if (licensePlateIdsSelectedFromChange) {
      licensePlateIdsSelected = licensePlateIdsSelectedFromChange;
    }

    if (selectAllPeoplesApperanceFromChange !== null) {
      selectAllPeoplesApperance = selectAllPeoplesApperanceFromChange;
    }

    if (selectAllLicensePlatesApperanceFromChange !== null) {
      selectAllLicensePlatesApperance = selectAllLicensePlatesApperanceFromChange;
    }

    let isValid = false;
    if (cameraIdSelected && this.refs.notificationRuleForm.state.isValid) {
      if (
        currentAiType === AiType.FACE_RECOGNITION &&
        currentNotificationType === NotificationType.APPEARANCE
      ) {
        if (peopleIdsSelected.length > 0 || selectAllPeoplesApperance) {
          isValid = true;
        }
      } else if (
        currentAiType === AiType.LICENSE_PLATE &&
        currentNotificationType === NotificationType.APPEARANCE
      ) {
        if (
          licensePlateIdsSelected.length > 0 ||
          selectAllLicensePlatesApperance
        ) {
          isValid = true;
        }
      } else {
        isValid = true;
      }
    }

    if (isValid) {
      this.setState({ canSubmit: true });
    } else {
      this.setState({ canSubmit: false });
    }
  };

  disableSubmitButton = () => {
    this.setState({ canSubmit: false });
  };

  enableSubmitButton = () => {
    this.isFormValid(null, null, null, null, null);
  };

  submit = notificationRule => {
    let {
      cameraIdSelected,
      peopleIdsSelected,
      licensePlateIdsSelected,
      selectAllPeoplesApperance,
      selectAllLicensePlatesApperance
    } = this.state;
    if (cameraIdSelected) {
      notificationRule.cameraId = cameraIdSelected;
      if (
        notificationRule.notificationType === NotificationType.LIVE_DURATION
      ) {
        notificationRule.notificationData = {
          duration: notificationRule.notificationData
        };
      } else {
        if (notificationRule.aiType === AiType.LICENSE_PLATE) {
          if (selectAllLicensePlatesApperance) {
            notificationRule.notificationData = {
              "license-plate": "all"
            };
          } else {
            notificationRule.notificationData = {
              "license-plate": licensePlateIdsSelected
            };
          }
        } else {
          if (selectAllPeoplesApperance) {
            notificationRule.notificationData = { known_ids: "all" };
          } else {
            notificationRule.notificationData = {
              known_ids: peopleIdsSelected
            };
          }
        }
      }

      this.props.onFormNotificationRuleSubmit(notificationRule);
    }
  };

  handleSelectAllLicensePlatesApperance = e => {
    let isChecked = e.target.checked;
    this.setState({ selectAllLicensePlatesApperance: isChecked });
    this.isFormValid(null, null, null, null, isChecked);
  };

  handleselectAllPeoplesApperance = e => {
    let isChecked = e.target.checked;
    this.setState({ selectAllPeoplesApperance: isChecked });
    this.isFormValid(null, null, null, isChecked, null);
  };

  handleCameraSelectChange = cameraOption => {
    let cameraIdSelected = cameraOption.value;
    this.setState({ cameraIdSelected: cameraIdSelected });

    this.isFormValid(cameraIdSelected, null, null, null, null);
  };

  handlePeopleSelectChange = peoplesOption => {
    let peopleIdsSelected = [];
    peoplesOption.forEach(peopleOption => {
      peopleIdsSelected.push(peopleOption.value);
    });
    this.setState({ peopleIdsSelected: peopleIdsSelected });

    this.isFormValid(null, peopleIdsSelected, null, null, null);
  };

  handleLicensePlateSelectChange = licensePlateOptions => {
    let licensePlateIdsSelected = [];
    licensePlateOptions.forEach(licensePlateOption => {
      licensePlateIdsSelected.push(licensePlateOption.value);
    });
    this.setState({ licensePlateIdsSelected: licensePlateIdsSelected });

    this.isFormValid(null, null, licensePlateIdsSelected, null, null);
  };

  handleAiTypeChange = aiType => {
    this.setState({
      currentAiType: aiType,
      currentNotificationType: NotificationType.LIVE_DURATION
    });

    this.isFormValid(null, null, null, null, null);
  };

  handleNotificationTypeChange = notificationType => {
    this.setState({
      currentNotificationType: notificationType
    });

    this.isFormValid(null, null, null, null, null);
  };

  render() {
    let {
      notificationRuleEdit,
      allCameras,
      people,
      licensePlates
    } = this.props;
    let {
      currentAiType,
      currentNotificationType,
      selectAllLicensePlatesApperance,
      selectAllPeoplesApperance
    } = this.state;

    let cameraOptions = [];
    if (allCameras) {
      allCameras.forEach(camera => {
        let option = { value: camera.id, label: camera.name };
        cameraOptions.push(option);
      });
    }

    let peopleOptions = [];
    let peopeleOptionOfNotificationRuleEdit = [];
    if (people) {
      people.forEach(person => {
        let option = {
          value: person.id,
          label: person.firstName + " " + person.lastName
        };

        if (
          notificationRuleEdit &&
          notificationRuleEdit.aiType === AiType.FACE_RECOGNITION &&
          notificationRuleEdit.notificationType ===
            NotificationType.APPEARANCE &&
          notificationRuleEdit.notificationData.includes(person.id)
        ) {
          peopeleOptionOfNotificationRuleEdit.push(option);
        }
        peopleOptions.push(option);
      });
    }

    let licensePlateOptions = [];
    let licensePlateOptionOfNotificationRuleEdit = [];
    if (licensePlates) {
      licensePlates.forEach(licensePlate => {
        let option = {
          value: licensePlate.id,
          label: licensePlate.value
        };

        if (
          notificationRuleEdit &&
          notificationRuleEdit.aiType === AiType.LICENSE_PLATE &&
          notificationRuleEdit.notificationType ===
            NotificationType.APPEARANCE &&
          notificationRuleEdit.notificationData.includes(licensePlate.id)
        ) {
          licensePlateOptionOfNotificationRuleEdit.push(option);
        }
        licensePlateOptions.push(option);
      });
    }

    const title = notificationRuleEdit
      ? "Update notification rule (" + notificationRuleEdit.cameraName + ")"
      : "New notification rule";

    let notificationTypeOptions = [];
    notificationTypeOptions.push({
      title: "Live duration",
      value: NotificationType.LIVE_DURATION
    });
    if (
      currentAiType === AiType.LICENSE_PLATE ||
      currentAiType === AiType.FACE_RECOGNITION
    ) {
      notificationTypeOptions.push({
        title: "Appearance",
        value: NotificationType.APPEARANCE
      });
    }

    return (
      <div className="component">
        <div className="component-header">{title}</div>
        <div className="component-body">
          <Formsy
            onValidSubmit={this.submit}
            onValid={this.enableSubmitButton}
            onInvalid={this.disableSubmitButton}
            ref="notificationRuleForm"
            className="form">
            <div className="form-body">
              <FormGroup className={notificationRuleEdit ? "hide" : ""}>
                <Label htmlFor="camera">Select cameras*</Label>
                <Select
                  options={cameraOptions}
                  styles={CUSTOM_REACT_SELECT_STYPE}
                  onChange={this.handleCameraSelectChange}
                  placeholder="Select camera"
                />
              </FormGroup>
              <MySelect
                name="aiType"
                title="Ai type*"
                options={[
                  { title: "Human tracking", value: AiType.HUMAN_TRACKING },
                  { title: "License plate", value: AiType.LICENSE_PLATE },
                  { title: "Face recognition", value: AiType.FACE_RECOGNITION }
                ]}
                value={currentAiType}
                onChange={this.handleAiTypeChange}
              />
              <MySelect
                name="notificationType"
                title="Notification type*"
                options={notificationTypeOptions}
                value={currentNotificationType}
                onChange={this.handleNotificationTypeChange}
              />
              {currentNotificationType === NotificationType.LIVE_DURATION ? (
                <MySelect
                  name="notificationData"
                  title="In seconds"
                  required
                  options={[
                    {
                      title: "5",
                      value: NotificationData.DURATION_5
                    },
                    {
                      title: "10",
                      value: NotificationData.DURATION_10
                    },
                    {
                      title: "15",
                      value: NotificationData.DURATION_15
                    },
                    {
                      title: "20",
                      value: NotificationData.DURATION_20
                    },
                    {
                      title: "25",
                      value: NotificationData.DURATION_25
                    },
                    {
                      title: "30",
                      value: NotificationData.DURATION_30
                    }
                  ]}
                  value={
                    notificationRuleEdit
                      ? notificationRuleEdit.notificationType ===
                        NotificationType.LIVE_DURATION
                        ? notificationRuleEdit.notificationData
                        : NotificationData.DURATION_5
                      : NotificationData.DURATION_5
                  }
                />
              ) : currentAiType === AiType.LICENSE_PLATE ? (
                <div className="form-group">
                  <Label>License plates*</Label>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={this.handleSelectAllLicensePlatesApperance}
                        checked={selectAllLicensePlatesApperance}                        
                      />{" "}
                      All
                    </Label>
                  </FormGroup>
                  <div className="row">
                    <div className="col-md-6">
                      <Select
                        ref="selectLicensePlate"
                        options={licensePlateOptions}
                        onChange={this.handleLicensePlateSelectChange}
                        placeholder="Select license plate"
                        defaultValue={licensePlateOptionOfNotificationRuleEdit}
                        isMulti={true}
                        closeMenuOnSelect={false}
                        isDisabled={selectAllLicensePlatesApperance}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <Label>Faces*</Label>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={this.handleselectAllPeoplesApperance}
                        checked={selectAllPeoplesApperance}
                      />{" "}
                      All
                    </Label>
                  </FormGroup>
                  <div className="row">
                    <div className="col-md-6">
                      <Select
                        ref="selectPeople"
                        options={peopleOptions}
                        onChange={this.handlePeopleSelectChange}
                        placeholder="Select people"
                        defaultValue={peopeleOptionOfNotificationRuleEdit}
                        isMulti={true}
                        closeMenuOnSelect={false}
                        isDisabled={selectAllPeoplesApperance}
                      />
                    </div>
                  </div>
                </div>
              )}
              <Row>
                <div className="col-md-4">
                  <MyCheckbox
                    name="sendInApp"
                    title="Send in app"
                    value={
                      notificationRuleEdit
                        ? notificationRuleEdit.sendInApp
                        : false
                    }
                  />
                </div>
                <div className="col-md-8 invisible">
                  <Row>
                    <Col>
                      <MyCheckbox
                        name="sendSms"
                        title="Send sms"
                        value={
                          notificationRuleEdit
                            ? notificationRuleEdit.sendSms
                            : false
                        }
                      />
                    </Col>
                    <Col>
                      <MyCheckbox
                        name="sendEmail"
                        title="Send email"
                        value={
                          notificationRuleEdit
                            ? notificationRuleEdit.sendEmail
                            : false
                        }
                      />
                    </Col>
                  </Row>
                </div>
              </Row>
            </div>
            <div className="form-footer">
              <Button
                type="submit"
                color="primary"
                disabled={!this.state.canSubmit}>
                Save
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  this.props.closeAddOrEditUI();
                }}>
                Cancel
              </Button>
            </div>
          </Formsy>
        </div>
      </div>
    );
  }
}

export default NotificationRuleEditForm;
