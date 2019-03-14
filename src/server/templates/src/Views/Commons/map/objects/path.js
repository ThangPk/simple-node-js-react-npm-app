import React, { Component } from "react";

export default class Path extends Component {
  getTransformMatrix({ rotate, x, y }) {
    return `
      translate(${x} ${y})      
      rotate(${rotate})
    `;
  }

  getObjectAttributes() {
    let { object, onRender, ...rest } = this.props;
    let objectAttributes = Object.assign(object, {
      closed: "true",
      stroke: "green",
      strokeWidth: "0"
    });
    return {
      ...objectAttributes,
      transform: this.getTransformMatrix(objectAttributes),
      ref: onRender,
      ...rest
    };
  }

  render() {
    return (
      <path
        {...this.getObjectAttributes()}
        fill="#006DF0"
        d="m20.29999,4.097703l0,10.0947c0,0.780339 -0.741552,1.267429 -1.334794,0.879745l-3.690312,-2.425511l0,0.690873c0,2.07759 -1.478742,3.762525 -3.302087,3.762525l-9.67071,0c-1.823345,0 -3.302087,-1.684935 -3.302087,-3.762525l0,-8.374973c0,-2.07759 1.478742,-3.762525 3.302087,-3.762525l9.675072,0c1.823345,0 3.302087,1.684935 3.302087,3.762525l0,0.690873l3.690312,-2.425511c0.58888,-0.397625 1.330432,0.094436 1.330432,0.869804z"
      />
    );
  }
}
