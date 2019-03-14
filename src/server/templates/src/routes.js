import React from "react";
import Loadable from "react-loadable";

function Loading() {
  return <div>Loading...</div>;
}

const Users = Loadable({
  loader: () => import("./Views/Users"),
  loading: Loading
});

const Groups = Loadable({
  loader: () => import("./Views/Groups"),
  loading: Loading
});

const Cameras = Loadable({
  loader: () => import("./Views/Cameras"),
  loading: Loading
});

const ExtractVideoCamera = Loadable({
  loader: () => import("./Views/CameraExtractVideo"),
  loading: Loading
});

const CameraCategory = Loadable({
  loader: () => import("./Views/CameraCategory"),
  loading: Loading
});

const CameraPermissions = Loadable({
  loader: () => import("./Views/CameraPermissions"),
  loading: Loading
});

const Dashboards = Loadable({
  loader: () => import("./Views/Dashboards"),
  loading: Loading
});

const Servers = Loadable({
  loader: () => import("./Views/Servers"),
  loading: Loading
});

const Map = Loadable({
  loader: () => import("./Views/Map"),
  loading: Loading
});

const Peoples = Loadable({
  loader: () => import("./Views/Peoples"),
  loading: Loading
});

const LicensePlates = Loadable({
  loader: () => import("./Views/LicensePlates"),
  loading: Loading
});

const NotificationRules = Loadable({
  loader: () => import("./Views/NotificationRules"),
  loading: Loading
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home", component: Dashboards },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/groups", exact: true, name: "User groups", component: Groups },
  { path: "/cameras", exact: true, name: "Cameras", component: Cameras },
  {
    path: "/camera/:id/extract-video",
    exact: true,
    name: "Extract video camera",
    component: ExtractVideoCamera
  },
  {
    path: "/camera-category",
    exact: true,
    name: "Camera categories",
    component: CameraCategory
  },
  {
    path: "/camera-permissions",
    exact: true,
    name: "Camera permissions",
    component: CameraPermissions
  },
  { path: "/servers", exact: true, name: "Servers", component: Servers },
  { path: "/map", exact: true, name: "Map", component: Map },
  { path: "/faces", exact: true, name: "Faces", component: Peoples },
  {
    path: "/license-plates",
    exact: true,
    name: "License plates",
    component: LicensePlates
  },
  {
    path: "/notification-rules",
    exact: true,
    name: "Notification rules",
    component: NotificationRules
  }
];

export default routes;
