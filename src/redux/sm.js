import { ServerAPI } from "../server-api";
import axios from 'axios';
import {
    onSuccessfullLogin,
    onSuccessfullLogout
} from '../Utils';

const ACTION_TYPES = {
    USERNAME_CHANGE: 'USERNAME_CHANGE',
    PASSWORD_CHANGE: 'PASSWORD_CHANGE',

    LOADING_LOGIN_FORM: 'LOADING_LOGIN_FORM',

    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',

    LOGOUT: 'LOGOUT'
};

export const actions = {
    usernameChange: (login) => {
        return {
            type: ACTION_TYPES.USERNAME_CHANGE,
            login: login
        };
    },
    passwordChange: (password) => {
        return {
            type: ACTION_TYPES.PASSWORD_CHANGE,
            password: password
        };
    },

    isLoading: () => {
        return {
            type: ACTION_TYPES.LOADING_LOGIN_FORM,
            isLoading: true
        };
    },

    loginAction: (data, callback) => {
        return (dispatch) => {
            // axios.defaults.withCredentials = true;
            // axios.defaults.headers = {
            //     'Access-Control-Allow-Origin': true,
            //     'Access-Control-Allow-Credentials': true
            // };

            dispatch(actions.isLoading());

            axios
                .post(`http://localhost:3000/api/v1/login`, {
                    login: data.login,
                    password: data.password
                }, {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true
                    }
                })
                .then(res => {
                    console.log(res);
                    dispatch(actions.loginSuccess(res.data));
                    onSuccessfullLogin({
                        ...res.data,
                        login: data.login
                    }, callback);
                })
                .catch(err => {
                    console.log('fail');
                    dispatch(actions.loginFail(err.message));
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
                ...data,
                isLoading: false
            }
        };
    },
    logout: (callback) => {
        axios
            .post(`http://localhost:3000/api/v1/logout`, null, {
                withCredentials: true,
                credentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
                    'Content-Type': 'application/json'
                    // Authorization: `Bearer ${cookie_value}`
                }
            })
            .then(res => {
                console.log(res);
                onSuccessfullLogout(callback);

                return {
                    type: ACTION_TYPES.LOGOUT,
                    payload: { undefined }
                };
            })
            .catch(err => {
                console.log('fail');
            });
    }
};

export const initialInitState = {
    login: '',
    password: '',
    name: '',
    role: '',
    isLoading: false
};

export default function todoAppReducer(state = initialInitState, action) {
    switch (action.type) {
        case ACTION_TYPES.USERNAME_CHANGE: {
            return {
                ...state,
                login: action.login,
                isValid: !!(state.password && action.login)
            }
        }
        case ACTION_TYPES.PASSWORD_CHANGE: {
            return {
                ...state,
                password: action.password,
                isValid: !!(state.login && action.password)
            }
        }

        case ACTION_TYPES.LOADING_LOGIN_FORM: {
            return {
                ...state,
                isLoading: !state.isLoading
            }
        }

        case ACTION_TYPES.LOGIN: {
            return {
                login: '',
                password: ''
            };
        }
        case ACTION_TYPES.LOGIN_SUCCESS: {
            return {
                name: action.payload.name,
                role: action.payload.role
            };
        }
        case ACTION_TYPES.LOGIN_FAIL: {
            return {
                ...state,
                isLoading: false
            };
        }
        case ACTION_TYPES.LOGOUT: {
            return {
                ...state,
                login: '',
                password: '',
                name: '',
                role: ''
            };
        }
        default: return state;
    }
}
