import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/user/user-action'

const SideNavSetting = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  const links = [
    {
      name: 'Dashboard',
      linkTo: '/user/dashboard',
    },
    {
      name: 'Update user info',
      linkTo: '/user/profile-update',
    },
    {
      name: 'Legal & Policies',
      linkTo: '/legal&polices',
    },
    {
      name: 'Help',
      linkTo: '/help',
    },
  ]
  return (
    <div className='sidenav_setting'>
      <ul className='sidenav_setting__link'>
        {links.map((i, key) => (
          <li key={key}>
            <Link to={i.linkTo}>{i.name}</Link>
          </li>
        ))}
        <li>
          <Link onClick={() => handleLogout()} to='/'>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SideNavSetting
