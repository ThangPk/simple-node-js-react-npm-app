import React, { Component } from "react";
import Formsy from "formsy-react";
import { Row, Col, Button } from "reactstrap";
import MyInput from "../../../Commons/inputForm";
import MySelect from "../../../Commons/selectForm";
import MyCheckbox from "../../../Commons/checkbox";
import * as constant from "../../../Utils/constant";
import DrawingLine from "../../../Commons/konvaDraw/drawLine";
import { Tabs, Tab } from "react-bootstrap";
import ModalPreviewCamera from "../../../Commons/modalPreviewCamera";
import ReactPlayer from "react-player";

class CameraForm extends Component {
  state = {
    canSubmit: false,
    showVideoHumanTracking: this.props.cameraEdit ? this.props.cameraEdit.humanTrackingEnabled : false,
    showVideoFaceRecognition: this.props.cameraEdit ? this.props.cameraEdit.faceEnabled : false,
    showVideoLicensePlateRecognition: this.props.cameraEdit ? this.props.cameraEdit.licensePlateEnabled : false,
    tabKey: this.props.cameraEdit && this.props.cameraEdit.humanTrackingEnabled ? "human" : this.props.cameraEdit && this.props.cameraEdit.faceEnabled ? "face" : this.props.cameraEdit && this.props.cameraEdit.licensePlateEnabled ? "licensePlate" : "",
    showPreviewCamera: false,
    previewCameraHeader: "Camera preview",
    imagePreviewUrl: ""
  };

  handleClosePreviewCamera = () => {
    this.setState({
      imagePreviewUrl: null,
      showPreviewCamera: false
    });
  };

  handeShowPreviewCamera = () => {
    let cameraEdit = this.props.cameraEdit;
    let imagePreviewUrlTemp = "";
    let canShowModal = false;
    if (cameraEdit != null) {
      this.setState({ previewCameraHeader: "Camera: " + cameraEdit.name })
      imagePreviewUrlTemp = cameraEdit.imageSubUrl;
      canShowModal = true;
    } else {
      let newCameraModel = this.refs.cameraForm.getModel();

      if (newCameraModel.rtspUrl !== "" && newCameraModel.loginUserName !== "" && newCameraModel.loginPassword !== "") {
        imagePreviewUrlTemp = constant.BASE_IMAGE_MAP_URL + "camera/live/direct?rtsp_url=" + newCameraModel.rtspUrl.toString().toLowerCase() + "/live/video_audio/profile2&login_username=" + newCameraModel.loginUserName + "&login_password=" + newCameraModel.loginPassword;
        canShowModal = true;
      } else {
        this.props.showToastMessage("Please input: 'rtsp url', 'login username' and 'login password' to preview camera!", "error");
      }
    }

    if (canShowModal) {
      this.setState({
        showPreviewCamera: true,
        imagePreviewUrl: imagePreviewUrlTemp
      })
    }
  }

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  submit = camera => {
    if (this.props.cameraEdit) {
      camera.id = this.props.cameraEdit.id;
    }
    this.props.onCameraFormSubmit(camera);
  };

  handleChangeHumanTracking = value => {
    this.setState({ showVideoHumanTracking: value });
    if (this.state.tabKey === "") {
      this.setState({ tabKey: "human" });
    }
    if (value === false) {
      if (this.state.showVideoFaceRecognition) {
        this.handleSelect("face");
      } else if (this.state.showVideoLicensePlateRecognition) {
        this.handleSelect("licensePlate");
      }
    }
  };

  handleChangeFaceRecognition = value => {
    this.setState({ showVideoFaceRecognition: value });
    if (this.state.tabKey === "") {
      this.setState({ tabKey: "face" });
    }
    if (value === false) {
      if (this.state.showVideoHumanTracking) {
        this.handleSelect("human");
      } else if (this.state.showVideoLicensePlateRecognition) {
        this.handleSelect("licensePlate");
      }
    }
  };

  handleChangeLicensePlateRecognition = value => {
    this.setState({ showVideoLicensePlateRecognition: value });
    if (this.state.tabKey === "") {
      this.setState({ tabKey: "licensePlate" });
    }
    if (value === false) {
      if (this.state.showVideoHumanTracking) {
        this.handleSelect("human");
      } else if (this.state.showVideoFaceRecognition) {
        this.handleSelect("face");
      }
    }
  };

