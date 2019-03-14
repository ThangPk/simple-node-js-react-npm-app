import React, { Component } from "react";
import _ from "lodash";
import { HotKeys } from "react-hotkeys";
import Radium from "radium";

import SVGRenderer from "./svgRender";
import Handler from "./handler";
import { modes } from "./constants";
import * as actions from "./actions";
import { Path } from "./objects";
import ModalPreviewCamera from "../../Commons/modalPreviewCamera";

class MapRender extends Component {
  static defaultProps = {
    objectTypes: {
      polygon: Path
    },
    snapToGrid: 1,
    svgStyle: {}
  };

  state = {
    mode: modes.FREE,
    handler: {
      top: 200,
      left: 200,
      width: 50,
      height: 50,
      rotate: 0
    },
    currentObjectIndex: null,
    selectedObjectIndex: null,
    selectedTool: null,
    showPreviewCamera: false,
    previewCameraHeader: "Camera preview",
    imagePreviewUrl: ""
  };

  keyMap = {
    removeObject: ["del", "backspace"],
    moveLeft: ["left", "shift+left"],
    moveRight: ["right", "shift+right"],
    moveUp: ["up", "shift+up"],
    moveDown: ["down", "shift+down"],
    closePath: ["enter"],
    previewCamera: ["ctrl+p"]
  };

  componentWillMount() {
    this.objectRefs = {};
  }

  handleClosePreviewCamera = () => {
    this.setState({ 
      imagePreviewUrl: null,
      showPreviewCamera: false });
  };

  showHandler(index) {
    let { mode } = this.state;
    let { objects } = this.props;
    let object = objects[index];

    if (mode !== modes.FREE) {
      return;
    }

    this.updateHandler(index, object);
    this.setState({
      currentObjectIndex: index,
      showHandler: true
    });
  }

  hideHandler() {
    this.setState({
      showHandler: false
    });
  }

  getStartPointBundle(event, object) {
    let { currentObjectIndex } = this.state;
    let { objects } = this.props;
    let mouse = this.getMouseCoords(event);
    object = object || objects[currentObjectIndex];
    return {
      clientX: mouse.x,
      clientY: mouse.y,
      objectX: object.x,
      objectY: object.y,
      width: object.width,
      height: object.height,
      rotate: object.rotate
    };
  }

  startDrag(mode, event) {
    let { currentObjectIndex } = this.state;
    this.setState({
      mode: mode,
      startPoint: this.getStartPointBundle(event),
      selectedObjectIndex: currentObjectIndex
    });
  }

  resetSelection() {
    this.setState({
      selectedObjectIndex: null
    });
  }

  newObject(event) {
    let { mode, selectedTool } = this.state;

    this.resetSelection(event);

    if (mode !== modes.DRAW) {
      return;
    }

    let { meta } = this.getObjectComponent(selectedTool);
    let mouse = this.getMouseCoords(event);

    let { objects, onUpdate } = this.props;
    let object = {
      ...meta.initial,
      type: selectedTool,
      x: mouse.x,
      y: mouse.y
    };

    onUpdate([...objects, object]);

    this.setState({
      currentObjectIndex: objects.length,
      selectedObjectIndex: objects.length,
      startPoint: this.getStartPointBundle(event, object),
      mode: meta.editor ? modes.EDIT_OBJECT : modes.SCALE,
      selectedTool: null
    });
  }

  updatePath(object) {
    let { path } = object;
    let diffX = object.x - object.moveX;
    let diffY = object.y - object.moveY;

    let newPath = path.map(({ x1, y1, x2, y2, x, y }) => ({
      x1: diffX + x1,
      y1: diffY + y1,
      x2: diffX + x2,
      y2: diffY + y2,
      x: diffX + x,
      y: diffY + y
    }));

    return {
      ...object,
      path: newPath,
      moveX: object.x,
      moveY: object.y
    };
  }

  updateObject(objectIndex, changes, updatePath) {
    let { objects, onUpdate } = this.props;

    onUpdate(
      objects.map((object, index) => {
        if (index === objectIndex) {
          let newObject = {
            ...object,
            ...changes
          };
          return updatePath ? this.updatePath(newObject) : newObject;
        } else {
          return object;
        }
      })
    );
  }

