import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';

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