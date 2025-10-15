
import Togglable from './Togglable'


const Blog = ({ blog }) => (
  <div className='flex border p-2 border-gray-500 max-w-[550px]'>
    {blog.title}
    <div className='ml-auto'>
    <Togglable buttonLabel="View" cancelLabel="Hide">
     {blog.author} {blog.url} likes {blog.likes}  <button>Like</button>
    </Togglable>
    </div>
  </div>  
)

export default Blog