import React, { Component } from "react";
import Loader from "react-loader-advanced";
import { Input } from "reactstrap";
import Pagination from "react-js-pagination";
import Select from "react-select";

import NotificationRuleTable from "./NotificationRuleList/notificationRuleTable";
import NotificationRuleForm from "./NotificationRuleDetail/notificationRuleForm";
import ModalConfirm from "../../Commons/modalConfirm";
import {
  PAGE_SIZE,
  PAGE_ONE,
  CUSTOM_REACT_SELECT_STYPE
} from "../../Utils/constant";
import { AiType, NotificationType } from "../../../Enums/index";

class NotificationRules extends Component {
  state = {
    activePage: 1,
    filter: {
      cameraIdSelectedForSearch: { value: "", label: "All camera" },
      aiType: "",
      notificationType: ""
    },

    isEditOrAddNotificationRule: false,
    notificationRuleEdit: null,
    showModalConfirmDeleteNotificationRule: false,
    notificationRulesSelected: []
  };

  componentWillMount() {
    this.props.getNotificationRules("", "", "", PAGE_ONE, PAGE_SIZE);
    this.props.getAllCameras("");
    this.props.getAllPeoples();
    this.props.getAllLicensePlates();
  }

  componentWillReceiveProps(newProps) {
    if (
      this.state.isEditOrAddNotificationRule === true &&
      newProps.setNotificationRuleFailed === false
    ) {
      this.setState({
        isEditOrAddNotificationRule: false,
        notificationRuleEdit: null,
        notificationRulesSelected: []
      });
    }
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
    this.props.getNotificationRules(
      this.state.filter.cameraIdSelectedForSearch.value,
      this.state.filter.aiType,
      this.state.filter.notificationType,
      pageNumber,
      PAGE_SIZE
    );
  };

  // Notification rule
  handleFormNotificationRuleSubmit = notificationRule => {
    let isUpdated;
    if (this.state.notificationRuleEdit) {
      notificationRule.id = this.state.notificationRuleEdit.id;
      isUpdated = true;
    } else {
      notificationRule.id = "";
      isUpdated = false;
    }
    this.props.setNotificationRule(notificationRule, isUpdated);
  };

  // Delete notification rules
  handleNotificationRulesSelectedChange = notificationRulesSelected => {
    this.setState({ notificationRulesSelected: notificationRulesSelected });
  };

  handleCloseModalConfirmDeleteNotificationRule = () => {
    this.setState({ showModalConfirmDeleteNotificationRule: false });
  };

  handleModalConfirmDeleteNotificationRuleOk = () => {
    this.props.deleteNotificationRules(this.state.notificationRulesSelected);
    this.setState({
      showModalConfirmDeleteNotificationRule: false,
      notificationRulesSelected: []
    });
  };

  //Search
  handleCameraSelectChange = cameraOption => {
    this.setState({
      filter: {
        ...this.state.filter,
        cameraIdSelectedForSearch: cameraOption
      }
    });
  };

  handleAiTypeChange = e => {
    this.setState({
      filter: {
        ...this.state.filter,
        aiType: e.target.value
      }
    });
  };

  handleNotificationTypeChange = e => {
    this.setState({
      filter: {
        ...this.state.filter,
        notificationType: e.target.value
      }
    });
  };

  handleSearchNotificationRules = () => {
    this.props.getNotificationRules(
      this.state.filter.cameraIdSelectedForSearch.value,
      this.state.filter.aiType,
      this.state.filter.notificationType,
      PAGE_ONE,
      PAGE_SIZE
    );
  };

  // Update UI
  handeleOpenEditNotificationRuleUI = notificationRuleEdit => {
    this.setState({
      isEditOrAddNotificationRule: true,
      notificationRuleEdit: notificationRuleEdit
    });
  };

  handleOpenAddNotificationRuleUI = () => {
    this.setState({
      isEditOrAddNotificationRule: true,
      notificationRuleEdit: null
    });
  };

  handleCloseAddOrEditUI = () => {
    this.setState({
      isEditOrAddNotificationRule: false,
      notificationRuleEdit: null
    });
  };

