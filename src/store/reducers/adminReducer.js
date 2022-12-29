import actionTypes from '../actions/actionTypes';


const initialState = {
    genders: [],
    roles: [],
    positions: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_SUCCESS: 
        console.log('FETCH gender success');
            return {
                ...state,
                genders: action.data
            }
        case actionTypes.FETCH_GENDER_FAILED: 
        console.log('FETCH gender failed');
            return {
                ...state,
                }
        default:
            return state;
    }
}
export default adminReducer;