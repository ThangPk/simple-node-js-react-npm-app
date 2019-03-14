import React, { Component } from "react";
import { Button, Input } from "reactstrap";
import Loader from "react-loader-advanced";
import Formsy from "formsy-react";
import ModalPreviewCamera from "../../Commons/modalPreviewCamera";
import MyCheckbox from "../../Commons/checkbox";

class CameraPermissionsView extends Component {
  state = {
    searchKeyWord: "",
    groupSelected: null,
    cameraPermissionSelected: null,
    showPreviewCamera: false,
    previewCameraHeader: "Camera preview",
    imagePreviewUrl: ""
  };

  componentWillMount() {
    this.props.getAllGroups("");
    this.props.getAllCameras("");
  }

  handleClosePreviewCamera = () => {
    this.setState({ 
      imagePreviewUrl: null,
      showPreviewCamera: false });
  };
  
  handeShowPreviewCamera = cameraPermission => {
    console.log(cameraPermission)
    this.setState({
      previewCameraHeader: "Camera: " + cameraPermission.cameraName,
      showPreviewCamera: true,
      imagePreviewUrl: cameraPermission.imageSubUrl
    })
  }

  handleSearchKeyWordChange = e => {
    this.setState({ searchKeyWord: e.target.value });
  };

  handleListCameraByCategory = nodeId => {
    this.props.listCameraByCategory(nodeId);
  };

  handleGroupItemClick = groupId => {
    this.setState({ groupSelected: groupId, cameraPermissionSelected: null });
    this.props.listPermissionByGroup(groupId);
  };

  handleCameraItemClick = cameraPermission => {
    this.setState({ cameraPermissionSelected: cameraPermission });
  };

  handleDeleteCameraPermission = cameraPermission => {
    if (cameraPermission.id) {
      this.props.deletePermission(cameraPermission.id);
      if (
        this.state.cameraPermissionSelected &&
        this.state.cameraPermissionSelected.cameraId ===
        cameraPermission.cameraId
      ) {
        this.setState({ cameraPermissionSelected: null });
      }
    }
  };

  savePermission = permission => {
    let { groupSelected, cameraPermissionSelected } = this.state;
    this.props.savePermission(
      groupSelected,
      cameraPermissionSelected.cameraId,
      permission
    );
  };

  render() {
    let {
      isFetching,
      allGroups,
      cameraPermissionsByGroup,
      allCameraPermissions
    } = this.props;
    let { groupSelected, cameraPermissionSelected, searchKeyWord } = this.state;

    let listGroupItems;
    let listCameraItems;

    if (allGroups) {
      listGroupItems = allGroups.map(group => {
        let activeClass =
          groupSelected === group.id ? "list-item active" : "list-item";
        return (
          <li
            key={group.id}
            className={activeClass}
            onClick={() => {
              this.handleGroupItemClick(group.id);
            }}>
            {group.name}
          </li>
        );
      });
    }

    if (cameraPermissionsByGroup && allCameraPermissions) {
      cameraPermissionsByGroup = mergerPermissionByGroupToAllCamera(
        allCameraPermissions,
        cameraPermissionsByGroup
      );

      if (searchKeyWord) {
        cameraPermissionsByGroup = cameraPermissionsByGroup.filter(
          cameraPermission =>
            cameraPermission.cameraName.includes(searchKeyWord) ||
            cameraPermission.cameraDescription.includes(searchKeyWord)
        );
      }

      listCameraItems = cameraPermissionsByGroup.map(cameraPermission => {
        let activeClass = "list-item";
        if (cameraPermissionSelected) {
          activeClass =
            cameraPermissionSelected.cameraId === cameraPermission.cameraId
              ? "list-item active"
              : "list-item";
        }

        return (
          <div key={cameraPermission.cameraId} className={activeClass}>
            <div
              className={cameraPermission.id ? "title" : "title no-permission"}
              onClick={() => {
                this.handleCameraItemClick(cameraPermission);
              }}>
              {cameraPermission.cameraName}
              <a alt="Preview camera" title="Preview camera" onClick={() => { 
                this.handeShowPreviewCamera(cameraPermission); 
                }} ><i className="fas fa-video"></i> </a>
            </div>
            <div className={cameraPermission.id ? "icon" : "icon hide"}>
              <a
                title="Remove camera for group"
                onClick={() => {
                  this.handleDeleteCameraPermission(cameraPermission);
                }}>
                <i className="icon-action fa fa-remove" />
              </a>
            </div>
          </div>
        );
      });
    }

    let listPermissionItems;
    if (cameraPermissionSelected) {
      listPermissionItems = permissions.map(permission => {
        let value = false;
        if (permission.name === "canViewLive")
          value = cameraPermissionSelected.canViewLive;
        else if (permission.name === "canViewPlaybacks")
          value = cameraPermissionSelected.canViewPlaybacks;
        else if (permission.name === "canDoHumanDetection")
          value = cameraPermissionSelected.canDoHumanDetection;
        else if (permission.name === "canDoLicensePlate")
          value = cameraPermissionSelected.canDoLicensePlate;
        else if (permission.name === "canDoFaceRecognition")
          value = cameraPermissionSelected.canDoFaceRecognition;

        return (
          <MyCheckbox
            key={permission.name + cameraPermissionSelected.cameraId}
            name={permission.name}
            title={permission.title}
            value={value}
          />
        );
      });
    }

    return (
      <div className="component">
        <Loader show={isFetching} message={<div className="loader" />}>
          <div className="component-body container-fluid camera-permission">
            <div className="three-cols-form row">
              <div className="col first-col col-default">
                <div className="col-header">Groups</div>
                <div className="col-body">
                  <ul>{listGroupItems}</ul>
                </div>
              </div>
              <div className="col second-col-auto col-default">
                <div className="col-header">
                  <div className="col-header-title">Cameras</div>
                </div>
                <div className={groupSelected ? "col-body" : "hide"}>
                  <div className="col-tools">
                    <div className="input-group search-box item-list">
                      <Input
                        type="text"
                        id="searchKeywork"
                        onChange={this.handleSearchKeyWordChange}
                        value={searchKeyWord}
                        placeholder="Search by name, description"
                      />
                    </div>
                  </div>
                  <div className="col-body">
                    <ul>{listCameraItems}</ul>
                  </div>
                </div>
              </div>
              <div className="third-col col col-default">
                <div className="col-header">Permissions</div>
                <div className={cameraPermissionSelected ? "col-body" : "hide"}>
                  <Formsy
                    onValidSubmit={this.savePermission}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref="permissionForm">
                    {listPermissionItems}
                  </Formsy>
                </div>
              </div>
            </div>
          </div>
        </Loader>
        <div className="component-footer">
          <Button
            type="submit"
            color="primary"
            disabled={!cameraPermissionSelected}
            onClick={() => {
              this.refs.permissionForm.submit();
            }}>
            Save
          </Button>
        </div>
        <ModalPreviewCamera
          show={this.state.showPreviewCamera}
          closeModal={this.handleClosePreviewCamera}
          title={this.state.previewCameraHeader}
          imagePreviewUrl={this.state.imagePreviewUrl}
        />
      </div>
    );
  }
}

const permissions = [
  { name: "canViewLive", title: "Can view live" },
  { name: "canViewPlaybacks", title: "Can view playbacks" },
  { name: "canDoHumanDetection", title: "Can view human tracking" },
  { name: "canDoLicensePlate", title: "Can view license plate" },
  { name: "canDoFaceRecognition", title: "Can view face recognition" }
];

function mergerPermissionByGroupToAllCamera(
  allCameraPermissions,
  cameraPermissionsByGroup
) {
  let cameraPermissionsResult;

  // Filter
  var filteredArray = allCameraPermissions.filter(function (array_el) {
    return (
      cameraPermissionsByGroup.filter(function (cameraPermissionsByGroup) {
        return cameraPermissionsByGroup.cameraId === array_el.cameraId;
      }).length === 0
    );
  });

  //Merge
  cameraPermissionsResult = cameraPermissionsByGroup.concat(filteredArray);

  //Sort
  cameraPermissionsResult.sort(function (a, b) {
    if (a.cameraName < b.cameraName) return -1;
    if (a.cameraName > b.cameraName) return 1;
    return 0;
  });

  return cameraPermissionsResult;
}

export default CameraPermissionsView;
