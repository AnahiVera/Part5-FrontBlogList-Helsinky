import { useState, useEffect } from 'react'

//services
import blogService from './services/blogs'

//components
import LoginForm from './components/loginForm';
import Blog from './components/Blog';
import CreateBlogForm from './components/createBlogForm';
import Notification from './components/Notification';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])



  return (
    <div>
      <div>
        <LoginForm setUser={setUser} user={user} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} />
      </div>

      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>


      <div>
        <CreateBlogForm user={user} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} />
      </div>


      {/* Notification components */}
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />

    </div>
  )
}

export default App