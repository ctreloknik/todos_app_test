import * as types from "./types";
import createReducer from "../../utils/createReducer";

const initialState = {}

const usersReducer = createReducer(initialState)({
    [types.GET_USERS_LIST_PROCESS]: (state, action) => {
        return {
            isLoading: action.payload.isLoading
        }
    },
    [types.GET_USERS_LIST_SUCCESS]: (state, action) => {
        return {
            ...state,
            usersList: action.payload.usersList,
            isLoading: action.payload.isLoading,
            isLoadingUsersFailed: action.payload.isLoading
        }
    },
    [types.GET_USERS_LIST_FAIL]: (state, action) => {
        return {
            ...state,
            errorText: action.payload.errorText,
            isLoading: action.payload.isLoading,
            isLoadingUsersFailed: action.payload.isLoadingUsersFailed
        }
    },
})

export default usersReducer;