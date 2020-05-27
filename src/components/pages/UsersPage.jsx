import React from 'react';
import LoadingElement from '../common/LoadingElement';

import { actions } from "state/actions";
import { connect } from "react-redux";

class UsersPage extends React.Component {
  constructor(props) {
    super(props);

    this.props.getUserInfo();
  }

  render = () => {
    return this.props.isLoading ? <LoadingElement/> : (
      this.props.name ? (
      <div>
      </div>
      ) : null
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.users.isLoading,
    name: state.users.usersList,
    errorText: state.users.errorText,
    isLoadingUsersFailed: state.users.isLoadingUsersFailed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => {
      dispatch(actions.getAllUsers());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);