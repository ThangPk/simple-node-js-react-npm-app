import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";

class NotificationRuleTable extends Component {
  state = {
    notificationRulesSelected: []
  };

  handleOnNotificationRuleSelect = (row, isSelect) => {
    let notifiactionRulesSelectedChange;
    if (isSelect) {
      notifiactionRulesSelectedChange = [...this.state.notificationRulesSelected, row.id];
      this.setState({
        notificationRulesSelected: [...this.state.notificationRulesSelected, row.id]
      });
    } else {
      notifiactionRulesSelectedChange = this.state.notificationRulesSelected.filter(
        x => x !== row.id
      );
      this.setState({
        notificationRulesSelected: this.state.notificationRulesSelected.filter(x => x !== row.id)
      });
    }
    //Mapping notification rules selected to view parent
    this.props.onNotificationRulesSelectedChange(notifiactionRulesSelectedChange);
  };

  handleOnNotificationRuleSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelect) {
      this.setState({
        notificationRulesSelected: ids
      });
    } else {
      this.setState({
        notificationRulesSelected: []
      });
    }
    //Mapping notification rules selected to view parent
    this.props.onNotificationRulesSelectedChange(ids);
  };

  render() {
    const columns = [
      {
        dataField: "cameraName",
        text: "Camera"
      },
      {
        dataField: "aiTypeText",
        text: "Ai type"
      },

      {
        dataField: "notificationTypeText",
        text: "Notification type"
      },
      {
        dataField: "notificationDataText",
        text: "Notification data"
      },
      {
        dataField: "id",
        text: "",
        headerAlign: "center",
        formatter: notificationRuleActionFormatter,
        onEditNotificationRule: this.props.onEditNotificationRule,
        headerClasses: "column-action"
      }
    ];

    const selectRow = {
      mode: "checkbox",
      clickToSelect: false,
      selected: this.state.notificationRulesSelected,
      onSelect: this.handleOnNotificationRuleSelect,
      onSelectAll: this.handleOnNotificationRuleSelectAll
    };

    const defaultSorted = [
      {
        dataField: "cameraName",
        order: "desc"
      }
    ];
    console.log("Notifiation Rule table: " + this.props.notificationRules);
    return (
      
      <div className="table-responsive">
        <BootstrapTable
          keyField="id"
          data={this.props.notificationRules}
          columns={columns}
          bordered
          defaultSorted={defaultSorted}
          noDataIndication="No notification rule found"
          hover
          selectRow={selectRow}
        />
      </div>
    );
  }
}

//Custom
function notificationRuleActionFormatter(cell, notificationRule) {
  return (
    <div className="row-action text-center">
      <a
        title="Edit notification rule"
        onClick={() => {
          this.onEditNotificationRule(notificationRule);
        }}>
        <i className="icon-action fa fa-edit" />
      </a>{" "}
    </div>
  );
}

export default NotificationRuleTable;
