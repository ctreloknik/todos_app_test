import React from 'react';
import LoadingElement from '../common/LoadingElement';
import { actions } from "../../redux/sm";
import { connect } from "react-redux";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.props.getUserInfo(this.props.onFail);
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
    isLoading: state.isLoading,
    name: state.name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (callback) => {
      dispatch(actions.getUserInfo(callback));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);