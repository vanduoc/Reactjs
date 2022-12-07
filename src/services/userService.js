import axios from "../axios"

const handleLoginApi = async (email, password) => {
    return await axios.post('/api/login', {email, password});
}

export { handleLoginApi }