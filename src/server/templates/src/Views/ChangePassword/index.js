import { connect } from "react-redux";
import { changePassword, resetState } from "./reducer";
import ChangePassword from "./Components/changePasswordView";

const mapStateToProps = state => {
  return {
    isFetching: state.changePasswordReducer.isFetching,
    isChangePasswordSuccess:
      state.changePasswordReducer.isChangePasswordSuccess,
    hasError: state.changePasswordReducer.hasError,
    errorMessage: state.changePasswordReducer.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePassword: (oldPassword, newPassword) =>
      dispatch(changePassword(oldPassword, newPassword)),
    resetState: () => dispatch(resetState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
