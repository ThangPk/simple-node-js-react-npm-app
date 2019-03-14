import { connect } from "react-redux";
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  retrieveGroupForUser,
  addUserToGroups,
  removeUserInGroups
} from "./reducer";
import { getAllGroups } from "../Groups/reducer";
import UsersView from "./Components/usersView";

const mapStateToProps = state => {
  return {
    isFetching: state.userReducer.isFetching,
    data: state.userReducer.data,
    totalPages: state.userReducer.totalPages,
    allGroups: state.groupReducer.allGroups,
    totalGroupPages: state.groupReducer.totalPages,
    addOrUpdateUserFailed: state.userReducer.addOrUpdateUserFailed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllGroups: keyword => dispatch(getAllGroups(keyword)),
    getUsers: (keyword, page, pageSize) =>
      dispatch(getUsers(keyword, page, pageSize)),
    addUser: user => dispatch(addUser(user)),
    deleteUser: userIds => dispatch(deleteUser(userIds)),
    updateUser: user => dispatch(updateUser(user)),
    retrieveGroupForUser: userId => dispatch(retrieveGroupForUser(userId)),
    addUserToGroups: (userId, groupIds) =>
      dispatch(addUserToGroups(userId, groupIds)),
    removeUserInGroups: (userId, groupIds) =>
      dispatch(removeUserInGroups(userId, groupIds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersView);
