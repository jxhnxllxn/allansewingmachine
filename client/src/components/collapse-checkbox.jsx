import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { ReactComponent as UpIcon } from '../assets/icons/chevron-up.svg'

const CollapseCheckbox = ({
  initialState,
  list,
  title,
  handleFilters,
  handleOpened,
}) => {
  const [state, setstate] = useState({
    opened: false,
    checked: [],
  })

  useEffect(() => {
    if (initialState) {
      setstate({
        ...state,
        opened: initialState,
      })
    }
  }, [])

  useEffect(() => {
    if (initialState && state.checked.length > 0) {
      handleFilters(state.checked)
    }
  }, [state.checked])

  const toggleCheck = (x) => {
    const currentIndex = state.checked.indexOf(x)
    const newChecked = [...state.checked]

    if (currentIndex === -1) {
      newChecked.push(x)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setstate({
      ...state,
      checked: newChecked,
    })
  }

  return (
    <div className='collapse-checkbox'>
      <div className='list'>
        <div className='list__items' onClick={() => handleOpened()}>
          <span className='list__title'>{title}</span>
          <UpIcon className={`icon ${initialState ? 'icon--active' : ''}`} />
        </div>
        <div className={`list__collapse ${initialState ? 'active' : ''}`}>
          <ul>
            {list.map((i) => (
              <li key={i._id}>
                <label htmlFor={i.name}>{i.name}</label>
                <input
                  onChange={() => toggleCheck(i._id)}
                  type='checkbox'
                  checked={state.checked.indexOf(i._id) !== -1}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CollapseCheckbox
