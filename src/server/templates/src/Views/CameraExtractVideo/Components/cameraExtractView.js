import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import Formsy from "formsy-react";
import MyCheckbox from "../../Commons/checkbox";
import { Button, Row, Col } from "reactstrap";
import MyInput from "../../Commons/inputForm";

class ExtractVideoCamera extends Component {
  state = {
    cameraId: this.props.match.params.id,
    startTime: new Date(),
    endTime: new Date(),
    expiredTime: null,
    videoId: "",
    canSubmit: false
  };

  componentWillReceiveProps(newProps) {
    if (newProps.searchData !== "") {
      this.setState({
        videoId: newProps.searchData.id
      });
    }
    if (newProps.isAssignedSuccess) {
      this.props.showToastMessage("This video has ben assigned!", "success");
    }
  }

  componentWillMount() {
    if (this.props.searchData !== "") {
      this.props.stateChanged();
    }
    if (this.props.groupDatas !== "") {
      this.props.getAllGroups("");
    }
    if (this.props.userDatas !== "") {
      this.props.getAllUsers("");
    }
    if (this.props.data.id !== this.props.match.params.id) {
      this.props.getCamera(this.props.match.params.id);
    }
  }

  handleSearchVideo = () => {
    let startTime = this.state.startTime;
    let endTime = this.state.endTime;
    let currentTime = new Date();

    currentTime.setSeconds(0, 0);
    startTime.setSeconds(0, 0);
    endTime.setSeconds(0, 0);
    if (
      startTime.getTime() > endTime.getTime() ||
      startTime.getTime() === endTime.getTime()
    ) {
      this.props.showToastMessage("Start time must before end time", "error");
    } else if (
      startTime.getTime() > currentTime.getTime() ||
      endTime.getTime() > currentTime.getTime()
    ) {
      this.props.showToastMessage(
        "'Start time' and 'End time' must before 'Current time'",
        "error"
      );
    } else {
      this.props.searchVideoForExtract(
        this.state.cameraId,
        convertToStringTime(this.state.startTime),
        convertToStringTime(this.state.endTime)
      );
    }
  };

  submitAssignedVideoTo = data => {
    let returnData = filterDataSelected(data);

    if (returnData[0].length === 0 && returnData[1].length === 0) {
      this.props.showToastMessage(
        "Please choose at least 1 group or 1 user.",
        "error"
      );
    } else if (this.state.expiredTime == null) {
      this.props.showToastMessage(
        "Please choose expired date for this video.",
        "error"
      );
    } else {
      this.props.assignedVideoPlaybackFor(
        this.state.videoId,
        convertToMySQLDateTime(this.state.expiredTime),
        data.comment,
        returnData[0],
        returnData[1]
      );
    }
  };

  onChangeStartDate = date => {
    this.setState({ startTime: date });
  };

  onChangeEndDate = date => {
    this.setState({ endTime: date });
  };

  onChangeExpiredDate = date => {
    this.setState({ expiredTime: date });
  };

  disableButton = () => {
    this.setState({ canSubmit: false });
  };

  enableButton = () => {
    this.setState({ canSubmit: true });
  };

