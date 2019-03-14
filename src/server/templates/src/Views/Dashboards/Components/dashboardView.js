import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { withRouter } from "react-router-dom";

class Dashboards extends Component {
  componentWillMount() {
    this.props.getServerStatus();
    this.props.getHumanServerStatus();
    this.props.getFaceRecognitionCameraStatus();
    this.props.getLicensePlateRecognitionCameraStatus();
    this.props.getCameraStatus();
    this.props.getHumanCameraStatus();
    this.props.getFaceRecognitionServerStatus();
    this.props.getLicensePlateRecognitionServerStatus();
  }

  goToCameras = () => {
    this.props.history.push("/cameras");
  };

  goToCameraPermissions = () => {
    this.props.history.push("/camera-permissions");
  };

  goToCameraCategory = () => {
    this.props.history.push("/camera-category");
  };

  goToUsers = () => {
    this.props.history.push("/users");
  };

  goToGroups = () => {
    this.props.history.push("/groups");
  };

  goToServers = () => {
    this.props.history.push("/servers");
  };

  goToMap = () => {
    this.props.history.push("/map");
  };

  goToPeoples = () => {
    this.props.history.push("/faces");
  };

  goToLicensePlates = () => {
    this.props.history.push("/license-plates");
  };

  goToNotificationRules = () => {
    this.props.history.push("/notification-rules");
  };

  render() {
    let {
      cameraStatus,
      HumanCameraStatus,
      FaceRecognitionCameraStatus,
      LicensePlateRecognitionCameraStatus,
      serverStatus,
      HumanServerStatus,
      FaceRecognitionServerStatus,
      LicensePlateRecognitionServerStatus
    } = this.props;

    return (
      <div className="main-screen container-fluid">
        <div className="main-menu">
          <div className="menu-button" onClick={this.goToCameras}>
            <i className="fa fa-camera fa-3x" />
            Cameras
          </div>
          <div className="menu-button" onClick={this.goToCameraPermissions}>
            <i className="fa fa-universal-access fa-3x" />
            Camera permissions
          </div>
          <div className="menu-button" onClick={this.goToCameraCategory}>
            <i className="fa fa-list fa-3x" />
            Camera categories
          </div>
          <div className="menu-button" onClick={this.goToUsers}>
            <i className="fa fa-user fa-3x" />
            Users
          </div>
          <div className="menu-button" onClick={this.goToGroups}>
            <i className="fa fa-users fa-3x" />
            User groups
          </div>
          <div className="menu-button" onClick={this.goToServers}>
            <i className="fa fa-database fa-3x" />
            Servers
          </div>
          <div className="menu-button" onClick={this.goToMap}>
            <i className="fa fa-map fa-3x" />
            Maps
          </div>
          <div className="menu-button" onClick={this.goToPeoples}>
            <i className="fa fa-id-badge fa-3x" />
            Faces
          </div>
          <div className="menu-button" onClick={this.goToLicensePlates}>
            <i className="fa fa-car fa-3x" />
            License plates
          </div>
          <div className="menu-button" onClick={this.goToNotificationRules}>
            <i className="fa fa-bell fa-3x" />
            Notification rules
          </div>
        </div>
        <div className="dashboard container-fluid">
          <h3 className="h3-title">Cameras Status</h3>
          <div className="row">
            <div className="chart col-sm-6 col-md-6 col-lg-6 col-xl-3">
              <div className="chart-title">Streaming</div>
              <div className="chart-wrapper">
                {
                  cameraStatus.hasData ? (
                    <Pie data={cameraStatus} options={optionDisplayChart} />
                  ) : "No data"
                }
              </div>
            </div>
            <div className="chart col-sm-6 col-md-6 col-lg-6 col-xl-3">
              <div className="chart-title">Human tracking</div>
              <div className="chart-wrapper">
                {
                  HumanCameraStatus.hasData ? (
                    <Pie data={HumanCameraStatus} options={optionDisplayChart} />
                  ) : "No data"
                }
              </div>
            </div>
            <div className="chart col-sm-6 col-md-6 col-lg-6 col-xl-3">
              <div className="chart-title">Face recognition</div>
              <div className="chart-wrapper">
                {
                  FaceRecognitionCameraStatus.hasData ? (
                    <Pie data={FaceRecognitionCameraStatus} options={optionDisplayChart} />
                  ) : "No data"
                }
              </div>
            </div>
            <div className="chart col-sm-6 col-md-6 col-lg-6 col-xl-3">
              <div className="chart-title">License plate recognition</div>
              <div className="chart-wrapper">
                {
                  LicensePlateRecognitionCameraStatus.hasData ? (
                    <Pie data={LicensePlateRecognitionCameraStatus} options={optionDisplayChart} />
                  ) : "No data"
                }
              </div>
            </div>
          </div>
          <h3 className="h3-title">Servers Status</h3>
          <div className="row">
            <div className="chart col-sm-6 col-md-6 col-lg-6 col-xl-3">
              <div className="chart-title">Streaming</div>
              <div className="chart-wrapper">
                {
                  serverStatus.hasData ? (
                    <Pie data={serverStatus} options={optionDisplayChart} />
                  ) : "No data"
                }
              </div>
            </div>
            <div className="chart col-sm-6 col-md-6 col-lg-6 col-xl-3">
              <div className="chart-title">Human tracking</div>
              <div className="chart-wrapper">
                {
                  HumanServerStatus.hasData ? (
                    <Pie data={HumanServerStatus} options={optionDisplayChart} />
                  ) : "No data"
                }
              </div>
            </div>
            <div className="chart col-sm-6 col-md-6 col-lg-6 col-xl-3">
              <div className="chart-title">Face recognition</div>
              <div className="chart-wrapper">
                {
                  FaceRecognitionServerStatus.hasData ? (
                    <Pie data={FaceRecognitionServerStatus} options={optionDisplayChart} />
                  ) : "No data"
                }
              </div>
            </div>
            <div className="chart col-sm-6 col-md-6 col-lg-6 col-xl-3">
              <div className="chart-title">License plate</div>
              <div className="chart-wrapper">
                {
                  LicensePlateRecognitionServerStatus.hasData ? (
                    <Pie data={LicensePlateRecognitionServerStatus} options={optionDisplayChart} />
                  ) : "No data"
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const optionDisplayChart = {
  plugins: {
    datalabels: {
      color: "white",
      font: {
        size: 16
      },
      display: function (context) {
        return context.dataset.data[context.dataIndex] !== 0;
      }
    }
  }
};

export default withRouter(Dashboards);
