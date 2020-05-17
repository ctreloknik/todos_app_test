import React from 'react';
import './AddEditTodoDialog.scss'

import { actions } from "../../../state/actions";
import { connect } from "react-redux";

class AddEditTodoDialog extends React.Component {
    onSave = () => {
        const data = {
            id: this.props.todoId,
            title: this.props.title,
            description: this.props.description
        }
        this.props.updateTodo(data, this.props.isNew);
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
                            type='text'
                            onChange={this.onTitleChange} />

                        <label>Description</label>
                        <input value={this.props.description}
                            onChange={this.onDescriptionChange} />
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.props.onCancel} className="modal-footer-button">Cancel</button>
                        <button onClick={this.onSave} className="modal-footer-button">Save</button>
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
        isLoading: state.todos.isLoadingTodoWindow
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTitleChange: (value) => {
            dispatch(actions.onTitleChange(value));
        },
        onDescriptionChange: (value) => {
            dispatch(actions.onDescriptionChange(value));
        },
        updateTodo: (data, isNew) => {
            dispatch(actions.updateTodo(data, isNew));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditTodoDialog);