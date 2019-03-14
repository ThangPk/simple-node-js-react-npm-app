import React, { Component } from "react";
import { DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { AppHeaderDropdown } from "@coreui/react";
import { withRouter } from "react-router-dom";

class DefaultHeader extends Component {
  handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  handleChangePassword = () => {
    this.props.history.push("/change-password");
  };

  render() {
    return (
      <div className="main-app-header row">
        <img className="homa-logo" alt="" />
        <AppHeaderDropdown direction="down">
          <div className="user-avatar">
            <DropdownToggle nav>
              <i className="fa fa-user fa-2x" />
            </DropdownToggle>
          </div>

          <DropdownMenu right style={{ right: "auto" }}>
            <DropdownItem header className="text-center">
              <strong>{localStorage.getItem("USER_NAME")}</strong>
            </DropdownItem>
            <DropdownItem onClick={this.handleChangePassword}>
              <i className="fa fa-key" /> Change password
            </DropdownItem>
            <DropdownItem onClick={this.handleLogout}>
              <i className="fa fa-lock" /> Logout
            </DropdownItem>
          </DropdownMenu>
        </AppHeaderDropdown>
      </div>
    );
  }
}

export default withRouter(DefaultHeader);
