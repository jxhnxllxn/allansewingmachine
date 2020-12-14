import React from 'react'
import { Link } from 'react-router-dom'

const MyButton = (props) => {
  const buttons = () => {
    let template = ''
    switch (props.type) {
      case 'default':
        template = (
          <Link
            className='btn btn--link'
            style={{ ...props.addStyle }}
            to={props.linkTo}
          >
            {props.title}
          </Link>
        )
        break
      case 'primary':
        template = (
          <button
            className='btn btn--button'
            style={{ ...props.addStyle }}
            onClick={() => {
              props.runAction()
            }}
          >
            {props.title}
          </button>
        )
        break
      case 'submit':
        template = (
          <input
            disabled={props.disabled}
            className='btn btn--submit'
            type='submit'
            value={props.title}
          />
        )
        break

      default:
        template = ''
    }

    return template
  }

  return <div className='my_link'>{buttons()}</div>
}

export default MyButton
