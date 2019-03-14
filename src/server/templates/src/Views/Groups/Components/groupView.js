import React, { Component } from "react";
import { Input } from "reactstrap";
import Loader from "react-loader-advanced";
import Pagination from "react-js-pagination";

import ModalConfirm from "../../Commons/modalConfirm";
import GroupTable from "./GroupList/groupTableLib";
import GroupForm from "./GroupDetail/groupForm";
import UserForGroup from "./UserForGroup/userForGroup";
import { PAGE_ONE, PAGE_SIZE } from "../../Utils/constant";

class Groups extends Component {
  state = {
    activePage: 1,
    searchKeyWord: "",
    isEditOrAddGroup: false,
    isEditUserForGroup: false,
    groupEdit: null,
    groupsSelected: [],
    showModalConfirmDeleteGroup: false
  };

  componentWillMount() {
    this.props.getAllUsers("");
    this.props.getGroups("", PAGE_ONE, PAGE_SIZE);
  }

  componentWillReceiveProps(newProps) {
    if (
      this.state.isEditOrAddGroup === true &&
      newProps.addOrUpdateGroupFailed === false
    ) {
      this.setState({
        isEditOrAddGroup: false,
        groupEdit: null
      });
    }
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
    this.props.getGroups(this.state.searchKeyWord, pageNumber, PAGE_SIZE);
  };

  //Search
  handleSearchKeyWordChange = e => {
    this.setState({
      searchKeyWord: e.target.value,
      activePage: 1
    });
    if (e.target.value === "") {
      this.props.getGroups("", PAGE_ONE, PAGE_SIZE);
    }
  };

  handleSearchGroup = () => {
    this.props.getGroups(this.state.searchKeyWord, PAGE_ONE, PAGE_SIZE);
  };

  //Delete Group
  handleGroupsSelectedChange = groupsSelected => {
    this.setState({ groupsSelected: groupsSelected });
  };

  handleCloseModalConfirmDeleteGroup = () => {
    this.setState({ showModalConfirmDeleteGroup: false });
  };

  handleModalConfirmDeleteGroupOk = () => {
    this.props.deleteGroup(this.state.groupsSelected);
    this.setState({ showModalConfirmDeleteGroup: false, groupsSelected: [] });
  };

  // Group
  handleFormGroupSubmit = group => {
    if (this.state.groupEdit) {
      this.props.updateGroup(group);
    } else {
      this.props.addGroup(group.groupName);
    }
  };

  // User
  handleSearchAllUsers = keyword => {
    this.props.getAllUsers(keyword);
  };

  handleUserForGroupSubmitRemoveUsers = users => {
    this.props.removeMembersInGroup(this.state.groupEdit.id, users);
  };

  handleUserForGroupSubmitAddUsers = users => {
    this.props.addMembersToGroups(this.state.groupEdit.id, users);
  };

  // Update UI
  handeleOpenEditGroupUI = groupEdit => {
    this.setState({ isEditOrAddGroup: true, groupEdit: groupEdit });
  };

  handleOpenAddGroupUI = () => {
    this.setState({ isEditOrAddGroup: true, groupEdit: null });
  };

  handleCloseAddOrEditUI = () => {
    this.setState({
      isEditOrAddGroup: false,
      groupEdit: null,
      groupsSelected: []
    });
  };

  handleCloseEditUserForGroupUI = () => {
    this.setState({
      isEditGroupForUser: false,
      currentGroupsForUser: [],
      groupsSelected: []
    });
    this.props.getAllUsers("");
  };

  handleOpenEditUserForGroupUI = group => {
    this.setState({ isEditGroupForUser: true, groupEdit: group });
  };

  render() {
    let { isFetching, allUsers, data } = this.props;
    let {
      groupsSelected,
      groupEdit,
      isEditGroupForUser,
      isEditOrAddGroup
    } = this.state;

    if (isEditGroupForUser) {
      let group = data.find(group => group.id === groupEdit.id);
      return (
        <Loader show={isFetching} message={<div className="loader" />}>
          <UserForGroup
            group={group}
            allUsers={allUsers}
            closeEditUserForGroupUI={this.handleCloseEditUserForGroupUI}
            onUserForGroupSubmitRemoveUsers={
              this.handleUserForGroupSubmitRemoveUsers
            }
            onUserForGroupSubmitAddUsers={this.handleUserForGroupSubmitAddUsers}
            onSearchAllUsers={this.handleSearchAllUsers}
          />
        </Loader>
      );
    }

    if (isEditOrAddGroup) {
      if (groupEdit) {
        return (
          <Loader show={isFetching} message={<div className="loader" />}>
            <GroupForm
              id={groupEdit.id}
              groupName={groupEdit.name}
              onFormGroupSubmit={this.handleFormGroupSubmit}
              closeAddOrEditUI={this.handleCloseAddOrEditUI}
            />
          </Loader>
        );
      }
      return (
        <Loader show={isFetching} message={<div className="loader" />}>
          <GroupForm
            onFormGroupSubmit={this.handleFormGroupSubmit}
            closeAddOrEditUI={this.handleCloseAddOrEditUI}
          />
        </Loader>
      );
    } else {
      let { isFetching, data, totalPages } = this.props;
      let {
        searchKeyWord,
        activePage,
        showModalConfirmDeleteGroup
      } = this.state;

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
                          this.handleOpenAddGroupUI();
                        }}>
                        Add group
                      </a>
                    </li>
                    <li className={groupsSelected.length > 0 ? "" : "hide"}>
                      <a
                        onClick={() => {
                          this.setState({ showModalConfirmDeleteGroup: true });
                        }}>
                        Remove group(s)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-8">
                {" "}
                <div className="input-group search-box">
                  <Input
                    type="text"
                    id="searchKeywork"
                    placeholder="Search by name"
                    onChange={this.handleSearchKeyWordChange}
                    value={searchKeyWord}
                    className="form-control"
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => {
                        this.handleSearchGroup();
                      }}>
                      <i className="fa fa-search" />
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <Loader show={isFetching} message={<div className="loader" />}>
              <GroupTable
                groups={data}
                onEditGroup={this.handeleOpenEditGroupUI}
                onEditUserForGroup={this.handleOpenEditUserForGroupUI}
                onGroupsSelectedChange={this.handleGroupsSelectedChange}
              />
              <ModalConfirm
                show={showModalConfirmDeleteGroup}
                closeModal={this.handleCloseModalConfirmDeleteGroup}
                confirm={this.handleModalConfirmDeleteGroupOk}
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

export default Groups;
