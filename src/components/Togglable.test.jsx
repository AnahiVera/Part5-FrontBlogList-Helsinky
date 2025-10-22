import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'



describe('<Togglable />', () => {
  beforeEach(() => {
    render(
      <Togglable buttonLabel="show..." cancelLabel="Hide">
        <div>togglable content</div>
      </Togglable>
    )
  })

  //tests that it renders its children correctly
  test('renders its children', () => {
    screen.getByText('togglable content')
  })

  //tests that children are hidden by default 
  test('at start the children are not displayed', () => {
    const element = screen.getByText('togglable content')
    expect(element).not.toBeVisible()
  })


  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const element = screen.getByText('togglable content')
    expect(element).toBeVisible()
  })


    test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('Hide')
    await user.click(closeButton)

    const element = screen.getByText('togglable content')
    expect(element).not.toBeVisible()
  })



})