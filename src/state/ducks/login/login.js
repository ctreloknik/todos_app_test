import { ACTION_TYPES } from '../../ActionTypesConst';

export const initialInitState = {
    login: '',
    password: '',
    // name: '',
    // role: '',
    isLoading: false
};

export default function loginReducer(state = initialInitState, action) {
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
                isValid: !!(state.password && action.login),
                errorText: action.errorText
            }
        }
        case ACTION_TYPES.PASSWORD_CHANGE: {
            return {
                ...state,
                password: action.password,
                isValid: !!(state.login && action.password), // todo selector
                errorText: action.errorText
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
                // name: action.payload.name, // todo remove
                // role: action.payload.role, // todo remove
                isLoading: action.payload.isLoading
            };
        }
        case ACTION_TYPES.LOGIN_FAIL: {
            return {
                login: state.login,
                password: state.password,
                isLoading: action.payload.isLoading,
                isValid: action.payload.isValid,
                errorText: action.payload.errorText
            };
        }
        case ACTION_TYPES.LOGOUT: {
            return {
                ...state
                // isLoading: false
            };
        }
        default: return state;
    }
}
