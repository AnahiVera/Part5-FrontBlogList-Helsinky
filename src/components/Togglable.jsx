import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

//forwardRef is used to pass ref from parent to child component




const Togglable = forwardRef((props, ref) => {

  Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired
}
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

// El componente usa el hook useImperativeHandle para que su función toggleVisibility esté disponible fuera del componente.
   useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        
        {props.children}

        <button onClick={toggleVisibility}>{props.cancelLabel}</button>
      </div>
    </div>
  )
})



export default Togglable

