import React from 'react';
import LoadingElement from '../../common/LoadingElement';
import AddEditTodoDialog from './AddEditTodoDialog';
import './TodosListPage.scss';
import { actions } from "../../../redux/actions";
import { connect } from "react-redux";

class TodosListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddOrEditDialogOpened: false
    }

    this.selectedRecord = null;
  }

  componentDidMount() {
    this.props.getAllTodos();
  }

  onEditButtonClick = editedTodo => {
    this.isNew = !editedTodo;
    this.selectedRecord = editedTodo;
    this.setState({ isAddOrEditDialogOpened: true });
    // if (editedTodo) {
    //   this.setState({ editedTodo })
    // } else {
    //   this.setState({ newTodo: true });
    // }
  }

  onRemoveButtonClick = (todoId) => {
    this.props.removeTodo(todoId);
  }

  onModalClose = () => {
    // if (this.state.editedTodo) {
      this.setState({ isAddOrEditDialogOpened: false });
      this.selectedRecord = null;
    // } else if (this.state.newTodo) {
      // this.setState({ newTodo: null })
    // }
  }

  onChangesSave = todo => {
    // if (this.state.editedTodo) {
    //   this.props.updateTodo(todo);
    // } else {
    // }
    this.selectedRecord = null;
    this.setState({ isAddOrEditDialogOpened: false });
    // this.setState({ editedTodo: null }) // TODO
  }

  renderTodos() {
    return this.props.elementsList.map((todo, index) => (
      <tr key={index}>
        <td>{todo.title}</td>
        <td>{todo.description}</td>
        <td>{todo.createdBy}</td>
        <td>
          <button onClick={() => this.onEditButtonClick(todo)}>Edit</button>
          <button onClick={() => this.onRemoveButtonClick(todo.id)}>Remove</button>
        </td>
      </tr>
    ))
  }

  render = () => {
    return this.props.isLoading ? <LoadingElement /> :
      (
        <>
          <button onClick={() => this.onEditButtonClick(null)}>Add note</button>
          <table className='todos-list-table'>
            <thead>
              <tr>
                <td>Name</td>
                <td>Description</td>
                <td>Created by</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {this.renderTodos()}
            </tbody>
          </table>
          {this.state.isAddOrEditDialogOpened
            && <AddEditTodoDialog
              isNew={this.isNew}
              onSave={this.onChangesSave}
              onCancel={this.onModalClose}
              todo={this.selectedRecord} />}
        </>
      );
  }
}

const mapStateToProps = (state) => ({ ...state.todos });

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTodos: () => {
      dispatch(actions.getAllTodos());
    },
    removeTodo: (todoId) => {
      dispatch(actions.removeTodo(todoId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosListPage);