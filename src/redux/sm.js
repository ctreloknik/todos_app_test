// import axios from 'axios';
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

            ApiHelper.getInfoAboutMe()
                .then(res => {
                    onSuccessfullLogin({...res.data});
                    dispatch(actions.checkAutentificationProcess(true, true));
                })
                .catch(err => {
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
            login: login
        };
    },
    passwordChange: (password) => {
        return {
            type: ACTION_TYPES.PASSWORD_CHANGE,
            password: password
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
                isLoading: false,
                isValid: true
            }
        };
    },
    logout: (callback) => {
        return (dispatch) => {
            ApiHelper.logout()
                .then(res => {
                    console.log(res);
                    dispatch(actions.logoutSuccess())
                    onSuccessfullLogout(callback);
                })
                .catch(err => {
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

    getUserInfo: (callback) => {
        return (dispatch) => {
            dispatch(actions.getUserInfoLoadingProcess(true));

            ApiHelper.getInfoAboutMe()
                .then(res => {
                    console.log(res);
                    dispatch(actions.getUserInfoSuccess({ ...res.data, isLoading: false }));
                })
                .catch(err => {
                    if (err.response && err.response.status === 401) {
                        doLogout();
                        dispatch(actions.getUserInfoLoadingProcess(false));
                        callback();
                    }
                    console.log('fail');
                });
        }
    },
    getUserInfoLoadingProcess: (isLoading) => {
        return {
            type: ACTION_TYPES.GET_ABOUT_ME_SUCCESS,
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
        case ACTION_TYPES.CHECK_AUTENTIFICATION_PROCESS: {
            return {
                isAppLoaded: action.isAppLoaded
            }
        }

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

        // case ACTION_TYPES.LOGIN: {
        //     return {
        //         isLoading: false,
        //         login: state.login,
        //         password: state.password
        //     };
        // }
        case ACTION_TYPES.LOGIN_SUCCESS: {
            return {
                // name: action.payload.name,
                role: action.payload.role
            };
        }
        case ACTION_TYPES.LOGIN_FAIL: {
            return {
                login: state.login,
                password: state.password,
                isLoading: action.payload.isLoading,
                isValid: action.payload.isValid
            };
        }
        case ACTION_TYPES.LOGOUT: {
            return {
                ...state
                // login: '',
                // password: '',
                // name: '',
                // role: '',
                // isLoading: false
            };
        }
        // case ACTION_TYPES.GET_ABOUT_ME: {
        //     return {
        //         name: action.payload.name,
        //         role: action.payload.role
        //     };
        // }
        case ACTION_TYPES.GET_ABOUT_ME_SUCCESS: {
            return {
                name: action.payload.name,
                role: action.payload.role,
                isLoading: action.payload.isLoading
            };
        }
        default: return state;
    }
}
