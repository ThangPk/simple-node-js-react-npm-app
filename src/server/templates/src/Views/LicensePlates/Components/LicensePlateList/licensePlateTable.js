import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";

class LicensePlateTable extends Component {
  state = {
    licensePlatesSelected: []
  };

  handleOnLicensePlateSelect = (row, isSelect) => {
    let licensePlatesSelectedChange;
    if (isSelect) {
      licensePlatesSelectedChange = [
        ...this.state.licensePlatesSelected,
        row.id
      ];
      this.setState({
        licensePlatesSelected: [...this.state.licensePlatesSelected, row.id]
      });
    } else {
      licensePlatesSelectedChange = this.state.licensePlatesSelected.filter(
        x => x !== row.id
      );
      this.setState({
        licensePlatesSelected: this.state.licensePlatesSelected.filter(
          x => x !== row.id
        )
      });
    }
    //Mapping licensePlatesSelected to view parent
    this.props.onLicensePlatesSelectedChange(licensePlatesSelectedChange);
  };

  handleOnLicensePlateSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelect) {
      this.setState({
        licensePlatesSelected: ids
      });
    } else {
      this.setState({
        licensePlatesSelected: []
      });
    }
    //Mapping licensePlatesSelected to view parent
    this.props.onLicensePlatesSelectedChange(ids);
  };

  render() {
    const columns = [
      {
        dataField: "value",
        text: "Value"
      },
      {
        dataField: "id",
        text: "",
        headerAlign: "center",
        formatter: licensePlateActionFormatter,
        onEditLicensePlate: this.props.onEditLicensePlate,
        headerClasses: "column-action"
      }
    ];

    const selectRow = {
      mode: "checkbox",
      clickToSelect: false,
      selected: this.state.licensePlatesSelected,
      onSelect: this.handleOnLicensePlateSelect,
      onSelectAll: this.handleOnLicensePlateSelectAll
    };

    const defaultSorted = [
      {
        dataField: "value",
        order: "desc"
      }
    ];

    return (
      <div className="table-responsive">
        <BootstrapTable
          keyField="id"
          data={this.props.licensePlates}
          columns={columns}
          bordered
          defaultSorted={defaultSorted}
          noDataIndication="No license plate found"
          hover
          selectRow={selectRow}
        />
      </div>
    );
  }
}

//Custom
function licensePlateActionFormatter(cell, licensePlate) {
  return (
    <div className="row-action text-center">
      <a
        title="Edit face"
        onClick={() => {
          this.onEditLicensePlate(licensePlate);
        }}>
        <i className="icon-action fa fa-edit" />
      </a>{" "}
    </div>
  );
}

export default LicensePlateTable;
