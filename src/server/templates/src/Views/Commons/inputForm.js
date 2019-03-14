// MyInput.js
import { withFormsy } from "formsy-react";
import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

class MyInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    // An error message is returned only if the component is invalid
    const errorMessage = this.props.getErrorMessage();

    return (
      <FormGroup>
        <Label htmlFor="name">{this.props.title}</Label>
        <span>
          {this.props.label} {this.props.isRequired() ? "*" : null}
        </span>
        <Input
          onChange={this.changeValue}
          type={this.props.type}
          value={this.props.getValue() || ""}
        />
        <span>{errorMessage}</span>
      </FormGroup>
    );
  }
}

export default withFormsy(MyInput);
