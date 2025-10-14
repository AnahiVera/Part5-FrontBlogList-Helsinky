import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// agrega el token a la cabecera de la autorizacion es decir debe estar logueado para crear un blog
const create = async newObject => {
  const auth = { headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, auth)
  return response.data
}



const update = async (id, newObject) => {
  const auth = { headers: { Authorization: token },
}
  const request = await axios.put(`${ baseUrl }/${id}`, newObject, auth)
  return request.then(response => response.data)
}

const deleteBlog = async (id) => {
  const auth= { headers: { Authorization: token },
  }
  const response = await axios.delete(`${ baseUrl }/${id}`, auth)
  return response.data
}




export default { getAll, create, update, deleteBlog, setToken }