import React, { Component } from "react";
import { Input } from "reactstrap";
import SplitPane from "react-split-pane";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import Formsy from "formsy-react";
import ModalPreviewCamera from "../../Commons/modalPreviewCamera";
import ModalConfirm from "../../Commons/modalConfirm";
import ModalInputConfirm from "../../Commons/modalInputConfirm";
import MyCheckbox from "../../Commons/checkbox";
import { arrayInnerJoin } from "../../Utils/arrayUtils";
import ReactPlayer from "react-player";

class CameraCategoryView extends Component {
  state = {
    categorySelectedId: null,
    categorySelectedName: null,
    searchKeyWord: "",
    showModalInputConfirm: false,
    showModalConfirmDeleteCategory: false,
    parentCategoryIdUpdate: null,
    pathCategoryUpdated: null,
    nodeCategoryUpdate: null,
    nodeCategoryIdDeleted: null,
    pathCategoryDeleted: null,
    showPreviewCamera: false,
    previewCameraHeader: "Camera preview",
    imagePreviewUrl: ""
  };

  componentWillMount() {
    this.props.getCategoryTree();
    this.props.getAllCameras();
  }

  handleClosePreviewCamera = () => {
    this.setState({ 
      imagePreviewUrl: null,
      showPreviewCamera: false });
  };

  handeShowPreviewCamera = camera => {
    
    this.setState({
      previewCameraHeader: "Camera: " + camera.name,
      showPreviewCamera: true,
      imagePreviewUrl: camera.imageSubUrl
    })
  }

  handleSearchKeyWordChange = e => {
    this.setState({ searchKeyWord: e.target.value });
  };

  handleOnChangeTreeData = treeData => {
    this.props.onChangeCategoryTree(treeData);
  };

  //Node
  handleCloseModalConfirmDeleteCategory = () => {
    this.setState({
      showModalConfirmDeleteCategory: false,
      nodeCategoryIdDeleted: null,
      pathCategoryDeleted: null
    });
  };

  handleModalConfirmDeleteCategoryOk = () => {
    this.props.deleteCategory(
      this.state.nodeCategoryIdDeleted,
      this.state.pathCategoryDeleted
    );
    this.setState({
      showModalConfirmDeleteCategory: false,
      nodeCategoryIdDeleted: null,
      pathCategoryDeleted: null
    });
  };

  handleCloseModalInputConfirm = () => {
    this.setState({
      showModalInputConfirm: false,
      parentCategoryIdUpdate: null,
      pathCategoryUpdated: null,
      nodeCategoryUpdate: null
    });
  };

  handleModalInputConfirmOk = nodeTitle => {
    let {
      nodeCategoryUpdate,
      pathCategoryUpdated,
      parentCategoryIdUpdate
    } = this.state;

    if (nodeCategoryUpdate) {
      //Update category
      this.props.updateCategory(
        { name: nodeTitle, id: parentCategoryIdUpdate },
        nodeCategoryUpdate,
        pathCategoryUpdated
      );
    } else {
      if (this.state.parentCategoryIdUpdate) {
        // Add category
        this.props.addCategory(
          { name: nodeTitle, parentCategoryId: parentCategoryIdUpdate },
          pathCategoryUpdated
        );
      } else {
        // Add root category
        this.props.addCategory({ name: nodeTitle }, pathCategoryUpdated);
      }
    }

    this.setState({
      showModalInputConfirm: false,
      parentCategoryIdUpdate: null,
      pathCategoryUpdated: null,
      nodeCategoryUpdate: null
    });
  };

  handleAddRootCategory = path => {
    this.setState({ showModalInputConfirm: true, pathCategoryUpdated: path });
  };

  handleAddCategory = (parentCategoryId, path) => {
    this.setState({
      showModalInputConfirm: true,
      parentCategoryIdUpdate: parentCategoryId,
      pathCategoryUpdated: path
    });
  };

  handleEditCategory = (parentCategoryId, node, path) => {
    this.setState({
      showModalInputConfirm: true,
      nodeCategoryUpdate: node,
      parentCategoryIdUpdate: parentCategoryId,
      pathCategoryUpdated: path
    });
  };

  //Assign remove camera of category
  submitAssignCamerasToGroup = data => {
    let cameraIds = filterCameraSelected(data);
    if (cameraIds.length > 0) {
      this.props.assignCameraToCategory(
        this.state.categorySelectedId,
        cameraIds
      );
    }
  };

  submitRemoveCamerasFromGroup = data => {
    let cameraIds = filterCameraSelected(data);
    if (cameraIds.length > 0) {
      this.props.removeCameraFromCategory(
        this.state.categorySelectedId,
        cameraIds
      );
    }
  };