  handleSelect = key => {
    this.setState({ tabKey: key });
  };

  handleOnchangeRecordingEnabled = isEnable => {
    this.setState({ isEnableRecording: isEnable });
  };

  render() {
    let cameraEdit = this.props.cameraEdit;

    const title = cameraEdit ? "Update camera: " + cameraEdit.name : "New camera";
    return (
      <div className="component">
        <div className="component-header">{title}</div>
        <div className="component-body">
          <Formsy ref="cameraForm"
            onValidSubmit={this.submit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            className="form">
            <div className="form-body">
              <div className="group-header">General information</div>
              <div className="group-body">
                <Row>
                  <Col>
                    <MyInput
                      name="name"
                      title="Name"
                      type="text"
                      required
                      value={cameraEdit ? cameraEdit.name : ""}
                    />
                    <MyInput
                      name="ipAddress"
                      title="IP address"
                      type="text"
                      required
                      value={cameraEdit ? cameraEdit.ipAddress : ""}
                    />
                    <MyInput
                      name="vendor"
                      title="Vendor"
                      type="text"
                      required
                      value={cameraEdit ? cameraEdit.vendor : ""}
                    />
                  </Col>
                  <Col>
                    <MyInput
                      name="description"
                      title="Description"
                      type="text"
                      value={cameraEdit ? cameraEdit.description : ""}
                    />
                    <MyInput
                      name="macAddress"
                      title="MAC address"
                      type="text"
                      required
                      value={cameraEdit ? cameraEdit.macAddress : ""}
                    />
                    <MyInput
                      name="siteName"
                      title="Site name"
                      type="text"
                      value={cameraEdit ? cameraEdit.siteName : ""}
                    />
                  </Col>
                </Row>
              </div>
              <div className="group-header">Streaming information</div>
              <div className="group-body">
                <Row>
                  <Col>
                    <MyInput
                      name="rtspUrl"
                      title="Rtsp url"
                      type="text"
                      required
                      value={cameraEdit ? cameraEdit.rtspUrl : ""}
                    />
                    <MyInput
                      name="rtspUrlSub"
                      title="Rtsp url sub"
                      type="text"
                      required
                      value={cameraEdit ? cameraEdit.rtspUrlSub : ""}
                    />
                    <MySelect
                      name="videoCodec"
                      title="Video codec"
                      required
                      options={[
                        { title: "H264", value: "H264" },
                        { title: "H265", value: "H265" },
                        { title: "JPEG", value: "JPEG" }
                      ]}
                      value={cameraEdit ? cameraEdit.videoCodec : "H264"}
                    />
                  </Col>
                  <Col>
                    <MyInput
                      name="loginUserName"
                      title="Login username"
                      type="text"
                      required
                      value={cameraEdit ? cameraEdit.loginUserName : ""}
                    />
                    <MyInput
                      name="loginPassword"
                      title="Login password"
                      type="password"
                      required
                      value={cameraEdit ? cameraEdit.loginPassword : ""}
                    />
                    <Button
                      color="primary"
                      onClick={() => {
                        this.handeShowPreviewCamera();
                      }}
                    >
                      Preview camera
                    </Button>
                  </Col>
                </Row>
              </div>
              <div className="group-header">Capability</div>
              <div className="group-body">
                <Row>
                  <Col>
                    <MyCheckbox
                      name="enabled"
                      title="Enable Camera"
                      value={cameraEdit ? cameraEdit.enabled : false}
                    />
                  </Col>
                  <Col>
                    <MyCheckbox
                      name="recordingEnabled"
                      title="Enable Recording"
                      value={cameraEdit ? cameraEdit.recordingEnabled : false}
                    />
                  </Col>
                  <Col>
                    <MyCheckbox
                      name="humanTrackingEnabled"
                      title="Enable Human Tracking"
                      value={
                        cameraEdit ? cameraEdit.humanTrackingEnabled : false
                      }
                      onChange={this.handleChangeHumanTracking}
                    />
                  </Col>
                  <Col>
                    <MyCheckbox
                      name="faceEnabled"
                      title="Enable Face Recognition"
                      value={cameraEdit ? cameraEdit.faceEnabled : false}
                      onChange={this.handleChangeFaceRecognition}
                    />
                  </Col>
                  <Col>
                    <MyCheckbox
                      name="licensePlateEnabled"
                      title="Enable License Plate Recognition"
                      value={
                        cameraEdit ? cameraEdit.licensePlateEnabled : false
                      }
                      onChange={this.handleChangeLicensePlateRecognition}
                    />
                  </Col>
                </Row>
              </div>
              {cameraEdit != null ? (this.state.showVideoHumanTracking || this.state.showVideoFaceRecognition || this.state.showVideoLicensePlateRecognition ?
                (
                  <div>
                    <div className="group-header">Regions definition </div>
                    <div className="group-body define-regions">
                      <Tabs
                        activeKey={this.state.tabKey}
                        id="camera-regions"
                        animation={false}
                        className="tab-regions"
                        onSelect={this.handleSelect}>
                        {this.state.showVideoHumanTracking ? (
                          <Tab eventKey={"human"} title="Human tracking">
                            <div className="camera-define-region">
                              <ReactPlayer url={cameraEdit.imageMainUrl}
                                playing
                                width="600px"
                                height="400px"
                                className="image-background" />
                              <img
                                alt=""
                                className="image-background-loading"
                                width="600"
                                height="400"
                              />
                              <DrawingLine
                                polygonPercents={
                                  cameraEdit.humanTrackingRegions != null
                                    ? cameraEdit.humanTrackingRegions
                                    : []
                                }
                                onSaveHumanTrackingRegions={
                                  this.props.onSaveHumanTrackingRegions
                                }
                                isSavedHumanTracking={
                                  this.props.isSavedHumanTracking
                                }
                                drawingType={"human"}
                              />
                            </div>
                          </Tab>
                        ) : ("")}
                        {this.state.showVideoFaceRecognition ? (
                          <Tab eventKey={"face"} title="Face recognition">
                            <div className="camera-define-region">
                              <ReactPlayer url={cameraEdit.imageMainUrl}
                                playing
                                width="600px"
                                height="400px"
                                className="image-background" />
                              <img
                                alt=""
                                className="image-background-loading"
                                width="600"
                                height="400"
                              />
                              <DrawingLine
                                polygonPercents={cameraEdit.faceRecognitionRegions != null ? cameraEdit.faceRecognitionRegions : []}
                                onSaveFaceRecognitionRegions={this.props.onSaveFaceRecognitionRegions}
                                isSavedFaceRecognition={this.props.isSavedFaceRecognition}
                                drawingType={"face"}
                              />
                            </div>
                          </Tab>
                        ) : ("")}
                        {this.state.showVideoLicensePlateRecognition ? (
                          <Tab
                            eventKey={"licensePlate"}
                            title="License plate recognition">
                            <div className="camera-define-region">
                              <ReactPlayer url={cameraEdit.imageMainUrl}
                                playing
                                width="600px"
                                height="400px"
                                className="image-background" />
                              <img
                                alt=""
                                className="image-background-loading"
                                width="600"
                                height="400"
                              />
                              <DrawingLine
                                polygonPercents={
                                  cameraEdit.licensePlateRecognitionRegions !=
                                    null
                                    ? cameraEdit.licensePlateRecognitionRegions
                                    : []
                                }
                                onSaveLicensePlateRecognitions={
                                  this.props.onSaveLicensePlateRecognitions
                                }
                                isSavedLicensePlateRecognition={
                                  this.props.isSavedLicensePlateRecognition
                                }
                                drawingType={"licensePlate"}
                              />
                            </div>
                          </Tab>
                        ) : (
                            ""
                          )}
                      </Tabs>
                    </div>
                  </div>
                ) : ("")
              ) : ("")}
              <div />
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
                  this.props.closeAddOrEditCameraUI();
                }}>
                Cancel
              </Button>
            </div>
          </Formsy>
        </div>
        <ModalPreviewCamera
          show={this.state.showPreviewCamera}
          closeModal={this.handleClosePreviewCamera}
          title={this.state.previewCameraHeader}
          imagePreviewUrl={this.state.imagePreviewUrl}
        />
      </div>
    );
  }
}
export default CameraForm;
