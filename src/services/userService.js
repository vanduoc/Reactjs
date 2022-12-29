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

const EditUserService = async(data) => {
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

export { handleLoginApi, getAllUsers, createNewUserService, EditUserService, deleteUserService, getAllCodeService }