import React, { Component } from "react";
import { Input, Button } from "reactstrap";
import ModalConfirm from "../../Commons/modalConfirm";
import Pagination from "react-js-pagination";
import Loader from "react-loader-advanced";
import CameraTable from "./CameraList/cameraTable";
import CameraForm from "./CameraDetail/cameraForm";
import { StreamingStatus, ConnectionStatus } from "../../../Enums/index";
import { PAGE_SIZE, PAGE_ONE, DOWNLOAD_TEMPLETE_CAMERA_CSV_URL, DOWNLOAD_CAMERA_EXPORT_CSV_URL} from "../../Utils/constant";

class Cameras extends Component {
  state = {
    activePage: 1,
    filter: {
      searchKeyWord: "",
      enabled: "",
      humanDectectionstatus: "",
      faceStreamingStatus: "",
      licensePlateStreamingStatus: "",
      streamingStatus: "",
      connectionStatus: ""
    },
    cameraFile: null,
    isEditOrAddCamera: false,
    cameraEdit: null,
    camerasSelected: [],
    showModalConfirmDeleteCamera: false
  };

  componentWillMount() {
    this.props.getCameras("", "", "", "", "", "", "", PAGE_ONE, PAGE_SIZE);
  }

  componentWillReceiveProps(newProps) {
    if (
      this.state.isEditOrAddCamera === true &&
      newProps.addOrUpdateFailed === false
    ) {
      this.setState({
        isEditOrAddCamera: false,
        cameraEdit: null,
        camerasSelected: []
      });
    }

    if (newProps.isExportCameraSuccess === true) {
      this.refs.downloadExport.click();
    }
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
    this.props.getCameras(
      this.state.filter.searchKeyWord,
      this.state.filter.enabled,
      this.state.filter.connectionStatus,
      this.state.filter.streamingStatus,
      this.state.filter.humanDectectionstatus,
      this.state.faceStreamingStatus,
      this.state.licensePlateStreamingStatus,
      pageNumber,
      PAGE_SIZE
    );
  };

  //Delete Camera
  handleCamerasSelectedChange = camerasSelected => {
    this.setState({ camerasSelected: camerasSelected });
  };

  handleCloseModalConfirmDeleteCamera = () => {
    this.setState({ showModalConfirmDeleteCamera: false });
  };

  handleModalConfirmDeleteCameraOk = () => {
    this.props.deleteCamera(this.state.camerasSelected);
    this.setState({ showModalConfirmDeleteCamera: false, camerasSelected: [] });
  };

  //Search
  handleSearchKeyWordChange = e => {
    this.setState({
      filter: {
        ...this.state.filter,
        searchKeyWord: e.target.value
      }
    });
  };

  handleHumanDetectionStatusChange = e => {
    this.setState({
      filter: {
        ...this.state.filter,
        humanDectectionstatus: e.target.value
      }
    });
  };

  handleFaceStreamingStatusChange = e => {
    this.setState({
      filter: {
        ...this.state.filter,
        faceStreamingStatus: e.target.value
      }
    });
  };

  handleLicensePlateStreamingStatusChange = e => {
    this.setState({
      filter: {
        ...this.state.filter,
        licensePlateStreamingStatus: e.target.value
      }
    });
  };

  handleStreamingStatusChange = e => {
    this.setState({
      filter: {
        ...this.state.filter,
        streamingStatus: e.target.value
      }
    });
  };

  handleConnectionStatusChange = e => {
    this.setState({
      filter: {
        ...this.state.filter,
        connectionStatus: e.target.value
      }
    });
  };

  handleEnabledFilterChange = e => {
    this.setState({
      filter: {
        ...this.state.filter,
        enabled: e.target.value
      }
    });
  };

  handleSearchCamera = () => {
    this.props.getCameras(
      this.state.filter.searchKeyWord,
      this.state.filter.enabled,
      this.state.filter.connectionStatus,
      this.state.filter.streamingStatus,
      this.state.filter.humanDectectionstatus,
      this.state.filter.faceStreamingStatus,
      this.state.filter.licensePlateStreamingStatus,
      PAGE_ONE,
      PAGE_SIZE
    );
  };

  //Camera
  handleCameraFilechangeValue = event => {
    this.setState({ cameraFile: event.target.files[0] });
    this.props.importCameraListFile(event.target.files[0]);
  };

  handleCameraFormSubmit = camera => {
    if (this.state.cameraEdit) {
      this.props.updateCamera(camera);
    } else {
      this.props.addCamera(camera);
    }
  };

  handeleEnableDisableCamera = camera => {
    let enabled = true;
    if (camera.enabled) {
      enabled = false;
    }

    this.props.enableCamera(camera.id, enabled);
  };

  handeleExtractVideoCamera = camera => {
    this.props.history.push("/camera/" + camera.id + "/extract-video");
  };

