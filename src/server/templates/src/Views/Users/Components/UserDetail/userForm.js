import React, { Component } from "react";
import Formsy from "formsy-react";
import { Button } from "reactstrap";
import MyInput from "../../../Commons/inputForm";
import MyCheckbox from "../../../Commons/checkbox";

class UserForm extends Component {
  state = { canSubmit: false };

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  submit = user => {
    if (this.props.user) {
      user.id = this.props.user.id;
    }
    this.props.onFormUserSubmit(user);
  };

  render() {
    let user = this.props.user;
    const title = user ? "Update user: " + user.userName : "New user";

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
              {!user && (
                <MyInput
                  name="userName"
                  title="User name"
                  type="text"
                  required={user ? false : true}
                  value={user ? user.userName : ""}
                />
              )}
              {!user && (
                <MyInput
                  name="password"
                  title="Password"
                  type="password"
                  validationError="This field is required"
                  required={user ? false : true}
                />
              )}
              <MyInput
                name="firstName"
                title="First name"
                type="text"
                required
                value={user ? user.firstName : ""}
              />
              <MyInput
                name="lastName"
                title="Last name"
                type="text"
                required
                value={user ? user.lastName : ""}
              />
              <MyInput
                name="email"
                title="Email"
                type="text"
                validations="isEmail"
                validationError="This is not a valid email"
                required
                value={user ? user.email : ""}
              />
              <MyInput
                name="phoneNumber"
                title="Phone number"
                type="text"
                validations="isNumeric"
                validationError="This is not a valid number"
                required
                value={user ? user.phoneNumber : ""}
              />
              <MyCheckbox
                name="isAdmin"
                title="Is admin"
                value={user ? user.isAdmin : false}
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

export default UserForm;
