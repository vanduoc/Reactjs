import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
            else
                dispatch(fetchGenderFailed());
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fetch gender failed', error);
        }
    }
}

export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})