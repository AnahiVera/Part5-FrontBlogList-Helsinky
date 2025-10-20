import { useState, useEffect } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, setErrorMessage, user, fetchBlogs }) => {
  const [likes, setLikes] = useState(blog.likes)

  // Sincronizar likes cuando cambie el blog
  useEffect(() => {
    setLikes(blog.likes)
  }, [blog.likes])



  const handleLike = async () => {

    const updatedBlogData = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
    /*   user: user ? user.id : blog.user?.id  en caso de querer especificar quien le dio like*/
    }

    try {
      await blogService.update(blog.id, updatedBlogData)
      // Importante: también actualizamos el estado local para ver cambio inmediato
      setLikes(likes + 1)

      await fetchBlogs()
    } catch (exception) {
      setErrorMessage('Error updating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className='flex border p-2 border-gray-500 max-w-[550px]'>
      {blog.title}
      <div className='ml-auto'>
        <Togglable buttonLabel="View" cancelLabel="Hide">
          {blog.author} {blog.url} likes {likes}
          <button onClick={handleLike}>Like</button>
          <div>Added by {blog.user && blog.user.name ? blog.user.name : 'Unknown'}</div>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog
