import React, { Component } from "react";
import Formsy from "formsy-react";
import { Button, Row, Col } from "reactstrap";
import MyInput from "../../../Commons/inputForm";
import ImageGallery from "react-image-gallery";
import Dropzone from "react-dropzone";
import { fromEvent } from "file-selector";

import { BASE_IMAGE_MAP_URL } from "../../../Utils/constant";

class PeopleForm extends Component {
  state = { canSubmit: false, files: [], peopleImages: [] };

  componentWillMount() {
    let people = this.props.people;
    let peopleImages = [];

    if (people) {
      people.images.forEach((image, index) => {
        peopleImages.push({
          original: BASE_IMAGE_MAP_URL + image,
          thumbnail: BASE_IMAGE_MAP_URL + image,
          imageId: people.imageIds[index]
        });
      });

      this.setState({ peopleImages: peopleImages });
    }
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  onDropFiles = files => {
    this.setState({
      files: files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    });
  };

  submit = people => {
    if (this.state.files === null && this.props.people === null) {
      alert("Please add images for new face");
    } else {
      if (this.props.people) {
        people.id = this.props.people.id;
      } else {
        people.id = "";
      }
      this.props.onFormPeopleSubmit(people, this.state.files);
    }
  };

  deleteImage = () => {
    let currentIndex = this._imageGallery.getCurrentIndex();
    let currentImageId = this._imageGallery.props.items[currentIndex].imageId;
    this.props.onDeleteImage(currentImageId);

    this.setState({
      peopleImages: this.state.peopleImages.filter(
        image => image.imageId !== currentImageId
      )
    });

    if (currentIndex !== 0) {
      this._imageGallery.slideToIndex(currentIndex - 1);
    } else {
      this._imageGallery.slideToIndex(currentIndex);
    }
  };

  render() {
    let { files } = this.state;
    let people = this.props.people;
    let peopleImages = this.state.peopleImages;
    const title = people ? "Update face" : "New face";

    const imageThumbs = files.map(file => (
      <div className="thumb" key={file.name}>
        <div className="thumb-inner">
          <img alt="" src={file.preview} className="image" />
        </div>
      </div>
    ));

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
              <Row>
                <Col className="col-md-8">
                  <MyInput
                    name="firstName"
                    title="First name"
                    type="text"
                    required
                    value={people ? people.firstName : ""}
                  />
                  <MyInput
                    name="lastName"
                    title="Last name"
                    type="text"
                    required
                    value={people ? people.lastName : ""}
                  />
                  <MyInput
                    name="email"
                    title="Email"
                    type="text"
                    validations="isEmail"
                    validationError="This is not a valid email"
                    required
                    value={people ? people.email : ""}
                  />
                  <MyInput
                    name="phoneNumber"
                    title="Phone number"
                    type="text"
                    validations="isNumeric"
                    validationError="This is not a valid number"
                    required
                    value={people ? people.phoneNumber : ""}
                  />
                  <div className="people-image">
                    <Dropzone
                      accept="image/*"
                      getDataTransferItems={evt => fromEvent(evt)}
                      onDrop={this.onDropFiles}>
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div className="add-image">
                            <i className="far fa-plus-square"></i>
                            <br/>
                            <span >Add images or drop folder here</span>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className="thumb-container">{imageThumbs}</div>
                  </div>
                </Col>
                {people && (
                  <Col className="col-md-4">
                    <ImageGallery
                      ref={i => (this._imageGallery = i)}
                      items={peopleImages}
                      showFullscreenButton={false}
                      showPlayButton={false}
                      disableArrowKeys={true}
                      showNav={false}
                      renderCustomControls={() => {
                        return (
                          <a
                            className={
                              peopleImages.length > 0 ? "delete-image" : "hide"
                            }
                            onClick={this.deleteImage}>
                            <i className="fa fa-times fa-2x" />
                          </a>
                        );
                      }}
                    />
                  </Col>
                )}
              </Row>
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

export default PeopleForm;
