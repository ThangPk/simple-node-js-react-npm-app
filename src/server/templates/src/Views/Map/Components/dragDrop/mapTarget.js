import { DropTarget } from "react-dnd";
import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import * as Snap from "snapsvg-cjs";

import { ItemTypes } from "../../../Utils/constant";
import MapRender from "../../../Commons/map/mapRender";

const cameraTarget = {
  drop(props, monitor, component) {
    let xOnScreen =
      monitor.getClientOffset().x -
      findDOMNode(component).getBoundingClientRect().x;
    let yOnScreen =
      monitor.getClientOffset().y -
      findDOMNode(component).getBoundingClientRect().y;

    // Get matrix transform
    let mapZpd = Snap("#map").select("g");
    let matrixTransform = mapZpd.transform().localMatrix.split();

    let xOnMap, yOnMap;
    xOnMap = (xOnScreen - matrixTransform.dx) / matrixTransform.scalex;
    yOnMap = (yOnScreen - matrixTransform.dy) / matrixTransform.scaley;
    
    let cameraSource = monitor.getItem().camera;
    props.setCameraOnMap(
      {
        id: cameraSource.id,
        xCoordinate: xOnMap,
        yCoordinate: yOnMap,
        rotateAngle: 0
      }      
    );
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class MapTarget extends Component {
  handleUpdate = cameraOnMapsUpdate => {
    this.props.cameraOnMapsUpdate(cameraOnMapsUpdate);
  };

  render() {
    let cameraOnMaps = this.props.objects;

    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div className="map-body">
        <MapRender
          objects={cameraOnMaps}
          onUpdate={this.handleUpdate.bind(this)}
          removeCameraOnMap={this.props.removeCameraOnMap}
          imageUrl={this.props.imageUrl}
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    );
  }
}

export default DropTarget(ItemTypes.CAMERA, cameraTarget, collect)(MapTarget);
