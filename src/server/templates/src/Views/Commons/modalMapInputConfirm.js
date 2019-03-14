import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input
} from "reactstrap";
import MyInput from "../../Views/Commons/inputForm";
import Formsy from "formsy-react";

class ModalInputConfirm extends Component {
  state = { canSubmit: false, imageFile: null, imageWidth: "", imageHeight: "" };

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  submit = object => {
    this.props.confirm(object.name, this.state.imageFile, this.state.imageWidth, this.state.imageHeight);
    this.setState({ canSubmit: false, imageFile: null });
  };

  handleImageFilechangeValue = event => {
    let _URL = window.URL || window.webkitURL;
    let file = event.target.files[0];

    if (file) {
      let image = new Image();
      image.onload = () => {        
        this.setState({
          imageFile: file,
          imageWidth: image.width,
          imageHeight: image.height
        });
      };
      image.onerror = () => {
        alert("Not a valid file: " + file.type);
      };
      image.src = _URL.createObjectURL(file);
    }
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
            <MyInput
              name="name"
              title="Map name"
              type="text"
              required
              value={this.props.map ? this.props.map.title : ""}
            />
            <span>{this.props.map ? "Change image" : "Upload image"}</span>
            <Input
              type="file"
              id="file-upload"
              className="upload"
              accept=".svg"
              onChange={this.handleImageFilechangeValue}
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

export default ModalInputConfirm;
