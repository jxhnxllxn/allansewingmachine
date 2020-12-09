import React from 'react'
import { useDispatch } from 'react-redux'
import NavLinks from '../layout/navlinks'

const SideNavSetting = () => {
  const links = [
    {
      name: 'Dashboard',
      linkTo: '/user/dashboard',
      exact: true,
    },
    {
      name: 'User information',
      linkTo: '/user/profile',
      exact: true,
    },
    {
      name: 'History purchased',
      linkTo: '/user/history',
      exact: true,
    },
    {
      name: 'Legal & Policies',
      linkTo: '/legal&polices',
      exact: true,
    },
    {
      name: 'Help',
      linkTo: '/help',
      exact: true,
    },
    {
      name: 'Logout',
      linkTo: '/logout',
      exact: true,
    },
  ]
  return (
    <div className='sidenav_setting'>
      <NavLinks
        links={links}
        addStyle={{
          textAlign: 'center',
          padding: '2rem 0',
        }}
      />
    </div>
  )
}

export default SideNavSetting
