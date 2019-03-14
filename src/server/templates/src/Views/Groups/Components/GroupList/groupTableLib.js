import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";

class GroupTable extends Component {
  state = {
    groupsSelected: []
  };

  handleOnGroupSelect = (row, isSelect) => {
    let groupsSelectedChange;
    if (isSelect) {
      groupsSelectedChange = [...this.state.groupsSelected, row.id];
      this.setState({
        groupsSelected: [...this.state.groupsSelected, row.id]
      });
    } else {
      groupsSelectedChange = this.state.groupsSelected.filter(
        x => x !== row.id
      );
      this.setState({
        groupsSelected: this.state.groupsSelected.filter(x => x !== row.id)
      });
    }
    //Mapping groupsSelected to view parent
    this.props.onGroupsSelectedChange(groupsSelectedChange);
  };

  handleOnGroupSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelect) {
      this.setState({
        groupsSelected: ids
      });
    } else {
      this.setState({
        groupsSelected: []
      });
    }
    //Mapping groupsSelected to view parent
    this.props.onGroupsSelectedChange(ids);
  };

  render() {
    const columns = [
      {
        dataField: "name",
        text: "Name",
        sort: true
      },
      {
        dataField: "id",
        text: "",
        headerAlign: "center",
        formatter: userActionFormatter,
        onEditGroup: this.props.onEditGroup,
        onEditUserForGroup: this.props.onEditUserForGroup,
        headerClasses: "column-action"
      }
    ];

    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      selected: this.state.groupsSelected,
      onSelect: this.handleOnGroupSelect,
      onSelectAll: this.handleOnGroupSelectAll
    };

    const defaultSorted = [
      {
        dataField: "name",
        order: "desc"
      }
    ];

    return (
      <div className="table-responsive">
        <BootstrapTable
          keyField="id"
          data={this.props.groups}
          columns={columns}
          bordered
          defaultSorted={defaultSorted}
          noDataIndication="No user group found"
          hover
          selectRow={selectRow}
        />
      </div>
    );
  }
}

function userActionFormatter(cell, group) {
  return (
    <div className="row-action text-center">
      <a
        onClick={() => {
          this.onEditGroup(group);
        }}>
        <i className="icon-action fa fa-edit" />
      </a>
      &nbsp;&nbsp;
      <a
        onClick={() => {
          this.onEditUserForGroup(group);
        }}>
        <i className="fa fa-group" />
      </a>
    </div>
  );
}

export default GroupTable;
