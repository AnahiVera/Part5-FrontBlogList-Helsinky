import axios from 'axios'
const baseUrl = '/api/login'

// conectar con el backend a traves de axion al modulo login 
const login = async credentials =>{
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }