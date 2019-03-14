import React, { Component } from "react";
import Loader from "react-loader-advanced";
import { Input } from "reactstrap";
import Pagination from "react-js-pagination";

import PeopleTable from "./PeopleList/peopleTable";
import PeopleForm from "./PeopleDetail/peopleForm";
import ModalConfirm from "../../Commons/modalConfirm";
import { PAGE_SIZE, PAGE_ONE } from "../../Utils/constant";

class People extends Component {
  state = {
    activePage: 1,
    searchKeyWord: "",
    isEditOrAddPeople: false,
    peopleEdit: null,
    showModalConfirmDeletePeople: false,
    peoplesSelected: []
  };

  componentWillMount() {
    this.props.getPeoples("", PAGE_ONE, PAGE_SIZE);
  }

  componentWillReceiveProps(newProps) {
    if (
      this.state.isEditOrAddPeople === true &&
      newProps.addOrUpdatePeopleFailed === false
    ) {
      this.setState({
        isEditOrAddPeople: false,
        peopleEdit: null
      });
    }
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
    this.props.getPeoples(this.state.searchKeyWord, pageNumber, PAGE_SIZE);
  };

  // People
  handleFormPeopleSubmit = (people, images) => {
    if (this.state.peopleEdit) {
      this.props.updatePeople(people, images);
    } else {
      this.props.addPeople(people, images);
    }
  };

  handleDeleteImage = imageId => {
    this.props.deletePeopleImage(this.state.peopleEdit.id, imageId);
  };

  // Delete people
  handlePeoplesSelectedChange = peoplesSelected => {
    this.setState({ peoplesSelected: peoplesSelected });
  };

  handleCloseModalConfirmDeletePeople = () => {
    this.setState({ showModalConfirmDeletePeople: false });
  };

  handleModalConfirmDeletePeopleOk = () => {
    this.props.deletePeoples(this.state.peoplesSelected);
    this.setState({ showModalConfirmDeletePeople: false, peoplesSelected: [] });
  };

  //Search
  handleSearchKeyWordChange = e => {
    this.setState({
      searchKeyWord: e.target.value,
      activePage: 1
    });
    if (e.target.value === "") {
      this.props.getPeoples("", PAGE_ONE, PAGE_SIZE);
    }
  };

  handleSearchPeople = () => {
    this.props.getPeoples(this.state.searchKeyWord, PAGE_ONE, PAGE_SIZE);
  };

  // Update UI
  handeleOpenEditPeopleUI = peopleEdit => {
    this.setState({ isEditOrAddPeople: true, peopleEdit: peopleEdit });
  };

  handleOpenAddPeopleUI = () => {
    this.setState({ isEditOrAddPeople: true, peopleEdit: null });
  };

  handleCloseAddOrEditUI = () => {
    this.setState({
      isEditOrAddPeople: false,
      peopleEdit: null
    });
  };

  render() {
    let { isFetching, people, totalPages } = this.props;
    let {
      isEditOrAddPeople,
      peopleEdit,
      peoplesSelected,
      searchKeyWord,
      showModalConfirmDeletePeople,
      activePage
    } = this.state;

    if (isEditOrAddPeople) {
      if (peopleEdit) {
        return (
          <Loader show={isFetching} message={<div className="loader" />}>
            <PeopleForm
              people={peopleEdit}
              onFormPeopleSubmit={this.handleFormPeopleSubmit}
              onDeleteImage={this.handleDeleteImage}
              closeAddOrEditUI={this.handleCloseAddOrEditUI}
            />
          </Loader>
        );
      }
      return (
        <Loader show={isFetching} message={<div className="loader" />}>
          <PeopleForm
            onFormPeopleSubmit={this.handleFormPeopleSubmit}
            closeAddOrEditUI={this.handleCloseAddOrEditUI}
          />
        </Loader>
      );
    } else {
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
                          this.handleOpenAddPeopleUI();
                        }}>
                        Add face
                      </a>
                    </li>
                    <li className={peoplesSelected.length > 0 ? "" : "hide"}>
                      <a
                        onClick={() => {
                          this.setState({ showModalConfirmDeletePeople: true });
                        }}>
                        Remove face
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
                    placeholder="Search by first name, last name"
                    onChange={this.handleSearchKeyWordChange}
                    value={searchKeyWord}
                    className="form-control"
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => {
                        this.handleSearchPeople();
                      }}>
                      <i className="fa fa-search" />
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <Loader show={isFetching} message={<div className="loader" />}>
              <PeopleTable
                people={people}
                onEditPeople={this.handeleOpenEditPeopleUI}
                onpeopleSelectedChange={this.handlePeoplesSelectedChange}
              />
              <ModalConfirm
                show={showModalConfirmDeletePeople}
                closeModal={this.handleCloseModalConfirmDeletePeople}
                confirm={this.handleModalConfirmDeletePeopleOk}
                title={"Confirm"}
                message={"Are you sure you want to delete the selection?"}
              />
              {
                totalPages>1?(<nav>
                  <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={activePage}
                    itemsCountPerPage={PAGE_SIZE}
                    totalItemsCount={totalPages * PAGE_SIZE}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                  />
                </nav>):""
              }
            </Loader>
          </div>
        </div>
      );
    }
  }
}

export default People;
