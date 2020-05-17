import React from 'react';
import LoadingElement from '../../common/LoadingElement';
import AddEditTodoDialog from './AddEditTodoDialog';
import './TodosListPage.scss';
import { actions } from "../../../state/actions";
import { connect } from "react-redux";

import { SecurityCfgCheck } from "../../../Utils";

class TodosListPage extends React.Component {
  componentDidMount() {
    this.props.getAllTodos();
  }

  onEditButtonClick = editedTodo => {
    if (editedTodo) {
      this.isNew = false;
      this.props.getTodoById(editedTodo.id);
    } else {
      this.isNew = true;
      this.props.createNewTodoElement();
    }
  }

  onRemoveButtonClick = (todoId) => {
    this.props.removeTodo(todoId);
  }

  onModalClose = () => {
    this.props.cancelEditTodo();
  }

  canUserEditTodo = (createdBy) => {
    return SecurityCfgCheck.canUserEditTodoElement(createdBy);
  }

  canUserRemoveTodo = (createdBy) => {
    return SecurityCfgCheck.canUserRemoveTodoElement(createdBy);
  }

  renderTodos() {
    return this.props.elementsList.map((todo, index) => (
      <tr key={index}>
        <td>{todo.title}</td>
        <td>{todo.description}</td>
        <td>{todo.createdBy}</td>
        <td>
          <button disabled={!this.canUserEditTodo(todo.createdBy)}
            onClick={() => this.onEditButtonClick(todo)}>Edit</button>
          <button disabled={!this.canUserEditTodo(todo.createdBy)}
            onClick={() => this.onRemoveButtonClick(todo.id)}>Remove</button>
        </td>
      </tr>
    ))
  }

  render = () => {
    return this.props.isLoading ? <LoadingElement /> :
      (
        <>
          <button onClick={() => this.onEditButtonClick(null)}>Add note</button>
          {this.props.errorText || null}
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
          {this.props.selectedRecord
            && <AddEditTodoDialog
              isNew={this.isNew}
              onCancel={this.onModalClose}
              todoId={this.props.selectedRecord.id} />}
        </>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedRecord: state.todos.todoElement,
    elementsList: state.todos.elementsList || [],
    isLoading: state.todos.isLoading,
    errorText: state.todos.errorText
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTodos: () => {
      dispatch(actions.getAllTodos());
    },
    createNewTodoElement: () => {
      dispatch(actions.createNewTodoElement());
    },
    getTodoById: (todoId) => {
      dispatch(actions.getTodoById(todoId));
    },
    cancelEditTodo: () => {
      dispatch(actions.cancelEditTodo());
    },
    removeTodo: (todoId) => {
      dispatch(actions.removeTodo(todoId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosListPage);