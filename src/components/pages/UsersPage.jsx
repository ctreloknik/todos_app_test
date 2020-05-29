import React from 'react';
import LoadingElement from '../common/LoadingElement';
import './UsersPage.scss';
import { usersOperations } from "state/ducks/users/index";
import { connect } from "react-redux";

class UsersPage extends React.Component {
  constructor(props) {
    super(props);

    this.props.getAllUsers();
  }

  renderUsers() {
    return this.props.usersList.map((user, index) => (
      <tr key={index}>
        <td>{user.name}</td>
        <td>{user.role}</td>
      </tr>
    ))
  }

  render = () => {
    const cssTable = this.props.isLoading ?
      'users-list-table table-disabled' : 'users-list-table';

    return (
      <>
        <button disabled={this.props.isLoading}
          onClick={() => this.props.getAllUsers()}>Reload</button>
        {this.props.errorText || null}
        {!this.props.isLoadingUsersFailed ? (
          <table className={cssTable}>
            <thead>
              <tr>
                <td>Name</td>
                <td>Role</td>
              </tr>
            </thead>
            <tbody>
              {this.renderUsers()}
            </tbody>
          </table>
        ) : null}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.users.isLoading,
    usersList: state.users.usersList || [],
    errorText: state.users.errorText,
    isLoadingUsersFailed: state.users.isLoadingUsersFailed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => {
      dispatch(usersOperations.getAllUsers());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);