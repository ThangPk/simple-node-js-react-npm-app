import React, { Component } from "react";
import Formsy from "formsy-react";
import { Button, Input } from "reactstrap";
import MyCheckbox from "../../../Commons/checkbox";

class GroupForUser extends Component {
  state = {
    searchKeyWord: "",
    user: this.props.user,
    allGroups: this.props.allGroups
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user, allGroups: nextProps.allGroups });
  }

  handleSearchAllGroupsKeyWordChange = e => {
    this.setState({ searchKeyWord: e.target.value });
    if (e.target.value === "") {
      this.props.onSearchAllGroups("");
    }
  };

  submitAddGroups = data => {
    this.props.onGroupForUserSubmitAddGroups(filterGroupSelected(data));
  };

  submitRemoveGroups = data => {
    this.props.onGroupForUserSubmitRemoveGroups(filterGroupSelected(data));
  };

  render() {
    let { user, allGroups, searchKeyWord } = this.state;
    let groupsSelected, membersOfGroup;

    if (user.groups) {
      membersOfGroup = user.groups.map(group => {
        return <MyCheckbox key={group.id} name={group.id} title={group.name} />;
      });
    }

    if (allGroups) {
      groupsSelected = allGroups
        .filter(group => !user.groupsString.includes(group.name))
        .map(group => {
          return (
            <MyCheckbox key={group.id} name={group.id} title={group.name} />
          );
        });
    }

    return (
      <div className="component">
        <div className="component-body">
          <div className="three-cols-form">
            <div className="first-col col">
              <div className="col-header">
                Assigned groups ({user.userName})
              </div>
              <div className="col-body">
                <Formsy
                  onValidSubmit={this.submitRemoveGroups}
                  onValid={this.enableButton}
                  onInvalid={this.disableButton}
                  ref="removeGroupsForm">
                  {membersOfGroup}
                </Formsy>
              </div>
            </div>
            <div className="second-col">
              <div className="button-container">
                <div
                  className="btn btn-primary"
                  title="Add group"
                  onClick={() => {
                    this.refs.addGroupsForm.submit();
                  }}>
                  <i className="fa fa-arrow-left assign" />
                </div>
                <div
                  className="btn btn-primary"
                  title="Remove group"
                  onClick={() => {
                    this.refs.removeGroupsForm.submit();
                  }}>
                  <i className="fa fa-arrow-right remove" />
                </div>
              </div>
            </div>
            <div className="third-col col">
              <div className="col-header">Available groups</div>
              <div className="col-tools">
                <div className="input-group search-box">
                  <Input
                    type="text"
                    id="searchKeywork"
                    placeholder="Search"
                    onChange={this.handleSearchAllGroupsKeyWordChange}
                    value={searchKeyWord}
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => {
                        this.props.onSearchAllGroups(searchKeyWord);
                      }}>
                      <i className="fa fa-search" />
                    </button>
                  </span>
                </div>
              </div>
              <div className="col-body">
                <Formsy
                  onValidSubmit={this.submitAddGroups}
                  onValid={this.enableButton}
                  onInvalid={this.disableButton}
                  ref="addGroupsForm">
                  {groupsSelected}
                </Formsy>
              </div>
            </div>
          </div>
        </div>
        <div className="component-footer">
          <Button
            color="secondary"
            onClick={() => {
              this.props.closeEditGroupForUserUI();
            }}>
            Back
          </Button>
        </div>
      </div>
    );
  }
}

function filterGroupSelected(data) {
  let groupSelected = [];
  for (let groupId in data) {
    if (data[groupId]) {
      groupSelected.push(groupId);
    }
  }

  return groupSelected;
}

export default GroupForUser;
