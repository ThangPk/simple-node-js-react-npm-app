import { connect } from "react-redux";
import ExtractVideoCamera from "./Components/cameraExtractView";
import { getCamera, searchVideoForExtract, assignedVideoPlaybackFor ,stateChanged} from "./reducer";
import { getAllGroups } from "../Groups/reducer";
import { getAllUsers } from "../Users/reducer";

const mapStateToProps = state => {
    return {
        isFetching: state.extractVideoCameraReducer.isFetching,
        data: state.extractVideoCameraReducer.data,
        searchData: state.extractVideoCameraReducer.searchData,
        groupDatas: state.groupReducer.allGroups,
        userDatas: state.userReducer.allUsers,
        isAssignedSuccess: state.extractVideoCameraReducer.isAssignedSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCamera: (id) => dispatch(getCamera(id)),
        searchVideoForExtract: (cameraId, startTime, endTime) => dispatch(searchVideoForExtract(cameraId, startTime, endTime)),
        getAllGroups: () => dispatch(getAllGroups("")),
        getAllUsers: () => dispatch(getAllUsers("")),
        assignedVideoPlaybackFor:(videoId,expiredAt,comment,groupIds,userIds) => dispatch(assignedVideoPlaybackFor(videoId,expiredAt,comment,groupIds,userIds)),
        stateChanged:() => dispatch(stateChanged())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExtractVideoCamera);
