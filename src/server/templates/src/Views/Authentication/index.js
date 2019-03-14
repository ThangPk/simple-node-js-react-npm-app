import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "./Components/privateRoute";

import LoginView from "../Login/index";
import DefaultLayout from "../../DefaultLayout";
import ChangePassword from "../ChangePassword/index";

import { authenticate } from "./reducer";

const App = ({
  isFetching,
  isAuthenticated,
  isPasswordRequiredChanged,
  authenticate
}) => (
  <Router>
    <Switch>
      <Route exact path="/login" name="Login Page" component={LoginView} />
      <Route
        exact
        path="/change-password"
        name="Change Password Page"
        component={ChangePassword}
      />
      <Switch>
        <PrivateRoute
          exact
          path="/"
          name="Home"
          component={DefaultLayout}
          isFetching={isFetching}
          isAuthenticated={isAuthenticated}
          isPasswordRequiredChanged={isPasswordRequiredChanged}
          authenticate={authenticate}
        />
        <PrivateRoute
          exact
          path="/dashboards"
          name="Dashboards"
          component={DefaultLayout}
          isFetching={isFetching}
          isAuthenticated={isAuthenticated}
          isPasswordRequiredChanged={isPasswordRequiredChanged}
          authenticate={authenticate}
        />
        <PrivateRoute
          exact
          path="/users"
          name="Users"
          component={DefaultLayout}
          isFetching={isFetching}
          isAuthenticated={isAuthenticated}
          isPasswordRequiredChanged={isPasswordRequiredChanged}
          authenticate={authenticate}
        />
        <PrivateRoute
          exact
          path="/groups"
          name="Groups"
          component={DefaultLayout}
          isAuthenticated={isAuthenticated}
          isFetching={isFetching}
          isPasswordRequiredChanged={isPasswordRequiredChanged}
          authenticate={authenticate}
        />
        <PrivateRoute
          exact
          path="/cameras"
          name="Cameras"
          component={DefaultLayout}
          isAuthenticated={isAuthenticated}
          isFetching={isFetching}
          isPasswordRequiredChanged={isPasswordRequiredChanged}
          authenticate={authenticate}
        />
        <PrivateRoute
          exact
          path="/camera/:id/extract-video"
          name="Extract video from camera"
          component={DefaultLayout}
          isAuthenticated={isAuthenticated}
          isFetching={isFetching}
          isPasswordRequiredChanged={isPasswordRequiredChanged}
          authenticate={authenticate}
        />
        <PrivateRoute
          exact
          path="/camera-category"
          name="Camera Category"
          component={DefaultLayout}
          isAuthenticated={isAuthenticated}
          isFetching={isFetching}
          isPasswordRequiredChanged={isPasswordRequiredChanged}
          authenticate={authenticate}
        />
        <PrivateRoute
          exact
          path="/camera-permissions"
          name="Camera Permission"
          component={DefaultLayout}
          isAuthenticated={isAuthenticated}
          isFetching={isFetching}
          isPasswordRequiredChanged={isPasswordRequiredChanged}
          authenticate={authenticate}
        />
        <PrivateRoute
          exact
          path="/servers"
          name="Servers"
          component={DefaultLayout}
          isAuthenticated={isAuthenticated}
          isFetching={isFetching}
          isPasswordRequiredChanged={isPasswordRequiredChanged}
          authenticate={authenticate}
        />
        <PrivateRoute
          exact
          path="/map"
          name="Map"
          component={DefaultLayout}
          isAuthenticated={isAuthenticated}
          isFetching={isFetching}
          isPasswordRequiredChanged={isPasswordRequiredChanged}
          authenticate={authenticate}
        />
        <PrivateRoute
          exact
          path="/faces"
          name="Peoples"
          component={DefaultLayout}
          isAuthenticated={isAuthenticated}
          isFetching={isFetching}
          isPasswordRequiredChanged={isPasswordRequiredChanged}
          authenticate={authenticate}
        />
        <PrivateRoute
          exact
          path="/license-plates"
          name="License Plates"
          component={DefaultLayout}
          isAuthenticated={isAuthenticated}
          isFetching={isFetching}
          isPasswordRequiredChanged={isPasswordRequiredChanged}
          authenticate={authenticate}
        />
        <PrivateRoute
          exact
          path="/notification-rules"
          name="Notification Rules"
          component={DefaultLayout}
          isAuthenticated={isAuthenticated}
          isFetching={isFetching}
          isPasswordRequiredChanged={isPasswordRequiredChanged}
          authenticate={authenticate}
        />
      </Switch>
    </Switch>
  </Router>
);

const mapStateToProps = state => {
  return {
    isFetching: state.authenticateReducer.isFetching,
    isAuthenticated: state.authenticateReducer.isAuthenticated,
    isPasswordRequiredChanged:
      state.authenticateReducer.isPasswordRequiredChanged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: () => dispatch(authenticate())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