  render() {
    let camera = this.props.data;
    let searchData = this.props.searchData;
    let groupData = this.props.groupDatas;
    let userData = this.props.userDatas;
    let groupSelected, userSelected;
    let date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
    let maxDate = date;
    let minDate = new Date();
    minDate.setDate(minDate.getDate() - 45);

    let videoUrl = "";
    if (searchData !== "") {
      // videoUrl = constant.BASE_IMAGE_MAP_URL + "videos/play/" + searchData.id;
      //for testing
      videoUrl = "http://210.2.98.82:9000/api/1.0/videos/play/" + searchData.id;
    }

    if (groupData) {
      groupSelected =
        groupData.length > 0 ? (
          groupData.map(group => {
            return (
              <MyCheckbox
                key={"group:" + group.id}
                name={"group:" + group.id}
                title={group.name}
              />
            );
          })
        ) : (
          <p>No Data</p>
        );
    }

    if (userData) {
      userSelected =
        userData.length > 0 ? (
          userData.map(user => {
            return (
              <MyCheckbox
                key={"user:" + user.id}
                name={"user:" + user.id}
                title={user.fullName}
              />
            );
          })
        ) : (
          <p>No Data</p>
        );
    }

    return (
      <div className="component">
        <div className="component-body">
          <div className="row extract-video">
            <div className="camera-info col-md-12">
              <h3>
                Camera: {camera.name}{" "}
                <span className="font-italic">({camera.description})</span>
              </h3>
            </div>
            <div className="col-md-6 search-video">
              <h4 className="title">Search video</h4>
              <div className="search-box">
                <div className="row">
                  <div className="col row">
                    <label className="col">From</label>
                    <DateTimePicker
                      className="col-md-8"
                      onChange={this.onChangeStartDate}
                      value={this.state.startTime}
                      maxDate={maxDate}
                      minDate={minDate}
                      clearIcon={null}
                      calendarIcon={null}
                      disableClock={true}
                    />
                  </div>
                  <div className="col row">
                    <label className="col">To</label>
                    <DateTimePicker
                      className="col-md-8"
                      onChange={this.onChangeEndDate}
                      value={this.state.endTime}
                      maxDate={maxDate}
                      minDate={minDate}
                      clearIcon={null}
                      calendarIcon={null}
                      disableClock={true}
                    />
                  </div>
                  <div className="col-md-1">
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => {
                        this.handleSearchVideo();
                      }}>
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </div>
              {searchData !== "" ? (
                <div className="search-result">
                  <p>{searchData.title}</p>
                  <video
                    src={videoUrl}
                    type="video/mp4"
                    autoPlay={true}
                    width="100%"
                    controls>
                    {" "}
                  </video>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-6 assigned-video">
              <h4 className="title">Assigned to</h4>
              {this.state.videoId !== "" ? (
                <Formsy
                  onValidSubmit={this.submitAssignedVideoTo}
                  onValid={this.enableButton}
                  onInvalid={this.disableButton}
                  ref="addGroupsForm">
                  <div className="row">
                    <div className="col">
                      <h4>Groups</h4>
                      {groupSelected}
                    </div>
                    <div className="col">
                      <h4>Users</h4>
                      {userSelected}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label className="clearfix">Expired at </label>
                    </div>
                    <div className="col-md-12">
                      <DateTimePicker
                        value={this.state.expiredTime}
                        minDate={date}
                        onChange={this.onChangeExpiredDate}
                        clearIcon={null}
                        disableClock={true}
                        required={true}
                      />
                    </div>
                  </div>
                  <Row>
                    <Col>
                      <MyInput
                        name="comment"
                        title="Comment"
                        type="text"
                        value={""}
                      />
                    </Col>
                  </Row>
                  <div className="component-footer">
                    <Button
                      color="secondary"
                      onClick={() => {
                        this.refs.addGroupsForm.submit();
                      }}>
                      Save
                    </Button>
                  </div>
                </Formsy>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="component-footer">
          <Button
            className={this.props.location.fromLogin ? "hide" : ""}
            type="submit"
            color="secondary"
            onClick={() => {
              this.props.history.goBack();
            }}>
            Back
          </Button>
        </div>
      </div>
    );
  }
}

function convertToStringTime(date) {
  return (
    [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("-") +
    " " +
    [date.getHours(), date.getMinutes()].join(":")
  );
}

function convertToMySQLDateTime(date) {
  return (
    date.getUTCFullYear() +
    "-" +
    ("00" + (date.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getUTCDate()).slice(-2) +
    " " +
    ("00" + date.getUTCHours()).slice(-2) +
    ":" +
    ("00" + date.getUTCMinutes()).slice(-2) +
    ":" +
    ("00" + date.getUTCSeconds()).slice(-2)
  );
}

function filterDataSelected(data) {
  let returnData = [];
  let groupSelected = [];
  let userSelected = [];
  for (let id in data) {
    if (data[id]) {
      if (id.indexOf("group:") >= 0) {
        let guid = id.substring(6, id.length);
        groupSelected.push(guid);
      } else if (id.indexOf("user:") >= 0) {
        let guid = id.substring(5, id.length);
        userSelected.push(guid);
      }
    }
  }
  returnData.push(groupSelected);
  returnData.push(userSelected);
  return returnData;
}

export default ExtractVideoCamera;
