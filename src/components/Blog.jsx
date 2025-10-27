import { useState, useEffect } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, setErrorMessage, user, fetchBlogs }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [localMessage, setLocalMessage] = useState(null)
  const userIsCreator = user && blog.user && user.id === blog.user.id

  useEffect(() => {
    setLikes(blog.likes)
  }, [blog.likes])

  const handleLike = async () => {
    const updatedBlogData = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
    }

    try {
      await blogService.update(blog.id, updatedBlogData)
      setLikes(likes + 1)
      await fetchBlogs()

      // Mensaje local en lugar de setSuccessMessage
      setLocalMessage(`You liked ${blog.title}`)
      setTimeout(() => {
        setLocalMessage(null)
      }, 3000)
    } catch {
      setErrorMessage('Error updating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = async () => {
    if (!userIsCreator) return
    try {
      if (window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)) {
        await blogService.deleteBlog(blog.id)
        await fetchBlogs()
      }
    } catch {
      setErrorMessage('Error deleting blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className='blog flex border p-2 border-gray-500 max-w-[550px] flex-col gap-2'>
      <div className='flex justify-between'>
        <div>{blog.title}, {blog.author}</div>
        {userIsCreator && (
          <button onClick={handleDeleteBlog} className='!bg-red-400'>Delete</button>
        )}
      </div>

      <Togglable buttonLabel="View" cancelLabel="Hide">
        <div>{blog.url}</div>
        <div>
          likes {likes} <button onClick={handleLike}>Like</button>
        </div>
        <div>Added by {blog.user && blog.user.name ? blog.user.name : 'Unknown'}</div>

        {/* Mensaje local */}
        {localMessage && (
          <div className='text-green-600 text-sm mt-1 italic'>
            {localMessage}
          </div>
        )}
      </Togglable>
    </div>
  )
}

export default Blog
