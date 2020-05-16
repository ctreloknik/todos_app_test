import React from 'react';
import LoadingElement from '../common/LoadingElement';

import { actions } from "../../redux/actions";
import { connect } from "react-redux";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.props.getUserInfo();
  }

  render = () => {
    return this.props.isLoading ? <LoadingElement/> : (
      this.props.name ? (
      <div>
        Welcome, {this.props.name}
      </div>
      ) : null
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.home.isLoading,
    name: state.home.name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => {
      dispatch(actions.getUserInfo());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);