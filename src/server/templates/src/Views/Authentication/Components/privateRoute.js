import React from "react";
import { Route, Redirect } from "react-router-dom";
import Loader from "react-loader-advanced";

class PrivateRoute extends React.Component {
  componentDidMount() {
    this.props.authenticate();
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const {
      isFetching,
      isAuthenticated,
      isPasswordRequiredChanged
    } = this.props;
    if (isFetching) {
      return <Loader show={true} message={<div className="loader" />} />;
    } else {
      return (
        <Route
          {...rest}
          render={props => {
            if (isAuthenticated) {
              return <Component {...props} />;
            } else if (isPasswordRequiredChanged) {
              return (
                <Redirect
                  to={{
                    pathname: "/change-password",
                    fromLogin: "true"
                  }}
                />
              );
            } else {
              return (
                <Redirect
                  to={{
                    pathname: "/login"
                  }}
                />
              );
            }
          }}
        />
      );
    }
  }
}

export default PrivateRoute;
