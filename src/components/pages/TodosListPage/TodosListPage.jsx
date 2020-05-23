import React from 'react';
import LoadingElement from '../../common/LoadingElement';
import AddEditTodoDialog from './AddEditTodoDialog';
import './TodosListPage.scss';
import { actions } from "../../../state/actions";
import { connect } from "react-redux";
import { getTodosSelector } from "../../../state/ducks/todos/selectors";


import { SecurityCfgCheck } from "../../../Utils";

class TodosListPage extends React.Component {
  componentDidMount() {
    this.props.getAllTodos();
  }

  onEditButtonClick = todoId => {
    if (todoId) {
      this.props.getTodoById(todoId);
    } else {
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
            onClick={() => this.onEditButtonClick(todo.id)}>Edit</button>
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
          <button onClick={() => this.props.getAllTodos()}>Reload</button>
          {this.props.errorText || null}
          {!this.props.isLoadingTodosFailed ? (
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
          ) : null}
          {this.props.selectedRecord
            && <AddEditTodoDialog
              onCancel={this.onModalClose}
              todoId={this.props.selectedRecord.id} />}
        </>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedRecord: state.todos.todoElement,
    elementsList: getTodosSelector(state) || [],
    isLoadingTodosFailed: state.todos.isLoadingTodosFailed,
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