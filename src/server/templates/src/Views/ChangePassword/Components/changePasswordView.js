import React, { Component } from "react";
import Formsy from "formsy-react";
import { Button } from "reactstrap";
import Loader from "react-loader-advanced";
import { Redirect } from "react-router-dom";

import MyInput from "../../Commons/inputForm";
import Modal from "../../Commons/modal";

class ChangePassword extends Component {
  state = { canSubmit: false, showModal: true };

  componentWillUnmount() {
    this.props.resetState();
  }

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  submit = data => {
    this.setState({ showModal: true });
    this.props.changePassword(data.oldPassword, data.newPassword);
  };

  render() {
    let {
      isFetching,
      isChangePasswordSuccess,
      hasError,
      errorMessage
    } = this.props;

    let { showModal, canSubmit } = this.state;

    return (
      <div className="login-page">
        {isChangePasswordSuccess && (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )}
        {hasError && !isChangePasswordSuccess && (
          <Modal
            show={showModal}
            closeModal={() => this.setState({ showModal: false })}
            title={"Confirm"}
            message={errorMessage}
          />
        )}
        <Formsy
          onValidSubmit={this.submit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          className="login-content">
          <div className="login-header">
            <img className="homa-logo" alt="Logo" />
          </div>
          <Loader show={isFetching} message={<div className="loader" />}>
            <div className="login-body">
              <MyInput
                name="oldPassword"
                title="Old password"
                type="password"
                required
              />
              <MyInput
                name="newPassword"
                title="New password"
                type="password"
                required
              />
              <Button type="submit" color="primary" disabled={!canSubmit}>
                Change password
              </Button>
              <Button
                className={this.props.location.fromLogin ? "hide" : ""}
                type="submit"
                color="secondary"
                onClick={() => {
                  this.props.history.goBack();
                }}>
                Cancel
              </Button>
            </div>
          </Loader>
        </Formsy>
      </div>
    );
  }
}

export default ChangePassword;
