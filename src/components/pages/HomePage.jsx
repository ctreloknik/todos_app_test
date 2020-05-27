import React from 'react';
import LoadingElement from '../common/LoadingElement';

import { actions } from "state/actions";
import { connect } from "react-redux";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.props.getUserInfo();
  }

  renderUserInfo() {
    return this.props.name ? (
      <div>
        Welcome, {this.props.name}
      </div>
    ) : null
  }

  renderError() {
    return this.props.errorText;
  }

  render = () => {
    return this.props.isLoading ? <LoadingElement /> : (
      <>
        {this.renderError()}
        {this.renderUserInfo()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.home.isLoading,
    name: state.home.name,
    errorText: state.home.errorText
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