  render() {
    let {
      isFetching,
      notificationRules,
      totalPages,
      allCameras,
      people,
      licensePlates
    } = this.props;
    let {
      isEditOrAddNotificationRule,
      notificationRuleEdit,
      notificationRulesSelected,
      cameraIdSelectedForSearch,
      showModalConfirmDeleteNotificationRule,
      activePage
    } = this.state;

    let cameraOptions = [{ value: "", label: "All camera" }];
    if (allCameras) {
      allCameras.forEach(camera => {
        let option = { value: camera.id, label: camera.name };
        cameraOptions.push(option);
      });
    }   

    if (isEditOrAddNotificationRule) {
      if (notificationRuleEdit) {
        return (
          <Loader show={isFetching} message={<div className="loader" />}>
            <NotificationRuleForm
              notificationRuleEdit={notificationRuleEdit}
              onFormNotificationRuleSubmit={
                this.handleFormNotificationRuleSubmit
              }
              people={people}
              licensePlates={licensePlates}
              closeAddOrEditUI={this.handleCloseAddOrEditUI}
            />
          </Loader>
        );
      } else {
        return (
          <Loader show={isFetching} message={<div className="loader" />}>
            <NotificationRuleForm
              onFormNotificationRuleSubmit={
                this.handleFormNotificationRuleSubmit
              }
              allCameras={allCameras}
              people={people}
              licensePlates={licensePlates}
              closeAddOrEditUI={this.handleCloseAddOrEditUI}
            />
          </Loader>
        );
      }
    } else {
      return (
        <div className="component">
          <div className="component-body">
            <div className="row">
              <div className="col-md-4">
                <div className="action-top clearfix">
                  <ul className="clearfix with-search-box">
                    <li>
                      <a
                        onClick={() => {
                          this.handleOpenAddNotificationRuleUI();
                        }}>
                        Add rule
                      </a>
                    </li>
                    <li
                      className={
                        notificationRulesSelected.length > 0 ? "" : "hide"
                      }>
                      <a
                        onClick={() => {
                          this.setState({
                            showModalConfirmDeleteNotificationRule: true
                          });
                        }}>
                        Remove rule(s)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-2">
                <Input
                  type="select"
                  id="aiType"
                  className="form-control select"
                  value={this.state.filter.aiType}
                  onChange={this.handleAiTypeChange}>
                  <option value="">All Ai Type</option>
                  <option value={AiType.HUMAN_TRACKING}>Human tracking</option>
                  <option value={AiType.LICENSE_PLATE}>License plate</option>
                  <option value={AiType.FACE_RECOGNITION}>Face recognition</option>
                </Input>
              </div>
              <div className="col-md-2">
                <Input
                  type="select"
                  id="notificationType"
                  className="form-control select"
                  value={this.state.filter.notificationType}
                  onChange={this.handleNotificationTypeChange}>
                  <option value="">All Notification Type</option>
                  <option value={NotificationType.LIVE_DURATION}>
                    Live duration
                  </option>
                  <option value={NotificationType.APPEARANCE}>
                    Appearance
                  </option>
                </Input>
              </div>
              <div className="col-md-4">
                <div className="input-group search-box">
                  <Select
                    className="select"
                    styles={CUSTOM_REACT_SELECT_STYPE}
                    value={cameraIdSelectedForSearch}
                    options={cameraOptions}
                    onChange={this.handleCameraSelectChange}
                    placeholder="Select camera"
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => {
                        this.handleSearchNotificationRules();
                      }}>
                      <i className="fa fa-search" />
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <Loader show={isFetching} message={<div className="loader" />}>
              <NotificationRuleTable
                notificationRules={notificationRules}
                onEditNotificationRule={this.handeleOpenEditNotificationRuleUI}
                onNotificationRulesSelectedChange={
                  this.handleNotificationRulesSelectedChange
                }
              />
              <ModalConfirm
                show={showModalConfirmDeleteNotificationRule}
                closeModal={this.handleCloseModalConfirmDeleteNotificationRule}
                confirm={this.handleModalConfirmDeleteNotificationRuleOk}
                title={"Confirm"}
                message={"Are you sure you want to delete the selection?"}
              />
              {totalPages > 1 ? (
                <nav>
                  <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={activePage}
                    itemsCountPerPage={PAGE_SIZE}
                    totalItemsCount={totalPages * PAGE_SIZE}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                  />
                </nav>
              ) : (
                ""
              )}
            </Loader>
          </div>
        </div>
      );
    }
  }
}

export default NotificationRules;
