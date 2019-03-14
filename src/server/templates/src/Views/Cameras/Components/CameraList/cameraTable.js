import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Modal from "../../../Commons/modal";
import { StreamingStatus, ConnectionStatus } from "../../../../Enums/index";
import ModalPreviewCamera from "../../../Commons/modalPreviewCamera";

class CameraTable extends Component {
  state = {
    camerasSelected: [],
    showModalError: false,
    errorMessage: "",
    showPreviewCamera: false,
    previewCameraHeader: "Camera preview",
    imagePreviewUrl: ""
  };

  handleClosePreviewCamera = () => {
    this.setState({ 
      imagePreviewUrl: null,
      showPreviewCamera: false });
  };

  handeShowPreviewCamera = camera => {
    
    this.setState({
      previewCameraHeader: "Camera: " + camera.name,
      showPreviewCamera: true,
      imagePreviewUrl: camera.imageSubUrl
    })
  }

  handleCloseModalError = () => {
    this.setState({ showModalError: false });
  };

  handleOnCameraSelect = (row, isSelect) => {
    let camerasSelectedChange;
    if (isSelect) {
      camerasSelectedChange = [...this.state.camerasSelected, row.id];
      this.setState({
        camerasSelected: [...this.state.camerasSelected, row.id]
      });
    } else {
      camerasSelectedChange = this.state.camerasSelected.filter(
        x => x !== row.id
      );
      this.setState({
        camerasSelected: this.state.camerasSelected.filter(x => x !== row.id)
      });
    }
    //Mapping camerasSelected to view parent
    this.props.onCamerasSelectedChange(camerasSelectedChange);
  };

  handleOnCameraSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelect) {
      this.setState({
        camerasSelected: ids
      });
    } else {
      this.setState({
        camerasSelected: []
      });
    }
    //Mapping camerasSelected to view parent
    this.props.onCamerasSelectedChange(ids);
  };

  render() {
    const columns = [
      {
        dataField: "name",
        text: "Name",
        sort: true
      },
      {
        dataField: "description",
        text: "Description"
      },
      {
        dataField: "connection",
        text: "Recording",
        formatter: connectionFormatter,
        setState: connectionError => {
          this.setState({
            showModalError: true,
            errorMessage: connectionError
          });
        },
        classes: connection => {
          if (connection === ConnectionStatus.CONNECTED) {
            return "connected";
          } else if (connection === ConnectionStatus.DISCONNECTED) {
            return "disconnected";
          }
          return "error";
        }
      },
      {
        dataField: "streamingStatus",
        text: "Streaming",
        formatter: streamingStatusFormatter,
        handeShowPreviewCamera: this.handeShowPreviewCamera,
        showToastMessage: this.props.showToastMessage,
        setState: streamingError => {
          this.setState({
            showModalError: true,
            errorMessage: streamingError
          });
        },
        classes: streamingStatus => {
          if (streamingStatus === StreamingStatus.LIVE) {
            return "live";
          } else if (streamingStatus === StreamingStatus.ERROR) {
            return "error";
          }
          return "stop";
        }
      },
      {
        dataField: "humanStreamingStatus",
        text: "Human tracking",
        formatter: humanStreamingStatusFormatter,
        showToastMessage: this.props.showToastMessage,
        setState: humanStreamingError => {
          this.setState({
            showModalError: true,
            errorMessage: humanStreamingError
          });
        },
        classes: humanStreamingStatus => {
          if (humanStreamingStatus === StreamingStatus.LIVE) {
            return "live";
          } else if (humanStreamingStatus === StreamingStatus.ERROR) {
            return "error";
          }
          return "stop";
        }
      },
      {
        dataField: "faceStreamingStatus",
        text: "Face recognition",
        formatter: faceStreamingStatusFormatter,
        showToastMessage: this.props.showToastMessage,
        setState: faceStreamingError => {
          this.setState({
            showModalError: true,
            errorMessage: faceStreamingError
          });
        },
        classes: faceStreamingStatus => {
          if (faceStreamingStatus === StreamingStatus.LIVE) {
            return "live";
          } else if (faceStreamingStatus === StreamingStatus.ERROR) {
            return "error";
          }
          return "stop";
        }
      },
      {
        dataField: "licensePlateStreamingStatus",
        text: "License Plate recognition",
        formatter: licensePlateStreamingStatusFormatter,
        showToastMessage: this.props.showToastMessage,
        setState: licensePlateStreamingError => {
          this.setState({
            showModalError: true,
            errorMessage: licensePlateStreamingError
          });
        },
        classes: licensePlateStreamingStatus => {
          if (licensePlateStreamingStatus === StreamingStatus.LIVE) {
            return "live";
          } else if (licensePlateStreamingStatus === StreamingStatus.ERROR) {
            return "error";
          }
          return "stop";
        }
      },
      {
        dataField: "id",
        text: "Action",
        headerAlign: "center",
        formatter: cameraActionFormatter,
        headerClasses: "column-action",
        onEnableDisableCamera: this.props.onEnableDisableCamera,
        onEnableDisableHumanTracking: this.props.onEnableDisableHumanTracking,
        onEnableDisableRecording: this.props.onEnableDisableRecording,
        onEnableDisableFaceTracking: this.props.onEnableDisableFaceTracking,
        onEnableDisableLicensePlateTracking: this.props
          .onEnableDisableLicensePlateTracking,
        onEditCamera: this.props.onEditCamera,
        onExtractVideoCamera: this.props.onExtractVideoCamera
      }
    ];

    const selectRow = {
      mode: "checkbox",
      selected: this.state.camerasSelected,
      onSelect: this.handleOnCameraSelect,
      onSelectAll: this.handleOnCameraSelectAll
    };

    const defaultSorted = [
      {
        dataField: "name",
        order: "desc"
      }
    ];

    return (
      <div className="table-responsive table-camera">
        <BootstrapTable
          keyField="id"
          data={this.props.cameras}
          columns={columns}
          defaultSorted={defaultSorted}
          noDataIndication="No camera found"
          bordered
          hover
          selectRow={selectRow}
        />
        <Modal
          show={this.state.showModalError}
          closeModal={this.handleCloseModalError}
          title={"Error"}
          message={this.state.errorMessage}
        />
          <ModalPreviewCamera
          show={this.state.showPreviewCamera}
          closeModal={this.handleClosePreviewCamera}
          title={this.state.previewCameraHeader}
          imagePreviewUrl={this.state.imagePreviewUrl}
        />
        <div id="copydata" />
      </div>
    );
  }
}