  getOffset() {
    let parent = this.svgElement.getBoundingClientRect();
    let { canvasWidth, canvasHeight } = this.getCanvas();
    return {
      x: parent.left,
      y: parent.top,
      width: canvasWidth,
      height: canvasHeight
    };
  }

  applyOffset(bundle) {
    let offset = this.getOffset();
    return {
      ...bundle,
      x: bundle.x - offset.x,
      y: bundle.y - offset.y
    };
  }

  updateHandler(index, object) {
    let target = this.objectRefs[index];
    let bbox = target.getBoundingClientRect();
    let { canvasOffsetX, canvasOffsetY } = this.getCanvas();

    let handler = {
      ...this.state.handler,
      width: object.width || bbox.width,
      height: object.height || bbox.height,
      top: object.y + canvasOffsetY,
      left: object.x + canvasOffsetX,
      rotate: object.rotate
    };

    if (!object.width) {
      let offset = this.getOffset();
      handler = {
        ...handler,
        left: bbox.left - offset.x,
        top: bbox.top - offset.y
      };
    }

    this.setState({
      handler: handler
    });
  }

  snapCoordinates({ x, y }) {
    let { snapToGrid } = this.props;
    return {
      x: x - (x % snapToGrid),
      y: y - (y % snapToGrid)
    };
  }

  getMouseCoords({ clientX, clientY }) {
    let coords = this.applyOffset({
      x: clientX,
      y: clientY
    });

    return this.snapCoordinates(coords);
  }

  onDrag(event) {
    let { currentObjectIndex, startPoint, mode } = this.state;
    let { objects } = this.props;
    let object = objects[currentObjectIndex];
    let mouse = this.getMouseCoords(event);

    let { scale, rotate, drag } = actions;

    let map = {
      [modes.SCALE]: scale,
      [modes.ROTATE]: rotate,
      [modes.DRAG]: drag
    };

    let action = map[mode];

    if (action) {
      let newObject = action({
        object,
        startPoint,
        mouse,
        objectIndex: currentObjectIndex,
        objectRefs: this.objectRefs
      });

      this.updateObject(currentObjectIndex, newObject);
      this.updateHandler(currentObjectIndex, newObject);
    }
  }

  stopDrag() {
    this.setState({
      mode: modes.FREE
    });
    this.hideHandler();
  }

  showEditor() {
    let { selectedObjectIndex } = this.state;

    let { objects } = this.props,
      currentObject = objects[selectedObjectIndex],
      objectComponent = this.getObjectComponent(currentObject.type);

    if (objectComponent.meta.editor) {
      this.setState({
        mode: modes.EDIT_OBJECT,
        showHandler: false
      });
    }
  }

  getObjectComponent(type) {
    let { objectTypes } = this.props;
    return objectTypes[type];
  }

  getCanvas() {
    let { width, height } = this.props;
    let { canvasWidth = width, canvasHeight = height } = this.props;
    return {
      width,
      height,
      canvasWidth,
      canvasHeight,
      canvasOffsetX: (canvasWidth - width) / 2,
      canvasOffsetY: (canvasHeight - height) / 2
    };
  }

  selectTool(tool) {
    this.setState({
      selectedTool: tool,
      mode: modes.DRAW,
      currentObjectIndex: null,
      showHandler: false,
      handler: null
    });
  }

  handleObjectChange(key, value) {
    let { selectedObjectIndex } = this.state;
    this.updateObject(selectedObjectIndex, {
      [key]: value
    });
  }

  handleArrange(arrange) {
    let { selectedObjectIndex } = this.state;
    let { objects } = this.props;
    let object = objects[selectedObjectIndex];

    let arrangers = {
      front: (rest, object) => [[...rest, object], rest.length],
      back: (rest, object) => [[object, ...rest], 0]
    };

    let rest = objects.filter((object, index) => selectedObjectIndex !== index);

    this.setState(
      {
        selectedObjectIndex: null
      },
      () => {
        let arranger = arrangers[arrange];
        let [arranged, newIndex] = arranger(rest, object);
        this.props.onUpdate(arranged);
        this.setState({
          selectedObjectIndex: newIndex
        });
      }
    );
  }

