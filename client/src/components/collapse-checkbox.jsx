import React, { useState } from 'react'
import { useEffect } from 'react'
import { ReactComponent as UpIcon } from '../assets/icons/chevron-up.svg'

const CollapseCheckbox = ({ initialState, list, title, handleFilters }) => {
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
    return () => {
      setstate({})
    }
  }, [])

  useEffect(() => {
    handleFilters(state.checked)
  }, [state.checked])

  const handleOpened = () => {
    setstate({ ...state, opened: !state.opened })
  }

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
        <div className='list__items' onClick={handleOpened}>
          <span className='list__title'>{title}</span>
          <UpIcon className={`icon ${state.opened ? 'icon--active' : ''}`} />
        </div>
        <div className={`list__collapse ${state.opened ? 'active' : ''}`}>
          <ul>
            {list.map((i) => (
              <li key={i._id}>
                <input
                  onChange={() => toggleCheck(i._id)}
                  type='checkbox'
                  checked={state.checked.indexOf(i._id) !== -1}
                />
                {i.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CollapseCheckbox
