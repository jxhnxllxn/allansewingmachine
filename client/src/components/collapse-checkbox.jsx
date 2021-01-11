import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

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
      history.push(`/product/${slug}`)
    }
  }

  // useEffect(() => {
  //   if (initialState) {
  //     handleFilters(checked)
  //   }
  // }, [checked])

  const toggleCheck = (x) => {
    const currentIndex = checked.indexOf(x)
    const newChecked = [...checked]
    if (currentIndex === -1) {
      newChecked.push(x)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setchecked(newChecked)

    handleFilters(newChecked)
  }

  return (
    <div className='collapse-checkbox'>
      <div className='list'>
        <div
          className={`list__items ${initialState ? 'active' : ''}`}
          onClick={() => handleOpened()}
        >
          <h4 className='list__title'>{title}</h4>
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