//Custom
function cameraActionFormatter(cell, camera) {
  let enableOrDisableIcon, cameraTooltip;
  if (camera.enabled) {
    enableOrDisableIcon = "icon-action fa fa-ban fa-fw disable-camera";
    cameraTooltip = "Disable camera";
  } else {
    enableOrDisableIcon = "icon-action fa fa-play fa-fw enable-camera";
    cameraTooltip = "Enable camera";
  }

  let enableOrDisbleHumanTrackingIcon, humanTrackingTooltip;
  if (camera.humanTrackingEnabled) {
    enableOrDisbleHumanTrackingIcon =
      "icon-action fas fa-user-slash disable-human-tracking";
    humanTrackingTooltip = "Disable human tracking";
  } else {
    enableOrDisbleHumanTrackingIcon =
      "icon-action fas fa-user enable-human-tracking";
    humanTrackingTooltip = "Enable human tracking";
  }

  let enableOrDisableRecodingVideoIcon, recordingTooltip;
  if (camera.recordingEnabled) {
    enableOrDisableRecodingVideoIcon =
      "icon-action fas fa-video-slash color-red";
    recordingTooltip = "Disable Recording";
  } else {
    enableOrDisableRecodingVideoIcon = "icon-action fas fa-video color-green";
    recordingTooltip = "Enable Recording";
  }

  let enableOrDisableFaceTrackingIcon, faceTrackingTootip;
  if (camera.faceEnabled) {
    enableOrDisableFaceTrackingIcon =
      "icon-action fa fa-id-badge fa-fw color-red";
    faceTrackingTootip = "Disable Face Recognition";
  } else {
    enableOrDisableFaceTrackingIcon =
      "icon-action fa fa-id-badge fa-fw color-green";
    faceTrackingTootip = "Enable Face Recognition";
  }

  let enableOrDisableLicencePlateIcon, licensePlateTooltip;
  if (camera.licensePlateEnabled) {
    enableOrDisableLicencePlateIcon =
      "icon-action far fa-credit-card fa-fw color-red";
    licensePlateTooltip = "Disable License Plate Recognition";
  } else {
    enableOrDisableLicencePlateIcon =
      "icon-action far fa-credit-card fa-fw color-green";
    licensePlateTooltip = "Enable License Plate Recognition";
  }

  return (
    <div className="row-action text-center">
      <a
        onClick={() => {
          this.onEnableDisableCamera(camera);
        }}>
        <i
          className={enableOrDisableIcon}
          data-toggle="tooltip"
          title={cameraTooltip}
        />
      </a>
      <a
        onClick={() => {
          this.onEnableDisableRecording(camera);
        }}>
        <i
          className={enableOrDisableRecodingVideoIcon}
          data-toggle="tooltip"
          title={recordingTooltip}
        />
      </a>
      <a
        onClick={() => {
          this.onEnableDisableHumanTracking(camera);
        }}>
        <i
          className={enableOrDisbleHumanTrackingIcon}
          data-toggle="tooltip"
          title={humanTrackingTooltip}
        />
      </a>
      <a
        onClick={() => {
          this.onEnableDisableFaceTracking(camera);
        }}>
        <i
          className={enableOrDisableFaceTrackingIcon}
          data-toggle="tooltip"
          title={faceTrackingTootip}
        />
      </a>
      <a
        onClick={() => {
          this.onEnableDisableLicensePlateTracking(camera);
        }}>
        <i
          className={enableOrDisableLicencePlateIcon}
          data-toggle="tooltip"
          title={licensePlateTooltip}
        />
      </a>
      {/* <a
        onClick={() => {
          this.onExtractVideoCamera(camera);
        }}>
        <i
          className="icon-action  fas fa-download"
          data-toggle="tooltip"
          title="Extract video"
        />
      </a> */}
      <a
        onClick={() => {
          this.onEditCamera(camera);
        }}>
        <i className="icon-action fa fa-edit" />
      </a>
    </div>
  );
}

