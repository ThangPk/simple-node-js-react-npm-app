import { connect } from "react-redux";
import LicensePlateView from "./Components/licensePlateView";
import {
  importLicensePlateListFile,
  getLicensePlates,
  saveLicensePlate,
  removeLicensePlate
} from "./reducer";

const mapStateToProps = state => {
  return {
    isFetching: state.licensePlateReducer.isFetching,
    licensePlates: state.licensePlateReducer.licensePlates,
    totalPages: state.licensePlateReducer.totalPages,
    addOrUpdateLicensePlateFailed:
      state.licensePlateReducer.addOrUpdateLicensePlateFailed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    importLicensePlateListFile: licensePlateListFile =>
      dispatch(importLicensePlateListFile(licensePlateListFile)),
    getLicensePlates: (keyword, page, pageSize) =>
      dispatch(getLicensePlates(keyword, page, pageSize)),
    saveLicensePlate: licensePlate => dispatch(saveLicensePlate(licensePlate)),
    removeLicensePlate: licensePlateIds =>
      dispatch(removeLicensePlate(licensePlateIds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LicensePlateView);
