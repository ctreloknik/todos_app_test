import * as types from "./types";
import ApiHelper from "../../../ApiHelper";

export const getAllUsers = () => {
    return (dispatch) => {
        dispatch(getAllUsersLoadingProcess(true));

        ApiHelper.getAllUsers().then(res => {
            dispatch(getAllUsersSuccess({ elementsList: res.data, isLoading: false }));
        }).catch(err => {
            dispatch(getAllUsersFail());
        });
    };
};

export const getAllUsersLoadingProcess = (isLoading) => {
    return {
        type: types.GET_USERS_LIST_PROCESS,
        payload: {
            isLoading: isLoading
        }
    };
};

export const getAllUsersSuccess = (data) => {
    return {
        type: types.GET_USERS_LIST_SUCCESS,
        payload: { ...data }
    };
};

export const getAllUsersFail = (data) => {
    return {
        type: types.GET_USERS_LIST_FAIL,
        isLoadingUsersFailed: true,
        isLoading: false,
        errorText: 'Error loading data. Please try again.'
    };
};