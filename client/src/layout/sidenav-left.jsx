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
              <span>{i.name}</span>
            </NavLink>
          </li>
        ))}

        <li>
          <Link onClick={() => handleLogout()} to='/'>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SidenavLeft
