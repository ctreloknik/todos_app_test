import { ACTION_TYPES } from '../../ActionTypesConst';
import createReducer from "../../utils/createReducer";

export const initialState = {
    name: '',
    role: '',
    isLoading: false,
    errortext: ''
};

const homeReducer = createReducer(initialState)({
    [ACTION_TYPES.GET_ABOUT_ME_SUCCESS]: (state, action) => {
        return {
            name: action.payload.name,
            role: action.payload.role,
            isLoading: action.payload.isLoading,
            errortext: ''
        };
    },
    [ACTION_TYPES.GET_ABOUT_ME_FAIL]: (state, action) => {
        return {
            isLoading: action.payload.isLoading,
            errorText: action.payload.errorText
        };
    },
    [ACTION_TYPES.GET_ABOUT_ME_PROCESS]: (state, action) => {
        return {
            isLoading: action.payload.isLoading
        };
    }
})

export default homeReducer;