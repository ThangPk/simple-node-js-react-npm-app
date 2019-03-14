import { withFormsy } from "formsy-react";
import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

class MySelect extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
    if(this.props.onChange) {
      this.props.onChange(event.currentTarget.value);
    }
  }

  render() {
    const options = this.props.options.map((option, i) => (
      <option key={option.title + option.value} value={option.value}>
        {option.title}
      </option>
    ));

    return (
      <FormGroup>
        <Label htmlFor="name">{this.props.title}</Label>
        <span>{this.props.isRequired() ? "*" : null}</span>
        <div className="select">
          <Input
            type="select"
            name={this.props.name}
            className="form-control"
            onChange={this.changeValue}
            value={this.props.getValue()}>
            {options}
          </Input>
        </div>
      </FormGroup>
    );
  }
}

export default withFormsy(MySelect);
