import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'
import { cleanup } from '@testing-library/react'

vi.mock('../services/blogs')

afterEach(() => {
  cleanup()
})
//test verifies that the component renders the contents correctly.
test('renders title and author but not URL or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 5,
    user: {
      name: 'Pruebas Tester'
    }
  }

  render(<Blog blog={blog} />)


   // Title and author should be visible
   expect(screen.getByText('Component testing is done with react-testing-library, John Doe')).toBeVisible()


   // URL and likes should NOT be visible by default
 const hiddenDetails = screen.getByText((content) =>
    content.includes('https://example.com')
  ).closest('div')

  //  Verify it's hidden
  expect(hiddenDetails).toHaveStyle('display: none')
})


test('shows URL and likes when the view button is clicked', async () => {
  const blog = {
    title: 'Testing visibility',
    author: 'Jane Doe',
    url: 'https://janedoe.com',
    likes: 7,
    user: { name: 'Tester' }
  }

 render(<Blog blog={blog} />)

  const user = userEvent.setup()

  // confirmar que inicialmente no está visible (opcional, buena comprobación)
  const initiallyHidden = screen.queryByText((content) => content.includes('https://janedoe.com'))
  expect(initiallyHidden.closest('div')).toHaveStyle('display: none')

  // hacer click en "View"
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  // Buscar el nodo que contiene la URL (matcher flexible)
  const urlNode = screen.getByText((content) => content.includes('https://janedoe.com'))
  // subir al contenedor que mostrará/ocultará (si necesitas)
  const detailsContainer = urlNode.closest('div')

  // comprobar visibilidad
  expect(detailsContainer).toBeVisible()
  // y que en su texto contenga likes 7
  expect(detailsContainer).toHaveTextContent(/likes\s*7/)
})



test('calls the like button twice', async () => {
  const blog = {
    title: 'Test blog',
    author: 'Jane Doe',
    url: 'https://janedoe.com',
    likes: 5,
    user: { id: 1, name: 'Tester' },
    id: '123'
  }

  const fetchBlogsMock = vi.fn()
  const setErrorMessageMock = vi.fn()

  blogService.update.mockResolvedValue({ ...blog, likes: blog.likes + 1 })

  render(
    <Blog
      blog={blog}
      user={{ id: 1 }}
      fetchBlogs={fetchBlogsMock}
      setErrorMessage={setErrorMessageMock}
    />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText((content) => content.includes('View'))
  await user.click(viewButton)

  const likeButton = screen.getByText((content) => content.includes('Like'))

  await user.click(likeButton)
  await user.click(likeButton)

  expect(blogService.update).toHaveBeenCalledTimes(2)
})