function connectionFormatter(cell, camera) {
  if (camera.connectionError === null) {
    if (camera.connection === ConnectionStatus.CONNECTED) {
      return "recording";
    } else {
      return "stop";
    }
  }

  return (
    <div>
      <a
        href={null}
        onClick={() => {
          this.setState(camera.connectionError);
        }}>
        {camera.connection}
      </a>
    </div>
  );
}

function streamingStatusFormatter(cell, camera) {
  if (camera.streamingError === null) {
    let haveData = false;
    if (camera.rtspStreamingUrl !== null && camera.rtspStreamingUrl !== "")
      haveData = true;
    if (haveData) {
      return (
        <div>
          <a
            href={null}
            onClick={() => {
              this.handeShowPreviewCamera(camera);
              // const textField = document.createElement("textarea");
              // textField.innerText = camera.rtspStreamingUrl.trim();
              // const parentElement = document.getElementById("copydata");
              // parentElement.appendChild(textField);
              // textField.select();
              // document.execCommand("copy");
              // parentElement.removeChild(textField);
              // this.showToastMessage("Coppied!", "success");
            }}>
            live
          </a>
        </div>
      );
    }
  } else {
    return (
      <div>
        <a
          href={null}
          onClick={() => {
            this.setState(camera.streamingError);
          }}>
          {camera.streamingStatus}
        </a>
      </div>
    );
  }
  return <div>{camera.streamingStatus}</div>;
}

function humanStreamingStatusFormatter(cell, camera) {
  if (camera.humanStreamingError === null) {
    let haveData = false;
    if (
      camera.humanStreamingRtspUrl !== null &&
      camera.humanStreamingRtspUrl !== ""
    )
      haveData = true;
    if (haveData) {
      return (
        <div>
          <a
            href={null}
            onClick={() => {
              const textField = document.createElement("textarea");
              textField.innerText =
                camera.humanStreamingRtspUrl.trim() + "/human-tracking";
              const parentElement = document.getElementById("copydata");
              parentElement.appendChild(textField);
              textField.select();
              document.execCommand("copy");
              parentElement.removeChild(textField);
              this.showToastMessage("Coppied!", "success");
            }}>
            copy link
          </a>
        </div>
      );
    }
  } else {
    return (
      <div>
        <a
          href={null}
          onClick={() => {
            this.setState(camera.humanStreamingError);
          }}>
          {camera.humanStreamingStatus}
        </a>
      </div>
    );
  }
  return <div>{camera.humanStreamingStatus}</div>;
}

function faceStreamingStatusFormatter(cell, camera) {
  if (camera.faceStreamingError === null) {
    let haveData = false;
    if (
      camera.faceStreamingRtspUrl !== null &&
      camera.faceStreamingRtspUrl !== ""
    )
      haveData = true;
    if (haveData) {
      return (
        <div>
          <a
            href={null}
            onClick={() => {
              const textField = document.createElement("textarea");
              textField.innerText =
                camera.faceStreamingRtspUrl.trim() + "/face";
              const parentElement = document.getElementById("copydata");
              parentElement.appendChild(textField);
              textField.select();
              document.execCommand("copy");
              parentElement.removeChild(textField);
              this.showToastMessage("Coppied!", "success");
            }}>
            copy link
          </a>
        </div>
      );
    }
  } else {
    return (
      <div>
        <a
          href={null}
          onClick={() => {
            this.setState(camera.faceStreamingError);
          }}>
          {camera.faceStreamingStatus}
        </a>
      </div>
    );
  }
  return <div>{camera.faceStreamingStatus}</div>;
}

function licensePlateStreamingStatusFormatter(cell, camera) {
  if (camera.licensePlateStreamingError === null) {
    let haveData = false;
    if (
      camera.licensePlateStreamingRtspUrl !== null &&
      camera.licensePlateStreamingRtspUrl !== ""
    )
      haveData = true;
    if (haveData) {
      return (
        <div>
          <a
            href={null}
            onClick={() => {
              const textField = document.createElement("textarea");
              textField.innerText =
                camera.licensePlateStreamingRtspUrl.trim() +
                "/license-plate";
              const parentElement = document.getElementById("copydata");
              parentElement.appendChild(textField);
              textField.select();
              document.execCommand("copy");
              parentElement.removeChild(textField);
              this.showToastMessage("Coppied!", "success");
            }}>
            copy link
          </a>
        </div>
      );
    }
  } else {
    return (
      <div>
        <a
          href={null}
          onClick={() => {
            this.setState(camera.licensePlateStreamingError);
          }}>
          {camera.licensePlateStreamingStatus}
        </a>
      </div>
    );
  }
  return <div>{camera.licensePlateStreamingStatus}</div>;
}

export default CameraTable;
