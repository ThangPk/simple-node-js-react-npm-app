import React from "react";
import store from "./Store/store";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

// import style
import "font-awesome/css/font-awesome.min.css"; // Import Font Awesome Icons Set
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Assets/Scss/style.css";
import App from "./Views/Authentication";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