  removeCurrent() {
    let { selectedObjectIndex } = this.state;
    let { objects } = this.props;

    if (objects[selectedObjectIndex]) {
      this.props.removeCameraOnMap(objects[selectedObjectIndex]);
    }

    this.setState({
      currentObjectIndex: null,
      selectedObjectIndex: null,
      showHandler: false,
      handler: null
    });
  }

  moveSelectedObject(attr, points, event, key) {
    let { selectedObjectIndex } = this.state;
    let { objects } = this.props;
    let object = objects[selectedObjectIndex];

    if (key.startsWith("shift")) {
      points *= 10;
    }

    let changes = {
      ...object,
      [attr]: object[attr] + points
    };

    this.updateObject(selectedObjectIndex, changes);
    this.updateHandler(selectedObjectIndex, changes);
  }

  previewCamera(){
    let { selectedObjectIndex } = this.state;
    let { objects } = this.props;
    let object = objects[selectedObjectIndex];

    this.setState({
      previewCameraHeader: "Camera: " + object.camera.name,
      showPreviewCamera: true,
      imagePreviewUrl: object.imageSubUrl
    })
  }

  getKeymapHandlers() {
    let handlers = {
      removeObject: this.removeCurrent.bind(this),
      moveLeft: this.moveSelectedObject.bind(this, "x", -1),
      moveRight: this.moveSelectedObject.bind(this, "x", 1),
      moveUp: this.moveSelectedObject.bind(this, "y", -1),
      moveDown: this.moveSelectedObject.bind(this, "y", 1),
      previewCamera : this.previewCamera.bind(this),
      closePath: () => this.setState({ mode: modes.FREE })
    };

    return _.mapValues(handlers, handler => (event, key) => {
      if (event.target.tagName !== "INPUT") {
        event.preventDefault();
        handler(event, key);
      }
    });
  }

  renderSVG() {
    let { width, height, background, objects, objectTypes } = this.props;

    return (
      <SVGRenderer
        background={background}
        width={width}
        height={height}
        objects={objects}
        onMouseOver={this.showHandler.bind(this)}
        objectTypes={objectTypes}
        objectRefs={this.objectRefs}
        onRender={ref => (this.svgElement = ref)}
        onMouseDown={this.newObject.bind(this)}
        imageUrl={this.props.imageUrl}
      />
    );
  }

  render() {
    let {
      showHandler,
      handler,
      selectedObjectIndex,
      currentObjectIndex
    } = this.state;
    let { objects } = this.props;
    let currentObject = objects[selectedObjectIndex];
    let currentObjectHover = objects[currentObjectIndex];

    return (
      <HotKeys keyMap={this.keyMap} handlers={this.getKeymapHandlers()}>
        <div
          width={this.props.width}
          height={this.props.height}
          onMouseMove={this.onDrag.bind(this)}
          onMouseUp={this.stopDrag.bind(this)}>
          {showHandler && (
            <Handler
              boundingBox={handler}
              canResize={_(currentObject).has("width") || _(currentObject).has("height")}
              canRotate={_(currentObject).has("rotate")}
              onMouseLeave={this.hideHandler.bind(this)}
              onDrag={this.startDrag.bind(this, modes.DRAG)}
              onResize={this.startDrag.bind(this, modes.SCALE)}
              onRotate={this.startDrag.bind(this, modes.ROTATE)}
              cameraName={currentObjectHover ? currentObjectHover.camera.name : null}
            />
          )}

          {this.renderSVG()}
        </div>
        <ModalPreviewCamera
              show={this.state.showPreviewCamera}
              closeModal={this.handleClosePreviewCamera}
              title={this.state.previewCameraHeader}
              imagePreviewUrl={this.state.imagePreviewUrl}
            />
      </HotKeys>
    );
  }
}

export default Radium(MapRender);
