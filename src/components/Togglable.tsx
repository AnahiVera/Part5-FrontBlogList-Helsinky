import { useState, forwardRef, useImperativeHandle } from 'react'


//forwardRef is used to pass ref from parent to child component


const Togglable = forwardRef((props:any, refs:any) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

// El componente usa el hook useImperativeHandle para que su función toggleVisibility esté disponible fuera del componente.
   useImperativeHandle(refs, () => {
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

        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable