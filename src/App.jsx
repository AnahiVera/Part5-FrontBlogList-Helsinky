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
import Footer from './components/Footer';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [sortAsc, setSortAsc] = useState(false) // Nuevo estado para el orden


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
        <h2>Blogs</h2>
         <button
          onClick={() => setSortAsc(!sortAsc)}
          className="mb-2 border px-2 py-1 rounded"
        >
          Ordenar por likes: {sortAsc ? 'Ascendente' : 'Descendente'}
        </button>
        {blogs
          .slice()
          .sort((a, b) => sortAsc ? a.likes - b.likes : b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} setErrorMessage={setErrorMessage} user={user} fetchBlogs={fetchBlogs} />
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


       <Footer />

    </div>
  )
}

export default App