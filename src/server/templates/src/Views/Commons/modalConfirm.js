import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class ModalConfirm extends Component {
  render() {
    return (
      <Modal isOpen={this.props.show} toggle={this.props.closeModal}>
        <ModalHeader toggle={this.props.closeModal}>
          {this.props.title}
        </ModalHeader>
        <ModalBody>{this.props.message}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.confirm}>
            Ok
          </Button>
          <Button color="secondary" onClick={this.props.closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalConfirm;
