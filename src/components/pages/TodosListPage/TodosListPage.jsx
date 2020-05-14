import React from 'react';
import { actions } from "../../redux/reducers";
import { connect } from "react-redux";

class TodosListPage extends React.Component {
  constructor(props) {
    super(props);

  }

  render = () => {
    return <div/>
  }
}

const mapStateToProps = (state) => {
  return {
    // isLoading: state.isLoading,
    // name: state.name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getUserInfo: (callback) => {
    //   dispatch(actions.getUserInfo(callback));
    // }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosListPage);