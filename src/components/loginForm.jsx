import {useEffect } from 'react'


import loginService from '../services/login'
import blogService from '../services/blogs'

// hooks
import {useState } from 'react'


const LoginForm = ({ setUser, user }) => {
    
  const [errorMessage, setErrorMessage] = useState(null)  
 const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password, 
      })

      //guardar el usuario usando local storage del navegador (user es un objeto)
       window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      ) 


      blogService.setToken(user.token) // le damos el token del objeto user, para que lo pase a las peticiones del blogService
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
}

const handleLogout = async() => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
    blogService.setToken(null) 
} 

// revisa si el usuario esta en el local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token) // le damos el token del objeto user, para que lo pase a las peticiones del blogService
    }
  }, [])



 return ( 
  <div>
    {user === null ? (
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    ) : (
        <div>
      <div>{user.name} logged in</div>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      </div>
    )}
  </div>
)

}


export default LoginForm
