import React, { Component } from "react";
import Loader from "react-loader-advanced";
import ServerTable from "./ServerList/serverTable";
import ModalConfirm from "../../Commons/modalConfirm";
import ModalRemoveServerConfirm from "../../Commons/modalRemoveServerConfirm";
import ServerModule from "../../../Enums/moduleServerType";

class Servers extends Component {
  state = {
    serverSelected: null,
    modalConfirmStartStopServerTitle: "",
    modalConfirmStarStopServerMessage: "",
    showModalConfirmStartStopServer: false,
    showModalConfirmRemoveServer: false
  };

  componentWillMount() {
    this.props.getServers();
    this.props.getHumanServers();
    this.props.getFaceRecognitionServers();
    this.props.getLicensePlateRecognitionServers();
  }

  // Start/stop server
  handleCloseModalConfirmStartStopServer = () => {
    this.setState({ showModalConfirmStartStopServer: false });
  };

  handleModalConfirmStartStropServerOk = () => {
    let server = this.state.serverSelected;
    switch (server.serverModule) {
      case ServerModule.HUMAN_PROCESSOR:
        if (server.status === "stop") {
          this.props.startHumanServer(server.id);
        } else {
          this.props.stopHumanServer(server.id);
        }
        break;
      case ServerModule.FACE_PROCESSOR:
        if (server.status === "stop") {
          this.props.startFaceRecognitionServer(server.id);
        } else {
          this.props.stopFaceRecognitionServer(server.id);
        }
        break;
      case ServerModule.LICENSE_PLATE_PROCESSOR:
        if (server.status === "stop") {
          this.props.startLicensePlateRecognitionServer(server.id);
        } else {
          this.props.stopLicensePlateRecognitionServer(server.id);
        }
        break;
      default:
        if (server.status === "stop") {
          this.props.startServer(server.id);
        } else {
          this.props.stopServer(server.id);
        }
        break;
    }
    this.setState({
      showModalConfirmStartStopServer: false,
      serverSelected: null
    });
  };

  onStartStopServer = server => {
    this.setState({
      serverSelected: server,
      showModalConfirmStartStopServer: true
    });

    if (server.status === "stop") {
      this.setState({
        modalConfirmStartStopServerTitle: "Confirm",
        modalConfirmStarStopServerMessage:
          "Are you sure you want to start this server?"
      });
    } else {
      this.setState({
        modalConfirmStartStopServerTitle: "Confirm",
        modalConfirmStarStopServerMessage:
          "Are you sure you want to stop this server?"
      });
    }
  };

  // Remove server
  handleCloseModalConfirmRemoveServer = () => {
    this.setState({ showModalConfirmRemoveServer: false });
  };

  handleModalConfirmRemoveServerOk = () => {
    let server = this.state.serverSelected;

    switch (server.serverModule) {
      case ServerModule.HUMAN_PROCESSOR:
        this.props.removeHumanServer(server.id);
        break;
      case ServerModule.FACE_PROCESSOR:
        this.props.removeFaceRecognitionServer(server.id);
        break;
      case ServerModule.LICENSE_PLATE_PROCESSOR:
        this.props.removeLicensePlateRecognitionServer(server.id);
        break;
      default:
        this.props.removeServer(server.id);
        break;
    }

    this.setState({
      showModalConfirmRemoveServer: false,
      serverSelected: null
    });
  };

  handeleRemoveServer = server => {
    this.setState({
      serverSelected: server,
      showModalConfirmRemoveServer: true
    });
  };

  render() {
    let { isFetching, servers, humanServers, faceRecognitionServers, licensePlateRecognitionServers } = this.props;
    let serverSelectedIpAddres = this.state.serverSelected
      ? this.state.serverSelected.ipAddress
      : "";

    return (
      <div className="component">
        <div className="component-body">
          <Loader show={isFetching} message={<div className="loader" />}>
            <div className="component-header">Servers</div>
            <ServerTable
              data={servers}
              onStartStopServer={this.onStartStopServer}
              onRemoveServer={this.handeleRemoveServer}
              key={1}
            />
            <div className="component-header">Human Tracking servers</div>
            <ServerTable
              data={humanServers}
              onStartStopServer={this.onStartStopServer}
              onRemoveServer={this.handeleRemoveServer}
              key={2}
            />
            <div className="component-header">Face Recognition servers</div>
            <ServerTable
              data={faceRecognitionServers}
              onStartStopServer={this.onStartStopServer}
              onRemoveServer={this.handeleRemoveServer}
              key={3}
            />
            <div className="component-header">License Plate Recognition servers</div>
            <ServerTable
              data={licensePlateRecognitionServers}
              onStartStopServer={this.onStartStopServer}
              onRemoveServer={this.handeleRemoveServer}
              key={4}
            />
            <ModalConfirm
              show={this.state.showModalConfirmStartStopServer}
              closeModal={this.handleCloseModalConfirmStartStopServer}
              confirm={this.handleModalConfirmStartStropServerOk}
              title={this.state.modalConfirmStartStopServerTitle}
              message={this.state.modalConfirmStarStopServerMessage}
            />
            <ModalRemoveServerConfirm
              show={this.state.showModalConfirmRemoveServer}
              closeModal={this.handleCloseModalConfirmRemoveServer}
              confirm={this.handleModalConfirmRemoveServerOk}
              ipServerAddress={serverSelectedIpAddres}
              title={"Confirm"}
              message={
                "Are you sure you want to remove this server? if yes, please type ip server address [" +
                serverSelectedIpAddres +
                "] in the text box and click Ok  to confirm."
              }
            />
          </Loader>
        </div>
      </div>
    );
  }
}

export default Servers;
