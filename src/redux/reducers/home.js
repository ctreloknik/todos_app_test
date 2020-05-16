import { ACTION_TYPES } from '../ActionTypesConst';

export const initialInitState = {
    login: '',
    password: '',
    name: '',
    role: '',
    isLoading: false
};

export default function homeReducer(state = initialInitState, action) {
    switch (action.type) {
        case ACTION_TYPES.GET_ABOUT_ME_SUCCESS: {
            return {
                name: action.payload.name,
                role: action.payload.role,
                isLoading: action.payload.isLoading
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
