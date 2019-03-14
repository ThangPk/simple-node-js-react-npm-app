import React, { Component } from "react";
import SplitPane from "react-split-pane";
import { SortableTreeWithoutDndContext as SortableTree } from "react-sortable-tree";
import "react-sortable-tree/style.css";
import Loader from "react-loader-advanced";
import * as Snap from "snapsvg-cjs";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import { Input, Button } from "reactstrap";
import ModalPreviewCamera from "../../Commons/modalPreviewCamera";
import * as constant from "../../Utils/constant";

import ModalConfirm from "../../Commons/modalConfirm";
import ModalMapInputConfirm from "../../Commons/modalMapInputConfirm";
import MapTarget from "./dragDrop/mapTarget";
import { BASE_IMAGE_MAP_URL } from "../../Utils/constant";
import ListCamera from "./dragDrop/listCamera";

class Map extends Component {
  state = {
    treeData: this.props.treeData,
    showModalInputConfirm: false,
    showModalConfirmDeleteMap: false,
    mapSelectedId: null,
    parentId: null,
    pathUpdated: null,
    nodeUpdated: null,
    nodeIdDeleted: null,
    pathDeleted: null,
    currentImageOfMap: null,
    searchKeyWord: "",
    showPreviewCamera: false,
    previewCameraHeader: "Camera preview",
    imagePreviewUrl: ""
  };

  componentWillMount() {
    this.props.getMapTree();
    this.props.getRemainCameraOnMaps();
  }

  componentWillReceiveProps(newProps) {
    this.setState({ treeData: newProps.treeData });
  }

  handleClosePreviewCamera = () => {
    this.setState({ 
      imagePreviewUrl: null,
      showPreviewCamera: false });
  };

  handeShowPreviewCamera = camera => {
    let imagePreviewUrlTemp = "";
    imagePreviewUrlTemp = constant.BASE_STREAMING_URL  + camera.id + constant.HSL_STREAM_SUB;
    this.setState({
      previewCameraHeader: "Camera: " + camera.name,
      showPreviewCamera: true,
      imagePreviewUrl: imagePreviewUrlTemp
    });
  };

  handleSearchKeyWordChange = e => {
    this.setState({ searchKeyWord: e.target.value });
  };

  // Map tree
  handleOnChangeTreeData = treeData => {
    this.props.onChangeMapTree(treeData);
  };

  handleCloseModalConfirmDeleteMap = () => {
    this.setState({
      showModalConfirmDeleteMap: false,
      nodeIdDeleted: null,
      pathDeleted: null
    });
  };

  handleAddRootMap = path => {
    this.setState({ showModalInputConfirm: true, pathUpdated: path });
  };

  handleAddMap = (parentId, path) => {
    this.setState({
      showModalInputConfirm: true,
      parentId: parentId,
      pathUpdated: path
    });
  };

  handleUpdateMap = (node, path) => {
    this.setState({
      showModalInputConfirm: true,
      nodeUpdated: node,
      pathUpdated: path
    });
  };

  handleMapTreeMouseOver = linkedObjectId => {
    let map = Snap("#map");
    let linkObject = map.select("#" + linkedObjectId);
    if (linkObject) {
      linkObject.attr({ fill: "red", opacity: 0.5 });
    }
  };

  handleMapTreeMouseLeave = linkedObjectId => {
    let map = Snap("#map");
    let linkObject = map.select("#" + linkedObjectId);
    if (linkObject) {
      linkObject.attr({ fill: "none" });
    }
  };

  // Modal
  handleModalConfirmDeleteMapOk = () => {
    this.props.removeMap(this.state.nodeIdDeleted, this.state.pathDeleted);
    this.setState({
      showModalConfirmDeleteMap: false,
      nodeIdDeleted: null,
      pathDeleted: null
    });
  };

  handleCloseModalInputConfirm = () => {
    this.setState({
      showModalInputConfirm: false,
      parentId: null,
      pathUpdated: null,
      nodeUpdated: null
    });
  };

