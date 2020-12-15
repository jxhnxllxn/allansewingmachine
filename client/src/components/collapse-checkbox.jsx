import React, { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ReactComponent as UpIcon } from '../assets/icons/chevron-up.svg'

const CollapseCheckbox = ({
  initialState,
  list,
  title,
  handleFilters,
  slug,
}) => {
  const history = useHistory()
  const [checked, setchecked] = useState([])

  const handleOpened = () => {
    if (slug && !initialState) {
      history.push(`/shop/${slug}`)
    }
  }

  useEffect(() => {
    if (checked.length > 0) {
      handleFilters(checked)
    }
  }, [checked])

  const toggleCheck = (x) => {
    const currentIndex = checked.indexOf(x)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(x)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setchecked(newChecked)
  }

  return (
    <div className='collapse-checkbox'>
      <div className='list'>
        {console.log(list)}
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
                  checked={checked.indexOf(i._id) !== -1}
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
