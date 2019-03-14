import React, { Component } from "react";
import { Button } from "reactstrap";
import Loader from "react-loader-advanced";
import { Redirect } from "react-router-dom";
import Formsy from "formsy-react";

import MyInput from "../../Commons/inputForm";
import Modal from "../../Commons/modal";

class LoginView extends Component {
  state = { canSubmit: false, showModal: false };

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  submit = data => {
    this.setState({ showModal: true });
    this.props.login(data.userName, data.password);
  };

  render() {
    let { isFetching, isLoginSuccess, hasError, errorMessage } = this.props;
    
    if (isLoginSuccess) {
      return <Redirect to={{ pathname: "/" }} />;
    } else {
      return (
        <div className="login-page">
          {hasError &&
            !isLoginSuccess && (
              <Modal
                show={this.state.showModal}
                closeModal={() => this.setState({ showModal: false })}
                title={"Error"}
                message={errorMessage}
              />
            )}
          <Formsy
            onValidSubmit={this.submit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            className="login-content">
            <div className="login-header">
              <img className="homa-logo" alt="" />
            </div>
            <Loader show={isFetching} message={<div className="loader" />}>
              <div className="login-body">
                <MyInput
                  name="userName"
                  title="User name"
                  type="text"
                  required
                />
                <MyInput
                  name="password"
                  title="Password"
                  type="password"
                  required
                />
                <Button
                  color="primary"
                  className="px-4"
                  disabled={!this.state.canSubmit}>
                  Login
                </Button>
              </div>
            </Loader>
          </Formsy>
        </div>
      );
    }
  }
}

export default LoginView;
