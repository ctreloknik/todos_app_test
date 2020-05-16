import React from 'react';
import './AddEditTodoDialog.scss'

import { actions } from "../../../redux/actions";
import { connect } from "react-redux";

class AddEditTodoDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: { ...props.todo }
        }
    }

    componentDidUpdate(prevProps) {
        // if (prevProps.todo.id !== this.props.todo.id) {
        //     this.setState({ ...this.props.todo })
        // }
    }

    onSave = () => {
        this.props.updateTodo(this.state.todo, this.props.onSave, this.props.isNew);
    }

    onTitleChange = event => {
        this.setState({
            ...this.state,
            todo: {
                ...this.state.todo,
                title: event.target.value
            }
        })
    }

    onDescriptionChange = event => {
        this.setState({
            ...this.state,
            todo: {
                ...this.state.todo,
                description: event.target.value
            }
        })
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
                        <input value={this.state.todo.title}
                            type='text'
                            onChange={this.onTitleChange} />

                        <label>Description</label>
                        <input value={this.state.todo.description}
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

const mapStateToProps = (state) => ({ ...state.todos });

const mapDispatchToProps = (dispatch) => {
  return {
    updateTodo: (data, callback, isNew) => {
      dispatch(actions.updateTodo(data, callback, isNew));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditTodoDialog);