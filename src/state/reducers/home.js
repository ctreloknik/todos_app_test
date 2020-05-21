import { ACTION_TYPES } from '../ActionTypesConst';

export const initialInitState = {
    name: '',
    role: '',
    isLoading: false,
    errortext: ''
};

export default function homeReducer(state = initialInitState, action) {
    switch (action.type) {
        case ACTION_TYPES.GET_ABOUT_ME_SUCCESS: {
            return {
                name: action.payload.name,
                role: action.payload.role,
                isLoading: action.payload.isLoading,
                errortext: ''
            };
        }
        case ACTION_TYPES.GET_ABOUT_ME_FAIL: {
            return {
                isLoading: action.payload.isLoading,
                errorText: action.payload.errorText
            };
        }
        case ACTION_TYPES.GET_ABOUT_ME_PROCESS: {
            return {
                isLoading: action.payload.isLoading
            };
        }
        default: return state;
    }
}