  handeleEnableDisableRecoding = camera => {
    let enabled = true;
    if (camera.recordingEnabled) {
      enabled = false;
    }

    this.props.enableCameraRecoding(camera.id, enabled);
  };

  handeleEnableDisableHumanTracking = camera => {
    let enabledHumanTracking = true;
    if (camera.humanTrackingEnabled) {
      enabledHumanTracking = false;
    }

    this.props.enableHumanTracking(camera.id, enabledHumanTracking);
  };

  handleSaveHumanTrackingRegions = data => {
    this.props.saveHumanTrackingRegions(this.state.cameraEdit.id, data);
  };

  handleSaveFaceRecognitionRegions = data => {
    this.props.saveFaceRecognitionRegions(this.state.cameraEdit.id, data);
  };

  handleSaveLicensePlateRecognitions = data => {
    this.props.saveLicensePlateRecognitions(this.state.cameraEdit.id, data);
  };

  handeleEnableDisableFaceTracking = camera => {
    let enabledFaceTracking = true;
    if (camera.faceEnabled) {
      enabledFaceTracking = false;
    }
    this.props.enableCameraFaceTracking(camera.id, enabledFaceTracking);
  };

  handeleEnableDisableLicensePlateTracking = camera => {
    let enableLicensePlateTracking = true;
    if (camera.licensePlateEnabled) {
      enableLicensePlateTracking = false;
    }
    this.props.enableCameraLicensePlateTracking(
      camera.id,
      enableLicensePlateTracking
    );
  };

  //Update UI
  handeleOpenEditCameraUI = cameraEdit => {
    this.setState({ isEditOrAddCamera: true, cameraEdit: cameraEdit });
  };

  handleOpenAddCameraUI = () => {
    this.setState({ isEditOrAddCamera: true, cameraEdit: null });
  };

  handleCloseAddOrEditCameraUI = () => {
    this.setState({
      isEditOrAddCamera: false,
      cameraEdit: null,
      camerasSelected: []
    });
  };

