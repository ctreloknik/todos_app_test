import * as types from "./types";
import createReducer from "../../utils/createReducer";

export const initialState = {
    todoElement: {},
    elementsList: [],
    isLoading: false,
    isLoadingTodoFail: false,
    isLoadingTodosFailed: false
};

const todosReducer = createReducer(initialState)({
    [types.GET_ALL_TODOS_SUCCESS]: (state, action) => {
        return {
            elementsList: action.payload.elementsList,
            isLoading: action.payload.isLoading,
            isLoadingTodosFailed: action.payload.isLoading
        };
    },
    [types.GET_ALL_TODOS_FAIL]: (state, action) => {
        return {
            ...state,
            errorText: action.errorText,
            isLoadingTodosFailed: action.isLoadingTodosFailed,
            isLoading: action.isLoading
        };
    },
    [types.GET_ALL_TODOS_PROCESS]: (state, action) => {
        return {
            isLoading: action.payload.isLoading
        };
    },
    [types.GET_TODO_SUCCESS]: (state, action) => {
        return {
            ...state,
            errorText: '',
            todoElement: action.payload.todoElement,
            isLoading: action.payload.isLoading
        };
    },
    [types.GET_TODO_FAIL]: (state, action) => {
        return {
            ...state,
            errorText: action.errorText,
            isLoading: action.isLoading
        };
    },
    [types.GET_TODO_PROCESS]: (state, action) => {
        return {
            ...state,
            isLoading: action.payload.isLoading
            // isLoadingTodoWindow: action.payload.isLoading
        };
    },
    [types.TODO_TITLE_CHANGE]: (state, action) => {
        return {
            ...state,
            todoElement: {
                ...state.todoElement,
                title: action.title
            }
        }
    },
    [types.TODO_DESCRIPTION_CHANGE]: (state, action) => {
        return {
            ...state,
            todoElement: {
                ...state.todoElement,
                description: action.description
            }
        }
    },
    [types.SAVE_TODO_FAIL]: (state, action) => {
        return {
            ...state,
            saveErrorText: action.payload.errorText,
            isLoadingTodoWindow: action.payload.isLoadingTodoWindow
        };
    },
    [types.SAVE_TODO_PROCESS]: (state, action) => {
        return {
            ...state,
            saveErrorText: action.payload.errorText,
            isLoadingTodoWindow: action.payload.isLoadingTodoWindow
        };
    },
    [types.REMOVE_TODO_PROCESS]: (state, action) => {
        return {
            ...state,
            isLoading: action.payload.isLoading
        };
    },
    [types.REMOVE_TODO_FAIL]: (state, action) => {
        return {
            ...state,
            errorText: action.payload.errorText,
            isLoading: action.payload.isLoading
        };
    },
})

export default todosReducer;