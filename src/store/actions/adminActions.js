import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService, getTopDoctorHome } from '../../services/userService';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        dispatch({type: actionTypes.FETCH_GENDER_START});
        try {
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else
                dispatch(fetchGenderFailed());
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fetch gender failed', error);
        }
    }
}

const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data
})

const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        dispatch({type: actionTypes.FETCH_POSITION_START});
        try {
            let res = await getAllCodeService('position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else
                dispatch(fetchPositionFailed());
        } catch (error) {
            dispatch(fetchPositionFailed());
        }
    }
}

const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data
});

const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        dispatch({type: actionTypes.FETCH_ROLE_START});
        try {
            let res = await getAllCodeService('role');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }
            else
                dispatch(fetchRoleFailed());
        } catch (error) {
            dispatch(fetchRoleFailed());
        }
    }
}

const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data
});

const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user successfully!");
                dispatch(createUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.error("Create a new user failed!");
                dispatch(createUserFailed(res.message));
            }
        } catch (error) {
            toast.error("Create a new user failed!");
            dispatch(createUserFailed(error));
        }
    }
}

const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

const createUserFailed = (message) => ({
    type: actionTypes.CREATE_USER_FAILED,
    message
})

export const deleteAUser = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(id);
            if (res && res.errCode === 0) {
                toast.success("Delete the user successfully!");
                dispatch(deleteAUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.error("Delete the user failed!");
                dispatch(deleteAUserFailed());
            }
        } catch (error) {
            toast.error("Delete the user failed!");
            dispatch(deleteAUserFailed());
        }
    }
}

const deleteAUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

const deleteAUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const fetchAllUserStart = () =>  {
    return async(dispatch, getState) => {
        dispatch({type: actionTypes.FETCH_ALL_USER_START});
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0 && res.users) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            }
            else dispatch(fetchAllUserFailed());
        } catch (error) {
            dispatch(fetchAllUserFailed());
        }
    }
}

const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data
})

const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Edit the user successfully!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.error("Edit the user failed!");
                dispatch(editUserFailed());
            }
        } catch (error) {
            toast.error("Delete the user failed!");
            dispatch(editUserFailed());
        }
    }
}

const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
});

const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
});

export const fetchTopDoctorHome = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHome('5');
            if (res && res.errCode === 0) {
                dispatch(fetchDoctorHomeSuccess(res.data));
            }
            else {
                dispatch(fetchDoctorHomeFailed());
            }
        } catch (error) {
            dispatch(fetchDoctorHomeFailed());
        }
    }
}

const fetchDoctorHomeSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    data
})

const fetchDoctorHomeFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
})
