import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { AppBreadcrumb } from "@coreui/react";
import Notifications, { notify } from "react-notify-toast";

// routes config
import routes from "../routes";
import DefaultHeader from "./DefaultHeader";
import { resetMessage } from "../Store/errorMessageReducer";

class DefaultLayout extends Component {
  resetMessage = () => {
    this.props.resetMessage();
    if (this.props.errorMessage === "Your session is expired") {
      window.localStorage.clear();
      window.location.reload();
    }
  };

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }
    this.showToastMessage(errorMessage, "error");
    this.props.resetMessage();
  }

  renderInfoMessage() {
    const { infoMessage } = this.props;    
    if (!infoMessage) {
      return null;
    }
    this.showToastMessage(infoMessage, "success");
    this.props.resetMessage();
  }

  showToastMessage = (message, type) => {
    let color = { background: "#0E1717", text: "#FFFFFF" };
    if (type === "error") {
      color = { background: "red", text: "#FFFFFF" };
    }

    notify.show(message, type, 4000, color);
  };

  render() {
    return (
      <div className="main-app container-fluid">
        {this.renderErrorMessage()}
        {this.renderInfoMessage()}
        <DefaultHeader />
        <div className="vms-body row">
          <AppBreadcrumb className="break-crumb" appRoutes={routes} />
          <div className="body container-fluid">
            <Notifications />
            <Switch>
              {routes.map((route, idx) => {
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                      <route.component
                        {...props}
                        showToastMessage={this.showToastMessage}
                      />
                    )}
                  />
                ) : null;
              })}
              <Redirect from="/" to="/dashboards" />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.errorMessageReducer.errorMessage,
    infoMessage: state.errorMessageReducer.infoMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetMessage: () => dispatch(resetMessage())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout);
