import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Row, Col, Label } from "reactstrap";

class UserTable extends Component {
  state = {
    usersSelected: []
  };

  handleOnUserSelect = (row, isSelect) => {
    let usersSelectedChange;
    if (isSelect) {
      usersSelectedChange = [...this.state.usersSelected, row.id];
      this.setState({
        usersSelected: [...this.state.usersSelected, row.id]
      });
    } else {
      usersSelectedChange = this.state.usersSelected.filter(x => x !== row.id);
      this.setState({
        usersSelected: this.state.usersSelected.filter(x => x !== row.id)
      });
    }
    //Mapping usersSelected to view parent
    this.props.onUsersSelectedChange(usersSelectedChange);
  };

  handleOnUserSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelect) {
      this.setState({
        usersSelected: ids
      });
    } else {
      this.setState({
        usersSelected: []
      });
    }
    //Mapping usersSelected to view parent
    this.props.onUsersSelectedChange(ids);
  };

  render() {
    const columns = [
      {
        dataField: "userName",
        text: "User name",
        sort: true
      },
      {
        dataField: "firstName",
        text: "First name"
      },
      {
        dataField: "lastName",
        text: "Last name"
      },
      {
        dataField: "group",
        text: "Group",
        formatter: groupColumnFormatter
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
        dataField: "role",
        text: "Role"
      },
      {
        dataField: "id",
        text: "",
        headerAlign: "center",
        formatter: userActionFormatter,
        onEditUser: this.props.onEditUser,
        onEditGroupForUser: this.props.onEditGroupForUser,
        headerClasses: "column-action"
      }
    ];

    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      selected: this.state.usersSelected,
      onSelect: this.handleOnUserSelect,
      onSelectAll: this.handleOnUserSelectAll
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
          data={this.props.users}
          columns={columns}
          bordered
          defaultSorted={defaultSorted}
          noDataIndication="No user found"
          hover
          selectRow={selectRow}
        />
      </div>
    );
  }
}

//Custom
function groupColumnFormatter(cell, user) {
  var listGroupName;
  if (user.groups) {
    listGroupName = user.groups.map(group => (
      <Col key={group.id}>
        <Row key={group.id}>
          <Label>[{group.name}]</Label>
        </Row>
      </Col>
    ));
    return listGroupName;
  }
}

function userActionFormatter(cell, user) {
  return (
    <div className="row-action text-center">
      <a
        title="Edit user"
        onClick={() => {
          this.onEditUser(user);
        }}>
        <i className="icon-action fa fa-edit" />
      </a>{" "}
      &nbsp;&nbsp;
      <a
        title="Add user to group"
        onClick={() => {
          this.onEditGroupForUser(user);
        }}>
        <i className="icon-action fa fa-group" />
      </a>
    </div>
  );
}

export default UserTable;
