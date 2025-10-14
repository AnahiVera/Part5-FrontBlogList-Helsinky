import loginService from '../services/login'

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


console.log ('data verication', username, password, errorMessage)

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
      <div>{user.name} logged in</div>
    )}
  </div>
)

}


export default LoginForm
