import * as types from "./types";
import createReducer from "../../utils/createReducer";

export const initialState = {
    name: '',
    role: '',
    isLoading: false,
    errortext: ''
};

const homeReducer = createReducer(initialState)({
    [types.GET_ABOUT_ME_SUCCESS]: (state, action) => {
        return {
            name: action.payload.name,
            role: action.payload.role,
            isLoading: action.payload.isLoading,
            errortext: ''
        };
    },
    [types.GET_ABOUT_ME_FAIL]: (state, action) => {
        return {
            isLoading: action.payload.isLoading,
            errorText: action.payload.errorText
        };
    },
    [types.GET_ABOUT_ME_PROCESS]: (state, action) => {
        return {
            isLoading: action.payload.isLoading
        };
    }
})

export default homeReducer;