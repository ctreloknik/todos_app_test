import {
    onSuccessfullLogin,
    onSuccessfullLogout,
    doLogout
} from '../Utils';

import ApiHelper from '../ApiHelper';
import { ACTION_TYPES } from './ActionTypesConst';

export const actions = {
    checkAutentification: () => {
        return (dispatch) => {
            dispatch(actions.checkAutentificationProcess(false));

            ApiHelper.getInfoAboutMe().then(res => {
                onSuccessfullLogin({ ...res.data });
                dispatch(actions.checkAutentificationProcess(true, true));
            }).catch(err => {
                dispatch(actions.checkAutentificationProcess(true, false));
                doLogout();
            });
        }
    },

    checkAutentificationProcess: (isAppLoaded, status) => {
        return {
            type: ACTION_TYPES.CHECK_AUTENTIFICATION_PROCESS,
            isAppLoaded: isAppLoaded,
            status: status
        }
    },

    usernameChange: (login) => {
        return {
            type: ACTION_TYPES.USERNAME_CHANGE,
            login: login,
            errorText: ''
        };
    },
    passwordChange: (password) => {
        return {
            type: ACTION_TYPES.PASSWORD_CHANGE,
            password: password,
            errorText: ''
        };
    },

    loadingOnLogin: () => {
        return {
            type: ACTION_TYPES.LOADING_LOGIN_FORM,
            isLoading: true
        };
    },

    loginAction: (data, callback) => {
        return (dispatch) => {
            dispatch(actions.loadingOnLogin());

            ApiHelper.login({
                login: data.login,
                password: data.password
            }).then(res => {
                console.log(res);
                dispatch(actions.loginSuccess(res.data));
                onSuccessfullLogin({
                    ...res.data,
                    login: data.login
                }, callback);
            }).catch(err => {
                console.log('fail');
                dispatch(actions.loginFail(err.response.data.message));
            });
        };
    },

    loginSuccess: (data) => {
        return {
            type: ACTION_TYPES.LOGIN_SUCCESS,
            payload: {
                ...data,
                isLoading: false
            }
        };
    },
    loginFail: (data) => {
        return {
            type: ACTION_TYPES.LOGIN_FAIL,
            payload: {
                errorText: data,
                isLoading: false,
                isValid: true
            }
        };
    },
    logout: (callback) => {
        return (dispatch) => {
            ApiHelper.logout().then(res => {
                console.log(res);
                dispatch(actions.logoutSuccess())
                onSuccessfullLogout(callback);
            }).catch(err => {
                console.log('fail');
            });
        }
    },
    logoutSuccess: () => {
        return {
            type: ACTION_TYPES.LOGOUT,
            payload: { undefined }
        };
    },

    getUserInfo: () => {
        return (dispatch) => {
            dispatch(actions.getUserInfoLoadingProcess(true));

            ApiHelper.getInfoAboutMe().then(res => {
                console.log(res);
                dispatch(actions.getUserInfoSuccess({ ...res.data, isLoading: false }));
            }).catch(err => {
                dispatch(actions.getUserInfoLoadingProcess(false));
                console.log('fail');
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

    getAllTodos: () => {
        return (dispatch) => {
            dispatch(actions.getAllTodosLoadingProcess(true));

            ApiHelper.getAllTodos().then(res => {
                console.log(res);
                dispatch(actions.getAllTodosSuccess({ elementsList: res.data, isLoading: false }));
            }).catch(err => {
                dispatch(actions.getAllTodosLoadingProcess(false));
                console.log('fail');
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
            payload: { ...data }
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
            isLoadingTodoFail: true,
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

    updateTodo: (data, isNew) => {
        return (dispatch) => {
            dispatch(actions.getTodoElementProcess(true));

            if (isNew) {
                ApiHelper.createTodo({
                    title: data.title,
                    description: data.description
                }).then(res => {
                    console.log(res);
                    dispatch(actions.getAllTodos());
                }).catch(err => {
                    console.log('fail');
                    // dispatch(actions.loginFail(err.response.data.message));
                });
            } else {
                ApiHelper.updateTodo(data.id, {
                    title: data.title,
                    description: data.description
                }).then(res => {
                    console.log(res);
                    dispatch(actions.getAllTodos());
                }).catch(err => {
                    console.log('fail');
                    // dispatch(actions.loginFail(err.response.data.message));
                });
            }
        };
    },

    removeTodo: (todoId) => {
        return (dispatch) => {
            ApiHelper.deleteTodo(todoId).then(data => {
                dispatch(actions.getAllTodos());
            }).catch(err => {

            })
        }
    }
};