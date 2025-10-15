import { useState, useEffect, useRef } from 'react'

//Css
import './App.css'

//services
import blogService from './services/blogs'

//components
import LoginForm from './components/loginForm';
import Blog from './components/Blog';
import CreateBlogForm from './components/createBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()


    // Función para obtener todos los blogs
  const fetchBlogs = () => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }

  useEffect(() => {
    fetchBlogs()
  }, [])


  return (
    <div className='p-4'>
      <div>
        <Togglable buttonLabel="Login" cancelLabel='Cancel'>
          <LoginForm setUser={setUser} user={user} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} />
        </Togglable>
      </div>

      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>


      <div>
        <Togglable buttonLabel="New Blog" cancelLabel='Cancel' ref={blogFormRef}>
          <CreateBlogForm 
          user={user} 
          fetchBlogs={fetchBlogs}
          setErrorMessage={setErrorMessage} 
          setSuccessMessage={setSuccessMessage}
          blogFormRef={blogFormRef} />
        </Togglable>
      </div>


      {/* Notification components */}
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />

    </div>
  )
}

export default App