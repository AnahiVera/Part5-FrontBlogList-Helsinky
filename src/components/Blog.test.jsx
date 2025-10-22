import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { cleanup } from '@testing-library/react'


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







