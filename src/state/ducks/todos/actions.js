import * as types from "./types";
import ApiHelper from "ApiHelper";

export const getAllTodos = () => {
    return (dispatch) => {
        dispatch(getAllTodosLoadingProcess(true));

        ApiHelper.getAllTodos().then(res => {
            dispatch(getAllTodosSuccess({ elementsList: res.data, isLoading: false }));
        }).catch(err => {
            dispatch(getAllTodosFail());
        });
    };
};

export const getAllTodosLoadingProcess = (isLoading) => {
    return {
        type: types.GET_ALL_TODOS_PROCESS,
        payload: {
            isLoading: isLoading
        }
    };
};

export const getAllTodosSuccess = (data) => {
    return {
        type: types.GET_ALL_TODOS_SUCCESS,
        payload: { ...data }
    };
};

export const getAllTodosFail = (data) => {
    return {
        type: types.GET_ALL_TODOS_FAIL,
        isLoadingTodosFailed: true,
        isLoading: false,
        errorText: 'Error loading data. Please try again.'
    };
};

export const getTodoElementProcess = (isLoading) => {
    return {
        type: types.GET_TODO_PROCESS,
        payload: {
            isLoading: isLoading
        }
    };
};

export const getTodoElementSuccess = (data) => {
    return {
        type: types.GET_TODO_SUCCESS,
        payload: { ...data }
    };
};

export const getTodoElementFail = () => {
    return {
        type: types.GET_TODO_FAIL,
        isLoadingTodoWindow: false,
        errorText: 'Loading TODO failed',
    };
};

export const getTodoById = (id) => {
    return (dispatch) => {
        dispatch(getTodoElementProcess(true));

        ApiHelper.getTodoById(id).then(res => {
            dispatch(getTodoElementSuccess({ todoElement: res.data, isLoading: false }));
        }).catch(err => {
            dispatch(getTodoElementFail());
        })
    }
};

export const onTitleChange = (title) => {
    return {
        type: types.TODO_TITLE_CHANGE,
        title: title,
        errorText: ''
    };
};

export const onDescriptionChange = (description) => {
    return {
        type: types.TODO_DESCRIPTION_CHANGE,
        description: description,
        errorText: ''
    };
};

export const createNewTodoElement = () => {
    return {
        type: types.GET_TODO_SUCCESS,
        payload: {
            todoElement: {
                title: '',
                description: ''
            },
            isLoading: false
        }
    }
};

export const cancelEditTodo = () => {
    return {
        type: types.GET_TODO_SUCCESS,
        payload: {
            todoElement: null,
            isLoading: false
        }
    }
};

export const updateTodo = (data) => {
    return (dispatch) => {
        dispatch(updateTodoProcess(true));

        if (!data.id) {
            ApiHelper.createTodo({
                title: data.title,
                description: data.description
            }).then(res => {
                dispatch(getAllTodos());
            }).catch(err => {
                dispatch(updateTodoFail('Adding TODO failed.'));
            });
        } else {
            ApiHelper.updateTodo(data.id, {
                title: data.title,
                description: data.description
            }).then(res => {
                dispatch(getAllTodos());
            }).catch(err => {
                dispatch(updateTodoFail('Updating TODO failed.'));
            });
        }
    };
};

export const updateTodoProcess = (isLoading) => {
    return {
        type: types.SAVE_TODO_PROCESS,
        payload: {
            errorText: '',
            isLoadingTodoWindow: isLoading
        }
    }
};

export const updateTodoFail = (errorText) => {
    return {
        type: types.SAVE_TODO_FAIL,
        payload: {
            isLoadingTodoWindow: false,
            errorText: errorText
        }
    }
};

export const removeTodo = (todoId) => {
    return (dispatch) => {
        dispatch(removeTodoProcess(true))

        ApiHelper.deleteTodo(todoId).then(data => {
            dispatch(getAllTodos());
        }).catch(err => {
            dispatch(removeTodoFail());
        })
    }
};

export const removeTodoProcess = (isLoading) => {
    return {
        type: types.REMOVE_TODO_PROCESS,
        payload: {
            isLoading: isLoading
        }
    };
};

export const removeTodoFail = () => {
    return {
        type: types.REMOVE_TODO_FAIL,
        payload: {
            errorText: 'Remove failed.',
            isLoading: false
        }
    }
};