import React, { Component } from "react";
import Loader from "react-loader-advanced";
import { Input } from "reactstrap";
import Pagination from "react-js-pagination";

import LicensePlateTable from "./LicensePlateList/licensePlateTable";
import LicensePlateForm from "./LicensePlateDetail/licensePlateForm";
import ModalConfirm from "../../Commons/modalConfirm";
import { PAGE_SIZE, PAGE_ONE, DOWNLOAD_TEMPLETE_LICENSE_PLATE_CSV_URL } from "../../Utils/constant";

class LicensePlate extends Component {
  state = {
    activePage: 1,
    searchKeyWord: "",
    isEditOrAddLicensePlate: false,
    licensePlateEdit: null,
    showModalConfirmDeleteLicensePlate: false,
    licensePlatesSelected: [],
    licensePlateImportFile: null,
  };

  componentWillMount() {
    this.props.getLicensePlates("", PAGE_ONE, PAGE_SIZE);
  }

  componentWillReceiveProps(newProps) {
    if (
      this.state.isEditOrAddLicensePlate === true &&
      newProps.addOrUpdateLicensePlateFailed === false
    ) {
      this.setState({
        isEditOrAddLicensePlate: false,
        licensePlateEdit: null
      });
    }
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
    this.props.getLicensePlates(this.state.searchKeyWord, pageNumber, PAGE_SIZE);
  };

  handleLicensePlateFileImportchangeValue = event => {
    this.setState({ licensePlateImportFile: event.target.files[0] });
    this.props.importLicensePlateListFile(event.target.files[0]);
  };

  // License plate
  handleFormLicensePlateSubmit = licensePlate => {
    this.props.saveLicensePlate(licensePlate);
  };

  // Delete license plate
  handlelicensePlatesSelectedChange = licensePlatesSelected => {
    this.setState({ licensePlatesSelected: licensePlatesSelected });
  };

  handleCloseModalConfirmDeleteLicensePlate = () => {
    this.setState({ showModalConfirmDeleteLicensePlate: false });
  };

  handleModalConfirmDeleteLicensePlateOk = () => {
    this.props.removeLicensePlate(this.state.licensePlatesSelected);
    this.setState({
      showModalConfirmDeleteLicensePlate: false,
      licensePlatesSelected: []
    });
  };

  //Search
  handleSearchKeyWordChange = e => {
    this.setState({
      searchKeyWord: e.target.value,
      activePage: 1
    });
    if (e.target.value === "") {
      this.props.getLicensePlates("", PAGE_ONE, PAGE_SIZE);
    }
  };

  handleSearchLicensePlate = () => {
    this.props.getLicensePlates(this.state.searchKeyWord, PAGE_ONE, PAGE_SIZE);
  };

  // Update UI
  handeleOpenEditLicensePlateUI = licensePlateEdit => {
    this.setState({
      isEditOrAddLicensePlate: true,
      licensePlateEdit: licensePlateEdit
    });
  };

  handleOpenAddLicensePlateUI = () => {
    this.setState({ isEditOrAddLicensePlate: true, licensePlateEdit: null });
  };

  handleCloseAddOrEditUI = () => {
    this.setState({
      isEditOrAddLicensePlate: false,
      licensePlateEdit: null
    });
  };

  render() {
    let { isFetching, licensePlates, totalPages } = this.props;
    let {
      isEditOrAddLicensePlate,
      licensePlateEdit,
      licensePlatesSelected,
      searchKeyWord,
      showModalConfirmDeleteLicensePlate,
      activePage
    } = this.state;

    if (isEditOrAddLicensePlate) {
      if (licensePlateEdit) {
        return (
          <Loader show={isFetching} message={<div className="loader" />}>
            <LicensePlateForm
              licensePlate={licensePlateEdit}
              onFormLicensePlateSubmit={this.handleFormLicensePlateSubmit}
              closeAddOrEditUI={this.handleCloseAddOrEditUI}
            />
          </Loader>
        );
      }
      return (
        <Loader show={isFetching} message={<div className="loader" />}>
          <LicensePlateForm
            onFormLicensePlateSubmit={this.handleFormLicensePlateSubmit}
            closeAddOrEditUI={this.handleCloseAddOrEditUI}
          />
        </Loader>
      );
    } else {
      return (
        <div className="component">
          <div className="license-plate-import">
            <div className="file-upload btn btn-primary">
              <span>Upload csv file</span>
              <Input
                type="file"
                id="file-upload"
                className="upload"
                accept=".csv"
                onChange={this.handleLicensePlateFileImportchangeValue}
              />
            </div>
            <span>{this.state.licensePlateImportFile && this.state.licensePlateImportFile.name}</span>
            <div className="empty" />
            <div>
              <a href={DOWNLOAD_TEMPLETE_LICENSE_PLATE_CSV_URL}>Download</a> the
              template csv file
            </div>
          </div>
          <div className="component-body">
            <div className="row">
              <div className="col-md-4">
                <div className="action-top clearfix">
                  <ul className="clearfix with-search-box">
                    <li>
                      <a
                        onClick={() => {
                          this.handleOpenAddLicensePlateUI();
                        }}>
                        Add license plate
                      </a>
                    </li>
                    <li
                      className={
                        licensePlatesSelected.length > 0 ? "" : "hide"
                      }>
                      <a
                        onClick={() => {
                          this.setState({
                            showModalConfirmDeleteLicensePlate: true
                          });
                        }}>
                        Remove license plate(s)
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
                        this.handleSearchLicensePlate();
                      }}>
                      <i className="fa fa-search" />
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <Loader show={isFetching} message={<div className="loader" />}>
              <LicensePlateTable
                licensePlates={licensePlates}
                onEditLicensePlate={this.handeleOpenEditLicensePlateUI}
                onLicensePlatesSelectedChange={
                  this.handlelicensePlatesSelectedChange
                }
              />
              <ModalConfirm
                show={showModalConfirmDeleteLicensePlate}
                closeModal={this.handleCloseModalConfirmDeleteLicensePlate}
                confirm={this.handleModalConfirmDeleteLicensePlateOk}
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

export default LicensePlate;
