import React, { Component } from "react";
import Camera from "./camera";

class ListCamera extends Component {
  handeShowPreviewCamera = camera => {
    this.props.handeShowPreviewCamera(camera);
  }

  render() {
    let { cameras } = this.props;
    let listCamera = cameras.map(camera => {
      return <Camera key={camera.id} camera={camera} 
                      handeShowPreviewCamera = {this.handeShowPreviewCamera}/>;
    });

    return <ul>{listCamera}</ul>;
  }
}
export default ListCamera;
