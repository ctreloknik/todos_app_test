import ApiHelper from '../ApiHelper';
import { ACTION_TYPES } from './ActionTypesConst';

export const actions = {
    getUserInfo: () => {
        return (dispatch) => {
            dispatch(actions.getUserInfoLoadingProcess(true));

            ApiHelper.getInfoAboutMe().then(res => {
                dispatch(actions.getUserInfoSuccess({ ...res.data, isLoading: false }));
            }).catch(err => {
                dispatch(actions.getUserInfoFail());
            });
        }
    },

    getUserInfoLoadingProcess: (isLoading) => {
        return {
            type: ACTION_TYPES.GET_ABOUT_ME_PROCESS,
            payload: {
                isLoading: isLoading
            }
        };
    },

    getUserInfoSuccess: (data) => {
        return {
            type: ACTION_TYPES.GET_ABOUT_ME_SUCCESS,
            payload: { ...data }
        };
    },

    getUserInfoFail: () => {
        return {
            type: ACTION_TYPES.GET_ABOUT_ME_FAIL,
            payload: {
                errorText: 'Error loading data. Please try again.',
                isLoading: false
            }
        };
    },

    getAllTodos: () => {
        return (dispatch) => {
            dispatch(actions.getAllTodosLoadingProcess(true));

            ApiHelper.getAllTodos().then(res => {
                dispatch(actions.getAllTodosSuccess({ elementsList: res.data, isLoading: false }));
            }).catch(err => {
                dispatch(actions.getAllTodosFail());
            });
        };
    },

    getAllTodosLoadingProcess: (isLoading) => {
        return {
            type: ACTION_TYPES.GET_ALL_TODOS_PROCESS,
            payload: {
                isLoading: isLoading
            }
        };
    },

    getAllTodosSuccess: (data) => {
        return {
            type: ACTION_TYPES.GET_ALL_TODOS_SUCCESS,
            payload: { ...data }
        };
    },

    getAllTodosFail: (data) => {
        return {
            type: ACTION_TYPES.GET_ALL_TODOS_FAIL,
            isLoadingTodosFailed: true,
            isLoading: false,
            errorText: 'Error loading data. Please try again.'
        };
    },

    getTodoElementProcess: (isLoading) => {
        return {
            type: ACTION_TYPES.GET_TODO_PROCESS,
            payload: {
                isLoading: isLoading
            }
        };
    },

    getTodoElementSuccess: (data) => {
        return {
            type: ACTION_TYPES.GET_TODO_SUCCESS,
            payload: { ...data }
        };
    },

    getTodoElementFail: () => {
        return {
            type: ACTION_TYPES.GET_TODO_FAIL,
            isLoadingTodoWindow: false,
            errorText: 'Loading TODO failed',
        };
    },

    getTodoById: (id) => {
        return (dispatch) => {
            dispatch(actions.getTodoElementProcess(true));

            ApiHelper.getTodoById(id).then(res => {
                dispatch(actions.getTodoElementSuccess({ todoElement: res.data, isLoading: false }));
            }).catch(err => {
                dispatch(actions.getTodoElementFail());
            })
        }
    },

    onTitleChange: (title) => {
        return {
            type: ACTION_TYPES.TODO_TITLE_CHANGE,
            title: title,
            errorText: ''
        };
    },

    onDescriptionChange: (description) => {
        return {
            type: ACTION_TYPES.TODO_DESCRIPTION_CHANGE,
            description: description,
            errorText: ''
        };
    },

    createNewTodoElement: () => {
        return {
            type: ACTION_TYPES.GET_TODO_SUCCESS,
            payload: {
                todoElement: {
                    title: '',
                    description: ''
                },
                isLoading: false
            }
        }
    },

    cancelEditTodo: () => {
        return {
            type: ACTION_TYPES.GET_TODO_SUCCESS,
            payload: {
                todoElement: null,
                isLoading: false
            }
        }
    },

    updateTodo: (data) => {
        return (dispatch) => {
            dispatch(actions.updateTodoProcess(true));

            if (!data.id) {
                ApiHelper.createTodo({
                    title: data.title,
                    description: data.description
                }).then(res => {
                    dispatch(actions.getAllTodos());
                }).catch(err => {
                    dispatch(actions.updateTodoFail('Adding TODO failed.'));
                });
            } else {
                ApiHelper.updateTodo(data.id, {
                    title: data.title,
                    description: data.description
                }).then(res => {
                    dispatch(actions.getAllTodos());
                }).catch(err => {
                    dispatch(actions.updateTodoFail('Updating TODO failed.'));
                });
            }
        };
    },

    updateTodoProcess: (isLoading) => {
        return {
            type: ACTION_TYPES.SAVE_TODO_PROCESS,
            payload: {
                errorText: '',
                isLoadingTodoWindow: isLoading
            }
        }
    },

    updateTodoFail: (errorText) => {
        return {
            type: ACTION_TYPES.SAVE_TODO_FAIL,
            payload: {
                isLoadingTodoWindow: false,
                errorText: errorText
            }
        }
    },

    removeTodo: (todoId) => {
        return (dispatch) => {
            ApiHelper.deleteTodo(todoId).then(data => {
                dispatch(actions.getAllTodos());
            }).catch(err => {
                dispatch(actions.removeTodoFail());
            })
        }
    },

    removeTodoFail: () => {
        return {
            type: ACTION_TYPES.REMOVE_TODO_FAIL,
            payload: {
                errorText: 'Remove failed.',
                isLoading: false
            }
        }
    }
};