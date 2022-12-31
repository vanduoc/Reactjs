import actionTypes from '../actions/actionTypes';


const initialState = {
    genders: [],
    roles: [],
    positions: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: 
            return {
                ...state,
                isLoadingGender: true
            }
        case actionTypes.FETCH_GENDER_SUCCESS: 
            return {
                ...state,
                genders: action.data,
                isLoadingGender: false,
            }
        case actionTypes.FETCH_GENDER_FAILED: 
            return {
                ...state,
                genders: [],
                isLoadingGender: false
                }
        case actionTypes.FETCH_POSITION_START: 
            return {
                ...state,
                isLoadingPosition: true
            }
        case actionTypes.FETCH_POSITION_SUCCESS: 
            return {
                ...state,
                positions: action.data,
                isLoadingPosition: false,
            }
        case actionTypes.FETCH_POSITION_FAILED: 
            return {
                ...state,
                positions: [],
                isLoadingPosition: false
            }
        case actionTypes.FETCH_ROLE_START: 
            return {
                ...state,
                isLoadingRole: true
            }
        case actionTypes.FETCH_ROLE_SUCCESS: 
            return {
                ...state,
                roles: action.data,
                isLoadingRole: false,
            }
        case actionTypes.FETCH_ROLE_FAILED: 
            return {
                ...state,
                roles: [],
                isLoadingRole: false
            }

        case actionTypes.CREATE_USER_SUCCESS:
            console.log('create new user success');
            return state;
        case actionTypes.CREATE_USER_FAILED:
            console.log('Create user failed: ', action.message);
            return state;
        default:
            return state;
    }
}
export default adminReducer;