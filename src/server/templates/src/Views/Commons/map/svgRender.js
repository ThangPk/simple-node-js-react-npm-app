import React, { Component } from "react";
import Radium from "radium";
import * as Snap from "snapsvg-cjs";
// eslint-disable-next-line
import * as Zpd from "snap.svg.zpd";

class SVGRenderer extends Component {
  static defaultProps = {
    onMouseOver() {}
  };

  getObjectComponent(type) {
    let { objectTypes } = this.props;
    return objectTypes[type];
  }

  renderImage(imageUrl) {
    Snap.load(imageUrl, image => {
      let map = Snap("#map");

      let imageGroup = map.select("#image");
      imageGroup.clear();
      imageGroup.append(image);
    });
  }

  renderObject(object, index) {
    let { objectRefs, onMouseOver } = this.props;
    let Renderer = this.getObjectComponent(object.type);
    return (
      <Renderer
        onRender={ref => (objectRefs[index] = ref)}
        onMouseOver={onMouseOver.bind(this, index)}
        object={object}
        key={index}
        index={index}
      />
    );
  }

  componentDidMount() {
    var map = Snap("#map");
    map.zpd({zoomThreshold: [0.5, 3]});
  }

  render() {
    let { objects, onMouseDown, onRender } = this.props;

    return (
      <svg
        id="map"
        className="map"
        width={this.props.width}
        height={this.props.height}
        onMouseDown={onMouseDown}
        ref={onRender}>
        <g id="image">{this.renderImage(this.props.imageUrl)}</g>
        <g id="camera">{objects.map(this.renderObject.bind(this))}</g>
      </svg>
    );
  }
}

export default Radium(SVGRenderer);
