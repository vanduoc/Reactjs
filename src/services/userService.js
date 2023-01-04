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
    return await axios.get(`/allcode?type=${inputData}`);
}

const getTopDoctorHome = async (limit) => {
    return await axios.get(`/api/top-doctor-home?limit=${limit}`);
}

export { handleLoginApi, getAllUsers, createNewUserService, editUserService, deleteUserService, getAllCodeService, getTopDoctorHome }