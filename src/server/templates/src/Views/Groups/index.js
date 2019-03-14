import { connect } from "react-redux";
import {
  getGroups,
  addGroup,
  updateGroup,
  deleteGroup,
  addMembersToGroups,
  removeMembersInGroup
} from "./reducer";
import { getAllUsers } from "../Users/reducer";
import GroupsView from "./Components/groupView";

const mapStateToProps = state => {
  return {
    isFetching: state.groupReducer.isFetching,
    data: state.groupReducer.data,
    totalPages: state.groupReducer.totalPages,
    allUsers: state.userReducer.allUsers,
    addOrUpdateGroupFailed: state.groupReducer.addOrUpdateGroupFailed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: keyword => dispatch(getAllUsers(keyword)),
    getGroups: (keyword, page, pageSize) =>
      dispatch(getGroups(keyword, page, pageSize)),
    addGroup: groupName => dispatch(addGroup(groupName)),
    updateGroup: group => dispatch(updateGroup(group)),
    deleteGroup: groupIds => dispatch(deleteGroup(groupIds)),
    addMembersToGroups: (groupId, userIds) =>
      dispatch(addMembersToGroups(groupId, userIds)),
    removeMembersInGroup: (groupId, userIds) =>
      dispatch(removeMembersInGroup(groupId, userIds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsView);
