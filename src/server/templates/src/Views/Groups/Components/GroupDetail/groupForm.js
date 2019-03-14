import React, { Component } from "react";
import Formsy from "formsy-react";
import { Button } from "reactstrap";

import MyInput from "../../../Commons/inputForm";

class GroupForm extends Component {
  state = { canSubmit: false };

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  submit = group => {
    if (this.props.id) {
      group.id = this.props.id;
    }
    this.props.onFormGroupSubmit(group);
  };

  render() {
    const title = this.props.id ? "Update group" : "New group";
    
    return (
      <div className="component">
        <div className="component-header">{title}</div>
        <div className="component-body">
          <Formsy
            onValidSubmit={this.submit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            className="form">
            <div className="form-body">
              <MyInput
                name="groupName"
                title="Group name"
                type="text"
                required
                value={this.props.groupName}
              />
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

export default GroupForm;
