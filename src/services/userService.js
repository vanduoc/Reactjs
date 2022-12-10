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

export { handleLoginApi, getAllUsers, createNewUserService }