import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MyInput from "../../Views/Commons/inputForm";
import Formsy from "formsy-react";

class ModalRemoveServerConfirm extends Component {
  state = { canSubmit: false };

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  submit = object => {
    this.props.confirm(object.value);
  };

  render() {
    return (
      <Modal isOpen={this.props.show} toggle={this.props.closeModal}>
        <Formsy
          onValidSubmit={this.submit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}>
          <ModalHeader toggle={this.props.closeModal}>
            {this.props.title}
          </ModalHeader>
          <ModalBody>
            {this.props.message}
            <MyInput              
              name="ipAddress"
              type="text"
              validations={{
                validate: (values, value) => {
                  if (value === this.props.ipServerAddress) {
                    return true;
                  }

                  return false;
                }
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              disabled={!this.state.canSubmit}>
              Ok
            </Button>
            <Button color="secondary" onClick={this.props.closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Formsy>
      </Modal>
    );
  }
}

export default ModalRemoveServerConfirm;
