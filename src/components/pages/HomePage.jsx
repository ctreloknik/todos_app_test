import React from 'react';
import { actions } from "../../redux/sm";
import { connect } from "react-redux";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.props.getUserInfo(this.props.onFail);
  }

  render = () => {
    return (
      <div>
        Welcome, {this.props.name}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      name: state.name, //|| localStorage.getItem('user'),
      role: state.role || localStorage.getItem('role')
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