  handleModalInputConfirmOk = (nodeTitle, file, imageWidth, imageHeight) => {
    let { nodeUpdated, pathUpdated, parentId, treeData } = this.state;
    let isImageChanged = true;

    if (nodeUpdated) {
      //Update map
      if (!file) {
        this.setState({ currentImageOfMap: null });
        isImageChanged = false;
      }

      this.props.updateMap(
        {
          id: nodeUpdated.id,
          name: nodeTitle,
          parentId: nodeUpdated.parent_id,
          linkedObjectId: nodeUpdated.linked_object_id,
          isImageChanged,
          imageWidth,
          imageHeight
        },
        file,
        nodeUpdated,
        pathUpdated
      );
    } else {
      if (this.state.parentId) {
        // Add map
        this.props.saveMap(
          {
            id: "",
            name: nodeTitle,
            parentId: parentId,
            linkedObjectId: "",
            isImageChanged,
            imageWidth,
            imageHeight
          },
          file,
          pathUpdated,
          treeData
        );
      } else {
        // Add root map
        this.props.saveMap(
          {
            id: "",
            name: nodeTitle,
            parentId: "",
            linkedObjectId: "",
            isImageChanged,
            imageWidth,
            imageHeight
          },
          file,
          pathUpdated,
          treeData
        );
      }
    }

    this.setState({
      showModalInputConfirm: false,
      parentId: null,
      pathUpdated: null,
      nodeUpdated: null
    });
  };

  // Camera
  handleSetCameraOnMap = (cameraOnMap) => {
    this.props.setCameraOnMaps(
      cameraOnMap,
      this.state.mapSelectedId      
    );
  };

  handleCameraOnMapsUpdate = cameraOnMapsUpdate => {
    this.props.setCameraOnMapsUpdate(cameraOnMapsUpdate);
  };

  handleRemoveCameraOnMap = cameraOnMap => {
    this.props.removeCameraOnMap(cameraOnMap, this.state.mapSelectedId);
  };

