import { ServerAPI } from "../server-api";
import axios from 'axios';

const ACTION_TYPES = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    LOGOUT: 'LOGOUT',

    CLEAR_RESULT: 'CLEAR_RESULT',
    ADD_NUMBER: 'ADD_NUMBER',
    ADD_DOT: 'ADD_DOT',
    UPDATE_OPERATION: 'UPDATE_OPERATION',
    CALCULATE: 'CALCULATE'
};

export const actions = {
    login: (data, callback) => {
        return (dispatch) => {
            // dispatch(addTodoStarted());

            axios
                .post(`http://localhost:3000/api/v1/login`,
                    {
                        login: data.login,
                        password: data.password
                    }
                )
                .then(res => {
                    console.log(res);
                    callback()
                    dispatch(actions.loginSuccess(res.data));
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
            payload: { ...data }
        };
    },
    loginFail: (data) => {
        return {
            type: ACTION_TYPES.LOGIN_FAIL,
            payload: { ...data }
        };
    },
    logout: () => {
        return {
            type: ACTION_TYPES.LOGOUT,
            payload: { undefined }
        };
    },


    clearResult: () => {
        return {
            type: ACTION_TYPES.CLEAR_RESULT,
            payload: { undefined }
        };
    },
    addNumber: (number, isFirst) => {
        return {
            type: ACTION_TYPES.ADD_NUMBER,
            payload: { number, isFirst }
        }
    },
    addDot: (isFirst) => {
        return {
            type: ACTION_TYPES.ADD_DOT,
            isFirst: isFirst
        }
    },
    updateOperation: (operation) => {
        return {
            type: ACTION_TYPES.UPDATE_OPERATION,
            payload: { operation }
        }
    },
    calculate: (state, operation) => {
        return (dispatch) => {
            ServerAPI.calculate(state).then(data => {
                dispatch({
                    type: ACTION_TYPES.CALCULATE,
                    result: data.result,
                    operation: operation ? operation : ''
                });
            })
        }
    },

};

export const initialInitState = {
    login: '',
    password: '',
    isLoading: false
};

export default function todoAppReducer(state = initialInitState, action) {
    switch (action.type) {
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
                login: '',
                password: ''
            };
        }
        default: return state;
    }
}
