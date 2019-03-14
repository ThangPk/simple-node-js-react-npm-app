import React, { Component } from "react";
import Formsy from "formsy-react";
import { Button } from "reactstrap";

import MyInput from "../../../Commons/inputForm";

class LicensePlateForm extends Component {
  state = { canSubmit: false };

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  submit = licensePlate => {    
    if (this.props.licensePlate) {
      licensePlate.id = this.props.licensePlate.id;
    }
    this.props.onFormLicensePlateSubmit(licensePlate);
  };

  render() {
    const title = this.props.licensePlate
      ? "Update license plate"
      : "New license plate";

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
                name="value"
                title="Value"
                type="text"
                required
                value={
                  this.props.licensePlate
                    ? this.props.licensePlate.value
                    : ""
                }
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

export default LicensePlateForm;
