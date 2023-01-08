import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import { getAllCodeService, createNewUserService, 
    getAllUsers, deleteUserService, editUserService, 
    getTopDoctorHome, getAllDoctors, saveInforDoctor, getDetailDoctor,

    } from '../../services/userService';

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

export const fetchAllDoctors = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data));
            } else {
                dispatch(fetchAllDoctorsFailed());
            }
        } catch (error) {
            dispatch(fetchAllDoctorsFailed());
        }

    }
}

const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    data
})

const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
})

export const saveDetailDoctor = (data) => {
    return async(dispatch, getState) => {
        let res = await saveInforDoctor(data);
        if (res && res.errCode === 0) {
            toast.success("Save infor doctor SUCCEESSED!")
            dispatch(saveDetailDoctorSuccess());
        } else{
            toast.error("Save infor doctor FAILED!")
            dispatch(saveDetailDoctorFailed());
        }
    }
}

const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_INFOR_DOCTOR_SUCCESS
})

const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_INFOR_DOCTOR_FAILED
})

export const fetchInforDoctorById = (id) => {
    return async(dispatch, getState) => {
        try {
            let res = await getDetailDoctor(id);
            if (res && res.errCode === 0) {
                dispatch(fetchInforDoctorSuccess(res.data));
            } else
                dispatch(fetchInforDoctorFailed());
        } catch (error) {
            console.log(error);
            dispatch(fetchInforDoctorFailed());
        }
    }
}

const fetchInforDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_INFOR_DOCTOR_SUCCESS,
    data
})

const fetchInforDoctorFailed = () => ({
    type: actionTypes.FETCH_INFOR_DOCTOR_FAILED
})

export const fetchAllScheduleTime = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
        if (res && res.errCode === 0) {
            dispatch(fetchAllScheduleTimeSuccess(res.data));
        }
        else dispatch(fetchAllScheduleTimeFailed());
        } catch (error) {
            console.log(error);
            dispatch(fetchAllScheduleTimeFailed());
        }
    }
}

const fetchAllScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    data
})

const fetchAllScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
})