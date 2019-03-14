import { connect } from "react-redux";
import PeopleView from "./Components/peopleView";
import {
  getPeoples,
  addPeople,
  updatePeople,
  deletePeoples,
  deletePeopleImage
} from "./reducer";

const mapStateToProps = state => {
  return {
    isFetching: state.peopleReducer.isFetching,
    people: state.peopleReducer.people,
    totalPages: state.peopleReducer.totalPages,
    addOrUpdatePeopleFailed: state.peopleReducer.addOrUpdatePeopleFailed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPeoples: (keyword, page, pageSize) =>
      dispatch(getPeoples(keyword, page, pageSize)),
    addPeople: (people, images) => dispatch(addPeople(people, images)),
    deletePeoples: peopleIds => dispatch(deletePeoples(peopleIds)),
    updatePeople: (people, images) => dispatch(updatePeople(people, images)),
    deletePeopleImage: (peopleId, peopleImageId) =>
      dispatch(deletePeopleImage(peopleId, peopleImageId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleView);
