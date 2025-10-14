import { useState, useEffect } from 'react'

//components
import LoginForm from './components/loginForm'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  

  console.log('user', user)

  return (
    <div>
      <div>
        <LoginForm  setUser={setUser} user = {user}/>
      </div>

    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>

    </div>
  )
}

export default App