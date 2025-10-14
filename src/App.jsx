import { useState, useEffect } from 'react'

//services
import blogService from './services/blogs'

//components
import LoginForm from './components/loginForm';
import Blog from './components/Blog';
import CreateBlogForm from './components/createBlogForm';

const App = () => {
    const [errorMessage, setErrorMessage] = useState(null)  
  const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  
// crear componente de error message
  console.log('user', user)

  return (
    <div>
      <div>
        <LoginForm  setUser={setUser} user = {user} setErrorMessage={setErrorMessage}/>
      </div>

    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>


    <div>
      <CreateBlogForm user={user} setErrorMessage={setErrorMessage}  />
    </div>



    </div>
  )
}

export default App