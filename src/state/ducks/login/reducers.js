import * as types from "./types";
import createReducer from "../../utils/createReducer";

const initialState = {
    login: '',
    password: '',
    // name: '',
    // role: '',
    isLoading: false
}

const loginReducer = createReducer(initialState)({
    [types.CHECK_AUTENTIFICATION_PROCESS]: (state, action) => {
        return {
            isAppLoaded: action.isAppLoaded
        }
    },
    [types.USERNAME_CHANGE]: (state, action) => {
        return {
            ...state,
            login: action.login,
            errorText: action.errorText
        }
    },
    [types.PASSWORD_CHANGE]: (state, action) => {
        return {
            ...state,
            password: action.password,
            errorText: action.errorText
        }
    },
    [types.LOADING_LOGIN_FORM]: (state, action) => {
        return {
            ...state,
            isLoading: !state.isLoading
        }
    },
    [types.LOGIN_SUCCESS]: (state, action) => {
        return {
            isLoading: action.payload.isLoading
        };
    },
    [types.LOGIN_FAIL]: (state, action) => {
        return {
            login: state.login,
            password: state.password,
            isLoading: action.payload.isLoading,
            isValid: action.payload.isValid,
            errorText: action.payload.errorText
        };
    },
    [types.LOGOUT]: (state, action) => {
        return {
            ...state
            // isLoading: false
        };
    },
})

export default loginReducer;