  render() {
    let {
      isFetching,
      treeData,
      cameraOnMapsUpdate,
      cameraOnMaps,
      remainCameraOnMaps
    } = this.props;

    let {
      currentImageOfMap,
      searchKeyWord,
      mapSelectedId,
      nodeUpdated,
      showModalInputConfirm,
      showModalConfirmDeleteMap
    } = this.state;

    if (searchKeyWord) {
      remainCameraOnMaps = remainCameraOnMaps.filter(
        camera =>
          camera.name.includes(searchKeyWord) ||
          camera.description.includes(searchKeyWord)
      );
    }

    let cameraUpdateFilter = [];
    if (cameraOnMapsUpdate) {
      cameraUpdateFilter = cameraOnMapsUpdate.filter(cameraOnMapUpdate => {
        let cameraOnMapFilter = cameraOnMaps.find(
          cameraOnMap => cameraOnMap.id === cameraOnMapUpdate.id
        );

        return (
          cameraOnMapUpdate.rotate !== cameraOnMapFilter.rotate ||
          cameraOnMapUpdate.x !== cameraOnMapFilter.x ||
          cameraOnMapUpdate.y !== cameraOnMapFilter.y
        );
      });      
    }

    return (
      <div className="component">
        <div className="component-body camera-category map-view">
          <Loader show={isFetching} message={<div className="loader" />}>
            <SplitPane split="vertical" defaultSize="30%">
              <SplitPane split="vertical" defaultSize="50%">
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
                      if (mapSelectedId === node.id) {
                        nodeSelectedCSS = "node-selected";
                      }

                      return {
                        className: nodeSelectedCSS,

                        onMouseOver: () => {
                          if (
                            currentImageOfMap &&
                            node.linked_object_id &&
                            node.parent_id === mapSelectedId
                          ) {
                            this.handleMapTreeMouseOver(node.linked_object_id);
                          }
                        },
                        onMouseLeave: () => {
                          if (currentImageOfMap && node.linked_object_id) {
                            this.handleMapTreeMouseLeave(node.linked_object_id);
                          }
                        },
                        onClick: e => {
                          const clickedItemClassName = e.target.className;
                          if (
                            clickedItemClassName !== "rst__expandButton" &&
                            clickedItemClassName !== "rst__collapseButton"
                          ) {
                            if (node.id === 0) {
                              this.handleAddRootMap(path);
                            } else {
                              if (
                                clickedItemClassName === "rst__rowTitle" ||
                                clickedItemClassName ===
                                  "rst__rowContents rst__rowContentsDragDisabled" ||
                                clickedItemClassName === "rst__rowLabel"
                              ) {
                                this.setState({
                                  mapSelectedId: node.id,
                                  currentImageOfMap: {
                                    url: node.image_url,
                                    width: node.image_width,
                                    height: node.image_height
                                  }
                                });
                                let map = Snap("#map");
                                if(map) {
                                  // Reset map zoom
                                  map.zpd('destroy');
                                  map.zpd({zoomThreshold: [0.5, 3]});
                                }                                

                                if (cameraOnMapsUpdate) {
                                  this.props.setCameraOnMapsUpdate(null);
                                }
                                this.props.getCameraOnMaps(node.id);
                              }
                            }
                          }
                        },
                        buttons: [
                          <a
                            onClick={e => {
                              this.handleAddMap(node.id, path);
                            }}>
                            <i className="icon-action fa fa-plus" />
                          </a>,
                          <a
                            onClick={() => {
                              this.handleUpdateMap(node, path);
                            }}>
                            <i className="icon-action fa fa-edit" />
                          </a>,
                          <a
                            onClick={() => {
                              this.setState({
                                showModalConfirmDeleteMap: true,
                                nodeIdDeleted: node.id,
                                pathDeleted: path
                              });
                            }}>
                            <i className="icon-action fa fa-remove" />
                          </a>
                        ]
                      };
                    }}
                  />
                </div>
                <div className="form">
                  {remainCameraOnMaps && mapSelectedId && currentImageOfMap && (
                    <div className="available-camera">
                      <div className="col-header">Cameras</div>
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
                        <ListCamera
                          cameras={remainCameraOnMaps}
                          handeShowPreviewCamera={this.handeShowPreviewCamera}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </SplitPane>
              {currentImageOfMap ? (
                <div className="map">
                  <div className="camera-action-helper">
                    <p>Camera hotkey:</p>
                    <ul>
                      <li>
                        Move left:{" "}
                        <span>
                          "<i class="fas fa-arrow-left" />"
                        </span>
                      </li>
                      <li>
                        Move right:{" "}
                        <span>
                          "<i class="fas fa-arrow-right" />"
                        </span>
                      </li>
                      <li>
                        Move up:{" "}
                        <span>
                          "<i class="fas fa-arrow-up" />"
                        </span>
                      </li>
                      <li>
                        Move down:{" "}
                        <span>
                          "<i class="fas fa-arrow-down" />"
                        </span>
                      </li>
                      <li>
                        Remove: <span>"Delete"</span>
                      </li>
                      <li>
                        Updated: <span>"Enter"</span>
                      </li>
                      <li>
                        Preview: <span>"Ctrl + P"</span>
                      </li>
                    </ul>
                  </div>
                  <MapTarget
                    objects={
                      cameraOnMapsUpdate ? cameraOnMapsUpdate : cameraOnMaps
                    }
                    cameraOnMapsUpdate={this.handleCameraOnMapsUpdate}
                    imageUrl={
                      BASE_IMAGE_MAP_URL +
                      currentImageOfMap.url +
                      "?" +
                      Date.now()
                    }
                    setCameraOnMap={this.handleSetCameraOnMap}
                    removeCameraOnMap={this.handleRemoveCameraOnMap}
                    width={currentImageOfMap.width}
                    height={currentImageOfMap.height}
                  />

                  <div className="component-footer">
                    <Button
                      color="primary"
                      disabled={cameraUpdateFilter.length === 0}
                      onClick={() => {                        
                        this.props.updateCamerasOnMap(cameraUpdateFilter, mapSelectedId);                        
                      }}>
                      Update
                    </Button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </SplitPane>
            <ModalMapInputConfirm
              show={showModalInputConfirm}
              closeModal={this.handleCloseModalInputConfirm}
              confirm={this.handleModalInputConfirmOk}
              title={nodeUpdated ? "Edit" : "New"}
              map={nodeUpdated ? nodeUpdated : null}
            />
            <ModalConfirm
              show={showModalConfirmDeleteMap}
              closeModal={this.handleCloseModalConfirmDeleteMap}
              confirm={this.handleModalConfirmDeleteMapOk}
              title={"Confirm"}
              message={"Are you sure you want to delete this map?"}
            />
            <ModalPreviewCamera
              show={this.state.showPreviewCamera}
              closeModal={this.handleClosePreviewCamera}
              title={this.state.previewCameraHeader}
              imagePreviewUrl={this.state.imagePreviewUrl}
            />
          </Loader>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Map);
