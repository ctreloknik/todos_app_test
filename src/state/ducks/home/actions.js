import * as types from "./types";
import ApiHelper from "ApiHelper";

export const getUserInfo = () => {
    return (dispatch) => {
        dispatch(getUserInfoLoadingProcess(true));

        ApiHelper.getInfoAboutMe().then(res => {
            dispatch(getUserInfoSuccess({ ...res.data, isLoading: false }));
        }).catch(err => {
            dispatch(getUserInfoFail());
        });
    }
};

export const getUserInfoLoadingProcess = (isLoading) => {
    return {
        type: types.GET_ABOUT_ME_PROCESS,
        payload: {
            isLoading: isLoading
        }
    };
};

export const getUserInfoSuccess = (data) => {
    return {
        type: types.GET_ABOUT_ME_SUCCESS,
        payload: { ...data }
    };
};

export const getUserInfoFail = () => {
    return {
        type: types.GET_ABOUT_ME_FAIL,
        payload: {
            errorText: 'Error loading data. Please try again.',
            isLoading: false
        }
    };
};