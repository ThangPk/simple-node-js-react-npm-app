import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";

class PeopleTable extends Component {
  state = {
    peopleSelected: []
  };

  handleOnPeopleSelect = (row, isSelect) => {
    let peopleSelectedChange;
    if (isSelect) {
      peopleSelectedChange = [...this.state.peopleSelected, row.id];
      this.setState({
        peopleSelected: [...this.state.peopleSelected, row.id]
      });
    } else {
      peopleSelectedChange = this.state.peopleSelected.filter(
        x => x !== row.id
      );
      this.setState({
        peopleSelected: this.state.peopleSelected.filter(x => x !== row.id)
      });
    }
    //Mapping peopleSelected to view parent
    this.props.onpeopleSelectedChange(peopleSelectedChange);
  };

  handleOnPeopleSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelect) {
      this.setState({
        peopleSelected: ids
      });
    } else {
      this.setState({
        peopleSelected: []
      });
    }
    //Mapping peopleSelected to view parent
    this.props.onpeopleSelectedChange(ids);
  };

  render() {
    const columns = [
      {
        dataField: "firstName",
        text: "First name"
      },
      {
        dataField: "lastName",
        text: "Last name"
      },

      {
        dataField: "email",
        text: "Email"
      },
      {
        dataField: "phoneNumber",
        text: "Phone number"
      },
      {
        dataField: "id",
        text: "",
        headerAlign: "center",
        formatter: peopleActionFormatter,
        onEditPeople: this.props.onEditPeople,
        headerClasses: "column-action"
      }
    ];

    const selectRow = {
      mode: "checkbox",
      clickToSelect: false,
      selected: this.state.peopleSelected,
      onSelect: this.handleOnPeopleSelect,
      onSelectAll: this.handleOnPeopleSelectAll
    };

    const defaultSorted = [
      {
        dataField: "userName",
        order: "desc"
      }
    ];

    return (
      <div className="table-responsive">
        <BootstrapTable
          keyField="id"
          data={this.props.people}
          columns={columns}
          bordered
          defaultSorted={defaultSorted}
          noDataIndication="No face found"
          hover
          selectRow={selectRow}
        />
      </div>
    );
  }
}

//Custom
function peopleActionFormatter(cell, people) {
  return (
    <div className="row-action text-center">
      <a
        title="Edit face"
        onClick={() => {
          this.onEditPeople(people);
        }}>
        <i className="icon-action fa fa-edit" />
      </a>{" "}
    </div>
  );
}

export default PeopleTable;
