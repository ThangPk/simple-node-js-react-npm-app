import React, { Component } from "react";
import { Input } from "reactstrap";
import ModalConfirm from "../../Commons/modalConfirm";
import UserTable from "./UserList/userTable";
import Loader from "react-loader-advanced";
import Pagination from "react-js-pagination";
import UserForm from "./UserDetail/userForm";
import AddGroupForUser from "./GroupForUser/groupForUser";
import { PAGE_SIZE, PAGE_ONE } from "../../Utils/constant";

class Users extends Component {
  state = {
    activePage: 1,
    searchKeyWord: "",
    isEditOrAddUser: false,
    isEditGroupForUser: false,
    userEdit: null,
    usersSelected: [],
    showModalConfirmDeleteUser: false
  };

  componentWillMount() {
    this.props.getAllGroups("");
    this.props.getUsers("", PAGE_ONE, PAGE_SIZE);
  }

  componentWillReceiveProps(newProps) {
    if (
      this.state.isEditOrAddUser === true &&
      newProps.addOrUpdateUserFailed === false
    ) {
      this.setState({
        isEditOrAddUser: false,
        userEdit: null,
        usersSelected: []
      });
    }
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
    this.props.getUsers(this.state.searchKeyWord, pageNumber, PAGE_SIZE);
  };

  //Delete User
  handleUsersSelectedChange = usersSelected => {
    this.setState({ usersSelected: usersSelected });
  };

  handleCloseModalConfirmDeleteUser = () => {
    this.setState({ showModalConfirmDeleteUser: false });
  };

  handleModalConfirmDeleteUserOk = () => {
    this.props.deleteUser(this.state.usersSelected);
    this.setState({ showModalConfirmDeleteUser: false, usersSelected: [] });
  };

  //Search
  handleSearchKeyWordChange = e => {
    this.setState({ searchKeyWord: e.target.value, activePage: 1 });
    if (e.target.value === "") {
      this.props.getUsers("", PAGE_ONE, PAGE_SIZE);
    }
  };

  handleSearchUser = () => {
    this.props.getUsers(this.state.searchKeyWord, PAGE_ONE, PAGE_SIZE);
  };

  //User
  handleFormUserSubmit = user => {
    if (this.state.userEdit) {
      this.props.updateUser(user);
    } else {
      this.props.addUser(user);
    }
  };

  //Group
  handleGroupForUserSubmitAddGroups = groups => {
    this.props.addUserToGroups(this.state.userEdit.id, groups);
  };

  handleGroupForUserSubmitRemoveGroups = groups => {
    this.props.removeUserInGroups(this.state.userEdit.id, groups);
  };

  handleSearchAllGroups = keyword => {
    this.props.getAllGroups(keyword);
  };

  // Update UI
  handeleOpenEditUserUI = user => {
    this.setState({ isEditOrAddUser: true, userEdit: user });
  };

  handleOpenAddUserUI = () => {
    this.setState({ isEditOrAddUser: true, userEdit: null });
  };

  handleCloseAddOrEditUI = () => {
    this.setState({
      isEditOrAddUser: false,
      userEdit: null,
      usersSelected: []
    });
  };

  handleCloseEditGroupForUserUI = () => {
    this.setState({
      isEditGroupForUser: false,
      userEdit: null,
      usersSelected: []
    });
    this.props.getAllGroups("");
  };

  handleOpenEditGroupForUser = user => {
    this.setState({ isEditGroupForUser: true, userEdit: user });
  };

  render() {
    let {
      isEditOrAddUser,
      isEditGroupForUser,
      usersSelected,
      userEdit,
      searchKeyWord,
      activePage,
      showModalConfirmDeleteUser
    } = this.state;

    let { isFetching } = this.props;

    if (isEditGroupForUser) {
      let user = this.props.data.find(user => user.id === userEdit.id);
      return (
        <Loader show={isFetching} message={<div className="loader" />}>
          <AddGroupForUser
            user={user}
            allGroups={this.props.allGroups}
            closeEditGroupForUserUI={this.handleCloseEditGroupForUserUI}
            onGroupForUserSubmitAddGroups={
              this.handleGroupForUserSubmitAddGroups
            }
            onGroupForUserSubmitRemoveGroups={
              this.handleGroupForUserSubmitRemoveGroups
            }
            onSearchAllGroups={this.handleSearchAllGroups}
          />
        </Loader>
      );
    }

    if (isEditOrAddUser) {
      if (userEdit) {
        return (
          <Loader show={isFetching} message={<div className="loader" />}>
            <UserForm
              user={userEdit}
              onFormUserSubmit={this.handleFormUserSubmit}
              closeAddOrEditUI={this.handleCloseAddOrEditUI}
            />
          </Loader>
        );
      }
      return (
        <Loader show={isFetching} message={<div className="loader" />}>
          <UserForm
            onFormUserSubmit={this.handleFormUserSubmit}
            closeAddOrEditUI={this.handleCloseAddOrEditUI}
          />
        </Loader>
      );
    } else {
      let { isFetching, data, totalPages } = this.props;

      return (
        <div className="component">
          <div className="component-body">
            <div className="row">
              <div className="col-md-4">
                <div className="action-top clearfix">
                  <ul className="clearfix with-search-box">
                    <li>
                      <a
                        onClick={() => {
                          this.handleOpenAddUserUI();
                        }}>
                        Add user
                      </a>
                    </li>
                    <li className={usersSelected.length > 0 ? "" : "hide"}>
                      <a
                        onClick={() => {
                          this.setState({ showModalConfirmDeleteUser: true });
                        }}>
                        Remove user(s)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-8">
                <div className="input-group search-box">
                  <Input
                    type="text"
                    id="searchKeywork"
                    placeholder="Search by first name, last name or user name"
                    onChange={this.handleSearchKeyWordChange}
                    value={searchKeyWord}
                    className="form-control"
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => {
                        this.handleSearchUser();
                      }}>
                      <i className="fa fa-search" />
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <Loader show={isFetching} message={<div className="loader" />}>
              <UserTable
                users={data}
                onEditUser={this.handeleOpenEditUserUI}
                onEditGroupForUser={this.handleOpenEditGroupForUser}
                onUsersSelectedChange={this.handleUsersSelectedChange}
              />
              <ModalConfirm
                show={showModalConfirmDeleteUser}
                closeModal={this.handleCloseModalConfirmDeleteUser}
                confirm={this.handleModalConfirmDeleteUserOk}
                title={"Confirm"}
                message={"Are you sure you want to delete the selection?"}
              />
              {totalPages > 1 ? (
                <nav>
                  <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={activePage}
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

export default Users;
