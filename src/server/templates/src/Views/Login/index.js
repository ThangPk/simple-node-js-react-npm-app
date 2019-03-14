import { connect } from "react-redux";
import { login } from "./reducer";
import LoginForm from "./Components/loginView";

const mapStateToProps = state => {
  return {
    isFetching: state.loginReducer.isFetching,
    isLoginSuccess: state.loginReducer.isLoginSuccess,
    hasError: state.loginReducer.hasError,
    errorMessage: state.loginReducer.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(login(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
