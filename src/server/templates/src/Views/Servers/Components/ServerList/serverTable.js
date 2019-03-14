import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";

class ServerTable extends Component {
  render() {
    const columns = [
      {
        dataField: "ipAddress",
        text: "Ip address"
      },
      {
        dataField: "isMaster",
        text: "Master",
        headerClasses: "master"
      },
      {
        dataField: "status",
        text: "Status",
        headerClasses: "status",
        classes: status => {
          if (status === "stop") {
            return "stop";
          } else if (status === "running") {
            return "running";
          }
          return "";
        }
      },
      {
        dataField: "",
        text: "",
        headerAlign: "center",
        formatter: serverActionFormatter,
        onRemoveServer: this.props.onRemoveServer,
        onStartStopServer: this.props.onStartStopServer,
        headerClasses: "column-action"
      }
    ];

    return (
      <div className="table-responsive table-server">
        <BootstrapTable
          keyField="id"
          data={this.props.data}
          columns={columns}
          noDataIndication="No server found"
          bordered
          hover
        />
      </div>
    );
  }
}

//Custom
function serverActionFormatter(cell, server) {  
  let startStopIcon;
  if (server.enabled && server.status === "running") {
    startStopIcon = "icon-action fa fa-stop stop";
  } else if (!server.enabled && server.status === "stop") {
    startStopIcon = "icon-action fa fa-play start";
  } else {
    startStopIcon = "icon-action fa fa-stop stop invisible";
  }

  return (
    <div className="row-action text-center">
      <a
        className={
          startStopIcon.includes("invisible") ? "invisible" : "start-stop"
        }
        onClick={() => {
          this.onStartStopServer(server);
        }}>
        <i className={startStopIcon} />
      </a>
      <a
        className="remove"
        onClick={() => {
          this.onRemoveServer(server);
        }}>
        <i className="icon-action fa fa-remove" />
      </a>
    </div>
  );
}

export default ServerTable;
