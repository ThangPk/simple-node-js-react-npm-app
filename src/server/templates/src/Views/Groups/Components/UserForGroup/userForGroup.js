import React, { Component } from "react";
import Formsy from "formsy-react";
import { Button, Input } from "reactstrap";

import MyCheckbox from "../../../Commons/checkbox";

class UserForGroup extends Component {
  state = {
    searchKeyWord: "",
    group: this.props.group,
    allUsers: this.props.allUsers
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ group: nextProps.group, allUsers: nextProps.allUsers });
  }

  handleSearchAllUsersKeyWordChange = e => {
    this.setState({ searchKeyWord: e.target.value });
    if (e.target.value === "") {
      this.props.onSearchAllUsers("");
    }
  };

  submitRemoveUsers = data => {
    this.props.onUserForGroupSubmitRemoveUsers(filterUserSelected(data));
  };

  submitAddUsers = data => {
    this.props.onUserForGroupSubmitAddUsers(filterUserSelected(data));
  };

  render() {
    let { allUsers, group, searchKeyWord } = this.state;
    let members, usersSelected;

    if (group.users) {
      members = group.users.map(user => (
        <MyCheckbox key={user.id} name={user.id} title={user.user_name} />
      ));
    }

    if (allUsers) {
      usersSelected = allUsers
        .filter(user => !group.usersString.includes(user.userName))
        .map(user => {
          return (
            <MyCheckbox key={user.id} name={user.id} title={user.userName} />
          );
        });
    }

    return (
      <div className="component">
        <div className="component-body">
          <div className="three-cols-form">
            <div className="first-col col">
              <div className="col-header">Assigned users ({group.name})</div>
              <div className="col-body">
                <Formsy
                  onValidSubmit={this.submitRemoveUsers}
                  onValid={this.enableButton}
                  onInvalid={this.disableButton}
                  ref="removeUsersForm">
                  {members}
                </Formsy>
              </div>
            </div>
            <div className="second-col">
              <div className="button-container">
                <div
                  className="btn btn-primary"
                  title="Add group"
                  onClick={() => {
                    this.refs.addUsersForm.submit();
                  }}>
                  <i className="fa fa-arrow-left assign" />
                </div>
                <div
                  className="btn btn-primary"
                  title="Remove group"
                  onClick={() => {
                    this.refs.removeUsersForm.submit();
                  }}>
                  <i className="fa fa-arrow-right remove" />
                </div>
              </div>
            </div>
            <div className="third-col col">
              <div className="col-header">Available users</div>
              <div className="col-tools">
                <div className="input-group search-box">
                  <Input
                    type="text"
                    id="searchKeywork"
                    placeholder="Search"
                    onChange={this.handleSearchAllUsersKeyWordChange}
                    value={searchKeyWord}
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => {
                        this.props.onSearchAllUsers(searchKeyWord);
                      }}>
                      <i className="fa fa-search" />
                    </button>
                  </span>
                </div>
              </div>
              <div className="col-body">
                <Formsy
                  onValidSubmit={this.submitAddUsers}
                  onValid={this.enableButton}
                  onInvalid={this.disableButton}
                  ref="addUsersForm">
                  {usersSelected}
                </Formsy>
              </div>
            </div>
          </div>
        </div>
        <div className="component-footer">
          <Button
            color="secondary"
            onClick={() => {
              this.props.closeEditUserForGroupUI();
            }}>
            Back
          </Button>
        </div>
      </div>
    );
  }
}

function filterUserSelected(data) {
  let userSelected = [];
  for (let userId in data) {
    if (data[userId]) {
      userSelected.push(userId);
    }
  }

  return userSelected;
}

export default UserForGroup;
