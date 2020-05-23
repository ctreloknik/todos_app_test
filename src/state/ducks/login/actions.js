import * as types from "./types";
import ApiHelper from "../../../ApiHelper";
import {
    onSuccessfullLogin,
    onSuccessfullLogout
} from "../../../Utils";

export const checkAutentification = () => {
    return (dispatch) => {
        dispatch(checkAutentificationProcess(false));

        ApiHelper.getInfoAboutMe().then(res => {
            onSuccessfullLogin({ ...res.data });
            dispatch(checkAutentificationProcess(true, true));
        }).catch(err => {
            dispatch(checkAutentificationProcess(true, false));
        });
    }
};

export const checkAutentificationProcess = (isAppLoaded, status) => {
    return {
        type: types.CHECK_AUTENTIFICATION_PROCESS,
        isAppLoaded: isAppLoaded,
        status: status
    }
};

export const usernameChange = (login) => {
    return {
        type: types.USERNAME_CHANGE,
        login: login,
        errorText: ''
    };
};

export const passwordChange = (password) => {
    return {
        type: types.PASSWORD_CHANGE,
        password: password,
        errorText: ''
    };
};

export const loadingOnLogin = () => {
    return {
        type: types.LOADING_LOGIN_FORM,
        isLoading: true
    };
};

export const loginAction = (data, callback) => {
    return (dispatch) => {
        dispatch(loadingOnLogin());

        ApiHelper.login({
            login: data.login,
            password: data.password
        }).then(res => {
            // console.log(res);
            dispatch(loginSuccess(res.data));
            onSuccessfullLogin({
                ...res.data,
                login: data.login
            }, callback);
        }).catch(err => {
            console.log('fail');
            dispatch(loginFail(err.errorText));
        });
    };
};

export const loginSuccess = (data) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: {
            ...data,
            isLoading: false
        }
    };
};

export const loginFail = (data) => {
    return {
        type: types.LOGIN_FAIL,
        payload: {
            errorText: data,
            isLoading: false,
            isValid: true
        }
    };
};

export const logout = (callback) => {
    return (dispatch) => {
        ApiHelper.logout().then(res => {
            dispatch(logoutSuccess())
            onSuccessfullLogout(callback);
        }).catch(err => {
        });
    }
};

export const logoutSuccess = () => {
    return {
        type: types.LOGOUT,
        payload: { undefined }
    };
};