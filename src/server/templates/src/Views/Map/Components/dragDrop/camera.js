import React, { Component } from "react";
import { DragSource } from "react-dnd";

import { ItemTypes } from "../../../Utils/constant";

const cameraSource = {
  beginDrag(props) {
    let camera = props.camera;
    return { camera };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class Camera extends Component {
  componentDidMount() {
    const dragPreviewImage = new Image();
    dragPreviewImage.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxnPiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPiAgPHJlY3QgZmlsbD0ibm9uZSIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjMyIiB3aWR0aD0iMzciIHk9Ii0xIiB4PSItMSIvPiA8L2c+IDxnPiAgPHRpdGxlPkxheWVyIDE8L3RpdGxlPiAgPGcgc3Ryb2tlPSJudWxsIiBpZD0ic3ZnXzEiPiAgIDxwYXRoIHN0cm9rZT0ibnVsbCIgaWQ9InN2Z18yIiBmaWxsPSIjMDA2REYwIiBkPSJtMzQuMjk5OTksMTYuMDk3NzAzbDAsMTAuMDk0N2MwLDAuNzgwMzM5IC0wLjc0MTU1MiwxLjI2NzQyOSAtMS4zMzQ3OTQsMC44Nzk3NDVsLTMuNjkwMzEyLC0yLjQyNTUxMWwwLDAuNjkwODczYzAsMi4wNzc1OSAtMS40Nzg3NDIsMy43NjI1MjUgLTMuMzAyMDg3LDMuNzYyNTI1bC05LjY3MDcxLDBjLTEuODIzMzQ1LDAgLTMuMzAyMDg3LC0xLjY4NDkzNSAtMy4zMDIwODcsLTMuNzYyNTI1bDAsLTguMzc0OTczYzAsLTIuMDc3NTkgMS40Nzg3NDIsLTMuNzYyNTI1IDMuMzAyMDg3LC0zLjc2MjUyNWw5LjY3NTA3MiwwYzEuODIzMzQ1LDAgMy4zMDIwODcsMS42ODQ5MzUgMy4zMDIwODcsMy43NjI1MjVsMCwwLjY5MDg3M2wzLjY5MDMxMiwtMi40MjU1MTFjMC41ODg4OCwtMC4zOTc2MjUgMS4zMzA0MzIsMC4wOTQ0MzYgMS4zMzA0MzIsMC44Njk4MDR6Ii8+ICA8L2c+ICA8ZyBpZD0ic3ZnXzMiLz4gIDxnIGlkPSJzdmdfNCIvPiAgPGcgaWQ9InN2Z181Ii8+ICA8ZyBpZD0ic3ZnXzYiLz4gIDxnIGlkPSJzdmdfNyIvPiAgPGcgaWQ9InN2Z184Ii8+ICA8ZyBpZD0ic3ZnXzkiLz4gIDxnIGlkPSJzdmdfMTAiLz4gIDxnIGlkPSJzdmdfMTEiLz4gIDxnIGlkPSJzdmdfMTIiLz4gIDxnIGlkPSJzdmdfMTMiLz4gIDxnIGlkPSJzdmdfMTQiLz4gIDxnIGlkPSJzdmdfMTUiLz4gIDxnIGlkPSJzdmdfMTYiLz4gIDxnIGlkPSJzdmdfMTciLz4gPC9nPjwvc3ZnPg==";
      dragPreviewImage.onload = () => this.props.connectDragPreview(dragPreviewImage);
  }



  render() {
    const { camera, connectDragSource } = this.props;

    return connectDragSource(
      <li key={camera.id} className="list-item">
        {camera.name}
        <a alt="Preview camera" title="Preview camera" className="preview-button" onClick={() => {
             this.props.handeShowPreviewCamera(camera);
            }} ><i className="fas fa-video"></i> </a>
      </li>
    );
  }
}

export default DragSource(ItemTypes.CAMERA, cameraSource, collect)(Camera);
