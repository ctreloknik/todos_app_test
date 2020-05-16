import { ACTION_TYPES } from '../ActionTypesConst';

export const initialInitState = {
    elementsList: [],
    isLoading: false
};

export default function todosReducer(state = initialInitState, action) {
    switch (action.type) {
        case ACTION_TYPES.GET_ALL_TODOS_SUCCESS: {
            return {
                elementsList: action.payload.elementsList,
                isLoading: action.payload.isLoading
            };
        }
        case ACTION_TYPES.GET_ALL_TODOS_PROCESS: {
            return {
                isLoading: action.payload.isLoading
            };
        }
        default: return state;
    }
}