  render() {
    let showRemoveCameraClass =
      this.state.camerasSelected.length > 0 ? "" : "hide";
    if (this.state.isEditOrAddCamera) {
      if (this.state.cameraEdit) {
        return (
          <CameraForm
            cameraEdit={this.state.cameraEdit}
            closeAddOrEditCameraUI={this.handleCloseAddOrEditCameraUI}
            onCameraFormSubmit={this.handleCameraFormSubmit}
            onSaveHumanTrackingRegions={this.handleSaveHumanTrackingRegions}
            onSaveFaceRecognitionRegions={this.handleSaveFaceRecognitionRegions}
            onSaveLicensePlateRecognitions={
              this.handleSaveLicensePlateRecognitions
            }
            isSavedHumanTracking={this.props.isSavedHumanTracking}
            isSavedFaceRecognition={this.props.isSavedFaceRecognition}
            isSavedLicensePlateRecognition={
              this.props.isSavedLicensePlateRecognition
            }
            drawingType={this.props.drawingType}
            showToastMessage={this.props.showToastMessage}
          />
        );
      }
      return (
        <CameraForm
          closeAddOrEditCameraUI={this.handleCloseAddOrEditCameraUI}
          onCameraFormSubmit={this.handleCameraFormSubmit}
          showToastMessage={this.props.showToastMessage}
        />
      );
    } else {
      let { isFetching, data, totalPages } = this.props;
      return (
        <div className="component">
          <div className="camera-import">
            <Button
              className="export"
              color="primary"
              onClick={() => {
                this.props.exportCameraList();
              }}>
              Export csv file
            </Button>
            <div className="file-upload btn btn-primary">
              <span>Upload csv file</span>
              <Input
                type="file"
                id="file-upload"
                className="upload"
                accept=".csv"
                onChange={this.handleCameraFilechangeValue}
              />
            </div>
            <span>{this.state.cameraFile && this.state.cameraFile.name}</span>
            <div className="empty" />

            <div>
              <a ref="downloadTemplate" href={DOWNLOAD_TEMPLETE_CAMERA_CSV_URL}>
                Download
              </a>{" "}
              the template csv file
            </div>
            <div className="visible">
              <a ref="downloadExport" href={DOWNLOAD_CAMERA_EXPORT_CSV_URL}>{''}</a>
            </div>
          </div>
          <div className="component-body">
            <div className="action-top clearfix row border-bottom">
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-2">
                    <Input
                      type="select"
                      id="connection-status"
                      className="form-control select"
                      value={this.state.filter.connectionStatus}
                      onChange={this.handleConnectionStatusChange}>
                      <option value="">All connection</option>
                      <option value={ConnectionStatus.CONNECTED}>
                        Connected
                      </option>
                      <option value={ConnectionStatus.DISCONNECTED}>
                        Disconnected
                      </option>
                      <option value={ConnectionStatus.ERROR}>Error</option>
                    </Input>
                  </div>
                  <div className="col-md-2">
                    <Input
                      type="select"
                      id="streaming-status"
                      className="form-control select"
                      value={this.state.filter.streamingStatus}
                      onChange={this.handleStreamingStatusChange}>
                      <option value="">All Streaming</option>
                      <option value={StreamingStatus.LIVE}>Live</option>
                      <option value={StreamingStatus.ERROR}>Error</option>
                      <option value={StreamingStatus.STOP}>Stop</option>
                    </Input>
                  </div>
                  <div className="col-md-2">
                    <Input
                      type="select"
                      id="enabled-status"
                      className="form-control select"
                      value={this.state.filter.enabled}
                      onChange={this.handleEnabledFilterChange}>
                      <option value="">All Status</option>
                      <option value="true">Enabled</option>
                      <option value="false">Disabled</option>
                    </Input>
                  </div>
                  <div className="col-md-2">
                    <Input
                      type="select"
                      id="human-dectection-status"
                      className="form-control select"
                      value={this.state.filter.humanDectectionstatus}
                      onChange={this.handleHumanDetectionStatusChange}>
                      <option value="">All Human tracking</option>
                      <option value={StreamingStatus.LIVE}>Live</option>
                      <option value={StreamingStatus.ERROR}>Error</option>
                      <option value={StreamingStatus.STOP}>Stop</option>
                    </Input>
                  </div>
                  <div className="col-md-2">
                    <Input
                      type="select"
                      className="form-control select"
                      value={this.state.filter.faceStreamingStatus}
                      onChange={this.handleFaceStreamingStatusChange}>
                      <option value="">All Face recognition</option>
                      <option value={StreamingStatus.LIVE}>Live</option>
                      <option value={StreamingStatus.ERROR}>Error</option>
                      <option value={StreamingStatus.STOP}>Stop</option>
                    </Input>
                  </div>
                  <div className="col-md-2">
                    <Input
                      type="select"
                      className="form-control select"
                      value={this.state.filter.licensePlateStreamingStatus}
                      onChange={this.handleLicensePlateStreamingStatusChange}>
                      <option value="">All Lic_Plate recognition</option>
                      <option value={StreamingStatus.LIVE}>Live</option>
                      <option value={StreamingStatus.ERROR}>Error</option>
                      <option value={StreamingStatus.STOP}>Stop</option>
                    </Input>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-group search-box">
                  <Input
                    type="text"
                    id="searchKeywork"
                    placeholder="Search by name, description"
                    onChange={this.handleSearchKeyWordChange}
                    value={this.state.filter.searchKeyWord}
                    className="form-control"
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => {
                        this.handleSearchCamera();
                      }}>
                      <i className="fa fa-search" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="action-top clearfix">
              <ul className="clearfix ">
                <li>
                  <a
                    onClick={() => {
                      this.handleOpenAddCameraUI();
                    }}>
                    Add camera
                  </a>
                </li>
                <li className={showRemoveCameraClass}>
                  <a
                    onClick={() => {
                      this.setState({ showModalConfirmDeleteCamera: true });
                    }}>
                    Remove camera(s)
                  </a>
                </li>
              </ul>
            </div>
            <Loader show={isFetching} message={<div className="loader" />}>
              <CameraTable
                cameras={data}
                onEditCamera={this.handeleOpenEditCameraUI}
                onExtractVideoCamera={this.handeleExtractVideoCamera}
                onEnableDisableCamera={this.handeleEnableDisableCamera}
                onEnableDisableHumanTracking={
                  this.handeleEnableDisableHumanTracking
                }
                onCamerasSelectedChange={this.handleCamerasSelectedChange}
                onEnableDisableRecording={this.handeleEnableDisableRecoding}
                onEnableDisableFaceTracking={
                  this.handeleEnableDisableFaceTracking
                }
                onEnableDisableLicensePlateTracking={
                  this.handeleEnableDisableLicensePlateTracking
                }
                showToastMessage={this.props.showToastMessage}
              />
              <ModalConfirm
                show={this.state.showModalConfirmDeleteCamera}
                closeModal={this.handleCloseModalConfirmDeleteCamera}
                confirm={this.handleModalConfirmDeleteCameraOk}
                title={"Confirm"}
                message={"Are you sure you want to delete the selection(s)?"}
              />
              {totalPages > 1 ? (
                <nav>
                  <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.state.activePage}
                    itemsCountPerPage={PAGE_SIZE}
                    totalItemsCount={totalPages * PAGE_SIZE}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                  />
                </nav>
              ) : (
                ""
              )}
            </Loader>
          </div>
        </div>
      );
    }
  }
}

export default Cameras;
