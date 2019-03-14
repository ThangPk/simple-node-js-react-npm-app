import React from "react";
import { propTypes, withFormsy } from "formsy-react";
import { FormGroup, Input, Label } from "reactstrap";

class MyCheckbox extends React.Component {
  state = {
    value: true
  };

  changeValue = event => {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    this.props.setValue(event.target.checked);
    if(this.props.onChange) {
      this.props.onChange(event.target.checked);
    }    
  };

  render() {
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const value = this.props.getValue() || false;
    return (
      <FormGroup check className="checkbox form-group">
        <Input
          className="form-check-input"
          onChange={this.changeValue}
          id={this.props.name}
          type="checkbox"
          checked={value}
          data-checked={value}
        />
        <Label check className="form-check-label" htmlFor={this.props.name}>
          {this.props.title}
        </Label>
      </FormGroup>
    );
  }
}

MyCheckbox.propTypes = {
  ...propTypes
};

export default withFormsy(MyCheckbox);
