import React from 'react';
import './AddEditTodoDialog.scss'

import { todosOperations } from "state/ducks/todos/index";
import { connect } from "react-redux";

class AddEditTodoDialog extends React.Component {
    onSave = () => {
        const data = {
            id: this.props.todoId,
            title: this.props.title,
            description: this.props.description
        }
        this.props.updateTodo(data);
    }

    onTitleChange = event => {
        const value = event.target.value;
        this.props.onTitleChange(value)
    }

    onDescriptionChange = event => {
        const value = event.target.value;
        this.props.onDescriptionChange(value)
    }

    render() {
        return (
            <aside className="modal-overlay">
                <div className="add-edit-todo-dialog">
                    <div className="modal-title">
                        {this.props.todo ? 'Edit todo' : 'Add todo'}
                    </div>

                    <div className="modal-body">
                        <label>Name</label>
                        <input value={this.props.title}
                            disabled={this.props.isLoadingTodoWindow}
                            type='text'
                            onChange={this.onTitleChange} />

                        <label>Description</label>
                        <input value={this.props.description}
                            disabled={this.props.isLoadingTodoWindow}
                            onChange={this.onDescriptionChange} />
                    </div>
                    <div className="modal-footer">
                        <button disabled={this.props.isLoadingTodoWindow}
                            onClick={this.props.onCancel}
                            className="modal-footer-button">Cancel</button>
                        <button disabled={this.props.isLoadingTodoWindow}
                            onClick={this.onSave}
                            className="modal-footer-button">Save</button>
                        {this.props.saveErrorText}
                    </div>
                </div>
            </aside>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.todos.todoElement.title || '',
        description: state.todos.todoElement.description || '',
        isLoadingTodoWindow: state.todos.isLoadingTodoWindow,
        saveErrorText: state.todos.saveErrorText
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTitleChange: (value) => {
            dispatch(todosOperations.onTitleChange(value));
        },
        onDescriptionChange: (value) => {
            dispatch(todosOperations.onDescriptionChange(value));
        },
        updateTodo: (data, isNew) => {
            dispatch(todosOperations.updateTodo(data, isNew));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditTodoDialog);