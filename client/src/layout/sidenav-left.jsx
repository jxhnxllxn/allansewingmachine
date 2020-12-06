import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { logout } from '../redux/user/user-action'
import { useDispatch } from 'react-redux'

const SidenavLeft = ({ sideNavLink }) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className='sidenavLeft'>
      <ul className='sidenavLeft__list'>
        {sideNavLink.map((i) => (
          <li key={i.name}>
            <NavLink exact to={i.linkTo}>
              {i.name}
            </NavLink>
          </li>
        ))}

        <button onClick={() => handleLogout()} className='btn btn--primary'>
          Logout
        </button>
      </ul>
    </div>
  )
}

export default SidenavLeft
