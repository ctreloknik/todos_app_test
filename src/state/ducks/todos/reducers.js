import { ACTION_TYPES } from '../../ActionTypesConst';

export const initialInitState = {
    todoElement: {},
    elementsList: [],
    isLoading: false,
    isLoadingTodoFail: false,
    isLoadingTodosFailed: false
};

export default function todosReducer(state = initialInitState, action) {
    switch (action.type) {
        case ACTION_TYPES.GET_ALL_TODOS_SUCCESS: {
            return {
                elementsList: action.payload.elementsList,
                isLoading: action.payload.isLoading,
                isLoadingTodosFailed: action.payload.isLoading
            };
        }
        case ACTION_TYPES.GET_ALL_TODOS_FAIL: {
            return {
                ...state,
                errorText: action.errorText,
                isLoadingTodosFailed: action.isLoadingTodosFailed,
                isLoading: action.isLoading
            };
        }
        case ACTION_TYPES.GET_ALL_TODOS_PROCESS: {
            return {
                isLoading: action.payload.isLoading
            };
        }
        case ACTION_TYPES.GET_TODO_SUCCESS: {
            return {
                ...state,
                errorText: '',
                todoElement: action.payload.todoElement,
                isLoadingTodoWindow: action.payload.isLoading
            };
        }
        case ACTION_TYPES.GET_TODO_FAIL: {
            return {
                ...state,
                errorText: action.errorText,
                isLoadingTodoWindow: action.isLoading
            };
        }
        case ACTION_TYPES.GET_TODO_PROCESS: {
            return {
                ...state,
                isLoadingTodoWindow: action.payload.isLoading
            };
        }
        case ACTION_TYPES.TODO_TITLE_CHANGE: {
            return {
                ...state,
                todoElement: {
                    ...state.todoElement,
                    title: action.title
                }
            }
        }
        case ACTION_TYPES.TODO_DESCRIPTION_CHANGE: {
            return {
                ...state,
                todoElement: {
                    ...state.todoElement,
                    description: action.description
                }
            }
        }
        case ACTION_TYPES.SAVE_TODO_FAIL: {
            return {
                ...state,
                saveErrorText: action.payload.errorText,
                isLoadingTodoWindow: action.payload.isLoadingTodoWindow
            };
        }
        case ACTION_TYPES.SAVE_TODO_PROCESS: {
            return {
                ...state,
                saveErrorText: action.payload.errorText,
                isLoadingTodoWindow: action.payload.isLoadingTodoWindow
            };
        }
        default: return state;
    }
}
