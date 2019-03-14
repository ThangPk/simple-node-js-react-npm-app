import React, { Component } from "react";
import { Stage, Layer, Image, Group, Line } from "react-konva";

class DrawingLine extends Component {
  state = {
    startx: 0,
    starty: 0,
    isDrawing: false,
    isSaved:
      this.props.drawingType === "human"
        ? this.props.isSavedHumanTracking
        : this.props.drawingType === "face"
        ? this.props.isSavedFaceRecognition
        : this.props.isSavedLicensePlateRecognition,
    isChanged: false,
    points: [],
    polygons: convertToPixel(this.props.polygonPercents, 600, 400),
    polygonToPercents: [],
    drawingType: this.props.drawingType
  };

  componentDidMount() {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 400;
    const context = canvas.getContext("2d");

    this.setState({ canvas, context });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      isSaved:
        newProps.drawingType === "human"
          ? newProps.isSavedHumanTracking
          : newProps.drawingType === "face"
          ? newProps.isSavedFaceRecognition
          : newProps.isSavedLicensePlateRecognition,
      isChanged: false
    });
  }

  handleMouseDown = evt => {
    const stage = this.image.getStage();
    this.lastPointerPosition = stage.getPointerPosition();
    let lenghtPoints = this.state.points.length;

    if (this.state.isDrawing === true) {
      if (this.state.startx === 0 && this.state.starty === 0) {
        this.setState({
          startx: this.lastPointerPosition.x,
          starty: this.lastPointerPosition.y
        });
      }
      let tempPoints = [];
      if (lenghtPoints >= 6) {
        tempPoints = this.state.points.slice(0, lenghtPoints - 2);
      } else {
        tempPoints = this.state.points.slice();
      }
      tempPoints.push(this.lastPointerPosition.x);
      tempPoints.push(this.lastPointerPosition.y);
      if (lenghtPoints >= 4) {
        tempPoints.push(this.state.startx);
        tempPoints.push(this.state.starty);
      }

      this.setState({ points: tempPoints });
    }
  };

  handleAddNewPolygon = () => {
    this.setState({
      isDrawing: true
    });
  };

  handleRemoveAllPolygon = () => {
    this.setState({
      isDrawing: false,
      isSaved: false,
      isChanged: true,
      points: [],
      polygons: [],
      startx: 0,
      starty: 0
    });
  };

  handleSaveAllPolygon = () => {
    let tempDataList = convertToPercent(this.state.polygons, 600, 400);
    this.setState({ polygonToPercents: [] });
    tempDataList.forEach(item => {
      this.state.polygonToPercents.push(item);
    });
    switch (this.state.drawingType) {
      case "human":
        this.props.onSaveHumanTrackingRegions(this.state.polygonToPercents);
        break;
      case "face":
        this.props.onSaveFaceRecognitionRegions(this.state.polygonToPercents);
        break;
      case "licensePlate":
        this.props.onSaveLicensePlateRecognitions(this.state.polygonToPercents);
        break;
      default:
        break;
    }
  };

  handleDonePolygon = () => {
    this.setState({
      isDrawing: false
    });
    if (this.state.points.length > 0) {
      var temPolygons = this.state.polygons.slice();
      temPolygons.push(this.state.points);
      this.setState({
        polygons: temPolygons,
        points: [],
        startx: 0,
        starty: 0
      });
      this.setState({
        isChanged: true
      });
    }
  };

  handleRemoveLastPolygon = () => {
    let lenghtPolygon = this.state.polygons.length;
    let tempData = this.state.polygons.slice(0, lenghtPolygon - 1);
    this.setState({
      isChanged: true,
      polygons: tempData
    });
  };

  render() {
    const { canvas } = this.state;

    let drawPolygons;
    if (this.state.polygons.length > 0) {
      drawPolygons = this.state.polygons.map((polygon, index) => {
        return (
          <Line
            key={index}
            points={polygon}
            stroke="red"
            strokeWidth={2}
            close={true}
            draggable
            ref="line"
          />
        );
      });
    }
    return (
      <div>
        <ul className="draw-action">
          {this.state.isDrawing ? (
            <li>
              <a onClick={this.handleDonePolygon}>Done</a>
            </li>
          ) : (
            <li>
              <a onClick={this.handleAddNewPolygon}>Add</a>
            </li>
          )}
          {this.state.polygons.length > 0 ? (
            <li>
              <ul>
                {this.state.isDrawing === false ? (
                  <li>
                    <a onClick={this.handleRemoveLastPolygon}>Delete</a>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <a onClick={this.handleRemoveAllPolygon}>Clean All</a>
                </li>
              </ul>
            </li>
          ) : (
            ""
          )}
          {this.state.isChanged === true && this.state.isDrawing === false ? (
            <li>
              <a onClick={this.handleSaveAllPolygon}>Save</a>
            </li>
          ) : (
            ""
          )}
        </ul>
        <Stage width={600} height={400}>
          <Layer>
            <Group>
              <Image
                image={canvas}
                ref={node => (this.image = node)}
                stroke="blue"
                width={600}
                height={400}
                onMouseDown={this.handleMouseDown}
              />
              {drawPolygons}
              <Line
                points={this.state.points}
                stroke="blue"
                strokeWidth={2}
                close={true}
                draggable
                ref="line"
              />
            </Group>
          </Layer>
        </Stage>
      </div>
    );
  }
}

function convertToPercent(polygons, width, height) {
  let polygonPercents = [];
  polygons.forEach(polygon => {
    let polygonPercent = [];
    for (let i = 0; i < polygon.length; i += 2) {
      let point = [];
      point.push(parseFloat((polygon[i] / width).toFixed(4)));
      point.push(parseFloat((polygon[i + 1] / height).toFixed(4)));
      polygonPercent.push(point);
    }
    polygonPercents.push(polygonPercent);
  });

  return polygonPercents;
}

function convertToPixel(polygonPercents, width, height) {
  let polygons = [];
  polygonPercents.forEach(polygonPercent => {
    let polygon = [];
    let startPoint = polygonPercent[0];
    polygonPercent.forEach(point => {
      let tempX = Math.round(point[0] * width);
      polygon.push(tempX);
      let tempY = Math.round(point[1] * height);
      polygon.push(tempY);
    });
    // add last position
    polygon.push(Math.round(startPoint[0] * width));
    polygon.push(Math.round(startPoint[1] * height));

    polygons.push(polygon);
  });
  return polygons;
}

export default DrawingLine;
