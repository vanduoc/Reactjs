import axios from "../axios"

const handleLoginApi = async (email, password) => {
    return await axios.post('/api/login', {email, password});
}

const getAllUsers = async (inputId) => {
    return await axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = async (data) => {
    return await axios.post('/api/create-new-user', data)
}

const editUserService = async(data) => {
    return await axios.put('/api/edit-user', data);
}

const deleteUserService = async (id) => {
    return await axios.delete('/api/delete-user', {
        data: {
            id
        }
    })
}

const getAllCodeService = async (inputData) => {
    return await axios.get(`/api/allcode?type=${inputData}`);
}

const getTopDoctorHome = async (limit) => {
    return await axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctors = async() => {
    return await axios.get('/api/get-all-doctors');
}

const saveInforDoctor = async(data) => {
    return await axios.post('/api/save-infor-doctor', data);
}

const getDetailDoctor = async (doctorId) => {
    return await axios.get(`/api/get-infor-doctor-by-id?id=${doctorId}`);
}

const saveBulkCreateSchedule = async(data) => {
    return await axios.post('/api/bulk-create-schedule', data)
}

const fetchScheduleDoctorByDate = async(doctorId, date) => {
    return await axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`)
}

const fetchProfileDoctorById = async(doctorId) => {
    return await axios.get(`/api/get-profile-doctor-by-id?id=${doctorId}`)
}

const postPatientBookingAppointment = async(data) => {
    return await axios.post('/api/patient-book-appointment', data)
}

const verifyBookAppoinment = async(data) => {
    return await axios.post(`/api/verify-book-appointment`, data)
}
const createNewSpecialty = async(data) => {
    return await axios.post('/api/create-new-specialty', data)
}

const createNewClinic = async(data) => {
    return await axios.post('/api/create-new-clinic', data)
}
const fetchAllSpecialty = async() => {
    return await axios.get('/api/get-specialty')
}

const fetchAllClinic = async() => {
    return await axios.get('/api/get-clinic')
}

const fetchDoctorExtraInfor = async(id) => {
    return await axios.get(`/api/get-doctor-extra-infor?id=${id}`)
}

const fetchDetailSpecialty = async(id) => {
    return await axios.get(`/api/get-detail-specialty-by-id?id=${id}`);
}

const fetchOldDoctorExtraInfo = async(id) => {
    return await axios.get(`/api/get-old-doctor-extra-info?id=${id}`);
}

const fetchDetailClinic = async(id) => {
    return await axios.get(`/api/get-detail-clinic?id=${id}`);
}

export { handleLoginApi, getAllUsers, createNewUserService, 
        editUserService, deleteUserService, 
        getAllCodeService, getTopDoctorHome, getDetailDoctor, getAllDoctors,
        saveInforDoctor, saveBulkCreateSchedule, fetchScheduleDoctorByDate,
        fetchProfileDoctorById, postPatientBookingAppointment,
        verifyBookAppoinment, createNewSpecialty,
        fetchAllSpecialty, fetchDoctorExtraInfor,
        fetchDetailSpecialty, fetchAllClinic,
        fetchOldDoctorExtraInfo, createNewClinic, 
        fetchDetailClinic
    }