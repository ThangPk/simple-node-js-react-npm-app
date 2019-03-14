import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import ReactPlayer from "react-player";

class ModalPreviewCamera extends Component {
    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.closeModal} className="preview-modal">
                <ModalHeader toggle={this.props.closeModal} className="preview-modal-header">
                    {this.props.title}
                </ModalHeader>
                <ModalBody className="preview-modal-body">
                    <div className="preview-camera">
                    <ReactPlayer url={this.props.imagePreviewUrl} 
                                         playing 
                                         width="100%"
                                         className="main-image"/>
                        <img alt=''
                            className="loading-image"
                        ></img>
                    </div>
                </ModalBody>              
            </Modal>
        );
    }
}

export default ModalPreviewCamera;