  render() {
    let { treeData, allCameras, camerasByCategory } = this.props;
    let {
      searchKeyWord,
      categorySelectedId,
      categorySelectedName,
      showModalInputConfirm,
      nodeCategoryUpdate,
      showModalConfirmDeleteCategory
    } = this.state;

    let camerasLeftForCategoryUI, camerasByCategoryUI;
    let camerasLeftForCategory = [];
    
    if (allCameras && camerasByCategory) {
      camerasLeftForCategory = arrayInnerJoin(allCameras, camerasByCategory, [
        "id",
        "name",
        "description",
        "imagePreviewUrl",
        "imageSubUrl",
        "imageMainUrl"
      ]);
    }

    if (searchKeyWord) {
      camerasLeftForCategory = camerasLeftForCategory.filter(
        camera =>
          camera.name.includes(searchKeyWord) ||
          camera.description.includes(searchKeyWord)
      );
    }

    if (camerasByCategory) {
      camerasByCategoryUI = camerasByCategory.map(camera => {
        return (
          <div key={camera.id} className="item-camera">
            <MyCheckbox  name={camera.id} title={camera.name} className="item-name"/>
            <a alt="Preview camera" title="Preview camera" className="preview-button" onClick={() => {
              this.handeShowPreviewCamera(camera);
            }} ><i className="fas fa-video"></i> </a>
          </div>
        );
      });
    }

    if (camerasLeftForCategory) {
      camerasLeftForCategoryUI = camerasLeftForCategory.map(camera => {
        return (
          <div key={camera.id} className="item-camera">
            <MyCheckbox  name={camera.id} title={camera.name} className="item-name"/>
            <a alt="Preview camera" title="Preview camera" className="preview-button" onClick={() => {
              this.handeShowPreviewCamera(camera);
            }} ><i className="fas fa-video"></i> </a>
          </div>
        );
    });
  }

  return(
      <div className = "component" >
      <div className="component-body camera-category">
        <SplitPane split="vertical" defaultSize="25%">
          <div className="tree-data">
            <SortableTree
              onChange={treeData => this.handleOnChangeTreeData(treeData)}
              treeData={treeData}
              scaffoldBlockPxWidth={25}
              rowHeight={35}
              canDrag={false}
              generateNodeProps={({ node, path }) => {
                let nodeSelectedCSS = "";
                if (node.id === 0) {
                  nodeSelectedCSS = "node-add-root";
                }
                if (categorySelectedId === node.id) {
                  nodeSelectedCSS = "node-selected";
                }

                return {
                  className: nodeSelectedCSS,
                  onClick: e => {
                    const clickedItemClassName = e.target.className;
                    if (
                      clickedItemClassName !== "rst__expandButton" &&
                      clickedItemClassName !== "rst__collapseButton"
                    ) {
                      if (node.id === 0) {
                        this.handleAddRootCategory(path);
                      } else {
                        if (
                          clickedItemClassName === "rst__rowTitle" ||
                          clickedItemClassName ===
                          "rst__rowContents rst__rowContentsDragDisabled" ||
                          clickedItemClassName === "rst__rowLabel"
                        ) {
                          this.setState({
                            categorySelectedId: node.id,
                            categorySelectedName: node.title
                          });
                          this.props.listCameraByCategory(node.id);
                        }
                      }
                    }
                  },
                  buttons: [
                    <a
                      onClick={e => {
                        this.handleAddCategory(node.id, path);
                      }}>
                      <i className="icon-action fa fa-plus" />
                    </a>,
                    <a
                      onClick={() => {
                        this.handleEditCategory(node.id, node, path);
                      }}>
                      <i className="icon-action fa fa-edit" />
                    </a>,
                    <a
                      onClick={() => {
                        this.setState({
                          showModalConfirmDeleteCategory: true,
                          nodeCategoryIdDeleted: node.id,
                          pathCategoryDeleted: path
                        });
                      }}>
                      <i className="icon-action fa fa-remove" />
                    </a>
                  ]
                };
              }}
            />
          </div>
          <div
            className={
              categorySelectedId ? "three-cols-form" : "hide three-cols-form"
            }>
            <div className="first-col col-default">
              <div className="col-header">
                {categorySelectedName
                  ? categorySelectedName + "'s cameras"
                  : "No category selected"}
              </div>
              <div className="col-body">
                <Formsy
                  onValidSubmit={this.submitRemoveCamerasFromGroup}
                  onValid={this.enableButton}
                  onInvalid={this.disableButton}
                  ref="removeCamerasFromGroupForm">
                  {camerasByCategoryUI}
                </Formsy>
              </div>
            </div>
            <div className="second-col">
              <div className="button-container">
                <div
                  className="btn btn-primary"
                  title="Add camera"
                  onClick={() => {
                    this.refs.addCamerasToGroupForm.submit();
                  }}>
                  <i className="fa fa-arrow-left assign" />
                </div>
                <div
                  className="btn btn-primary"
                  title="Remove camera"
                  onClick={() => {
                    this.refs.removeCamerasFromGroupForm.submit();
                  }}>
                  <i className="fa fa-arrow-right remove" />
                </div>
              </div>
            </div>
            <div className="third-col col-default">
              <div className="col-header">Available cameras</div>
              <div className="col-tools">
                <div className="input-group search-box">
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
                <Formsy
                  onValidSubmit={this.submitAssignCamerasToGroup}
                  onValid={this.enableButton}
                  onInvalid={this.disableButton}
                  ref="addCamerasToGroupForm">
                  {camerasLeftForCategoryUI}
                </Formsy>
              </div>
            </div>
          </div>
        </SplitPane>
        <ModalInputConfirm
          show={showModalInputConfirm}
          closeModal={this.handleCloseModalInputConfirm}
          confirm={this.handleModalInputConfirmOk}
          title={nodeCategoryUpdate ? "Edit" : "New"}
          value={nodeCategoryUpdate ? nodeCategoryUpdate.title : ""}
        />
        <ModalConfirm
          show={showModalConfirmDeleteCategory}
          closeModal={this.handleCloseModalConfirmDeleteCategory}
          confirm={this.handleModalConfirmDeleteCategoryOk}
          title={"Confirm"}
          message={"Are you sure you want to delete this category?"}
        />
        <ModalPreviewCamera
          show={this.state.showPreviewCamera}
          closeModal={this.handleClosePreviewCamera}
          title={this.state.previewCameraHeader}
          imagePreviewUrl={this.state.imagePreviewUrl}
        />
      </div>
      </div>
    );
  }
}

function filterCameraSelected(data) {
  let cameraSelected = [];
  for (let cameraId in data) {
    if (data[cameraId]) {
      cameraSelected.push(cameraId);
    }
  }

  return cameraSelected;
}

export default CameraCategoryView;
