import React, { Component } from "react";
import { UncontrolledTooltip } from "reactstrap";
import Radium from "radium";

let RotateAnchor = function(props) {
  let style = {
    marginLeft: props.boundingBox.width - 3
  };
  return (
    <div
      style={[styles.anchor, styles.rotateAnchor, style]}
      className={"rotate-anchor"}
      onMouseDown={props.onMouseDown}
    />
  );
};

RotateAnchor = Radium(RotateAnchor);

class Handler extends Component {
  onMouseDown(event) {    
    if (event.target.classList.contains("handler")) {
      this.props.onDrag(event);
    }
  }

  render() {
    let { props } = this;
    let { boundingBox } = props;

    let handlerStyle = {
      ...styles.handler,
      ...boundingBox,
      left: boundingBox.left + 10,
      top: boundingBox.top,
      transform: `rotate(${boundingBox.rotate}deg)`
    };

    return (
      <div
        id="toolTipForCamera"
        className={"handler"}
        style={handlerStyle}
        onMouseLeave={props.onMouseLeave}
        onDoubleClick={props.onDoubleClick}
        onMouseDown={this.onMouseDown.bind(this)}>
        {props.canRotate && (
          <RotateAnchor
            onMouseDown={props.onRotate}
            boundingBox={boundingBox}
          />
        )}      
        {this.props.cameraName && (
          <UncontrolledTooltip
            placement="right"
            target="toolTipForCamera">
            {this.props.cameraName}
          </UncontrolledTooltip>
        )}
      </div>
    );
  }
}

const styles = {
  handler: {
    position: "absolute",
    border: "2px solid #dedede",
    zIndex: 999999
  },
  anchor: {
    width: 10,
    height: 10,
    ":hover": {
      borderColor: "gray"
    }
  },

  rotateAnchor: {
    marginTop: -8,
    borderRight: "2px solid #dedede",
    borderTop: "2px solid #dedede",
    position: "absolute",
    borderTopRightRadius: 3,
    zIndex: -1
  }
};

export default Handler;
