import { useState, useEffect } from 'react'

import blogService from '../services/blogs'




const CreateBlogForm = ({user, setErrorMessage}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')


    // para crear un blog necesito la funcion del back para crear un blog, enviar el token

    const handleNewBlog = async (event) => {
        event.preventDefault()
        try {
            blogService.setToken(user.token)

            newBlog = await blogService.create({
                title, author, url,
            })

            //limpiar los campos despues del exito
            setTitle('')
            setAuthor('')
            setUrl('')


            // mostrar mensaje de exito 

        } catch (exception) {
            setErrorMessage('Error creating blog')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }


    // revisa si el usuario esta en el local storage
      useEffect(() => {

      }
    , [user])

    return (
        <div>
            {user !== null ? (
                <div>
                 <h5>Create New Blog</h5>
            <form onSubmit={handleNewBlog}>

                <div>
                    <label htmlFor="title"> Title</label>
                    <input id="title" type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <input id="author" type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    <label htmlFor="url"> Url</label>
                    <input id="url" type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
                </div>
                
                 <button type="submit">Add +</button>
            </form>
            </div>
        
            ) : (<div>Please log in to create a blog</div>   ) }
           
</div>
    )
}

export default CreateBlogForm