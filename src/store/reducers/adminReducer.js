import actionTypes from '../actions/actionTypes';


const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    doctors: [],
    topDoctorHome: [],
    allScheduleTime: [],
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    specialties: [],
    currentDoctor: {},
    allRequiredDoctorInfor: {}
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
        case actionTypes.FETCH_ALL_USER_START: 
            return {
                ...state,
                isLoadingGetAllUser: true
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS: 
            return {
                ...state,
                users: action.data,
                isLoadingGetAllUser: false
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            return {
                ...state,
                isLoadingGetAllUser: false
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            return {
                ...state,
                topDoctorHome: action.data
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            return {
                ...state,
                topDoctorHome: []
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            return {
                ...state,
                doctors: action.data
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            return {
                ...state,
                doctors: []
            }
        case actionTypes.FETCH_INFOR_DOCTOR_SUCCESS:
            return {
                ...state,
                currentDoctor: action.data
            }
        case actionTypes.FETCH_INFOR_DOCTOR_FAILED:
            return {
                ...state,
                currentDoctor: []
            }
        case actionTypes.SAVE_INFOR_DOCTOR_SUCCESS:
            return {
                ...state,
                isSavedDoctorInforSuccess: true,
            }
        case actionTypes.SAVE_INFOR_DOCTOR_FAILED:
            return {
                ...state,
                isSavedDoctorInforSuccess: false
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
        return {
            ...state,
            allScheduleTime: action.data
        }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            return {
                ...state,
                allScheduleTime: []
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            return {
                ...state,
                allRequiredDoctorInfor: action.data
            }
            
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            return {
                ...state,
                allRequiredDoctorInfor: {}
            }
        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS: 
            return {
                ...state,
                specialties: action.data,
            }
        case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
            return {
                ...state
            }

        default:
        return state;
    }
}
export default adminReducer;