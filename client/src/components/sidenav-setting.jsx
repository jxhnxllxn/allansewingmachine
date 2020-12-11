import React from 'react'
import NavLinks from './navlinks'

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
  const handleCloseNav = () => {
    document.getElementById('toggleSideNav').click()
  }
  return (
    <div className='sidenav_setting'>
      <h1 className='heading-secondary'>Setting</h1>
      <div onClick={() => handleCloseNav()}>
        <NavLinks
          links={links}
          addStyle={{
            textAlign: 'center',
            padding: '2rem 0',
          }}
        />
      </div>
    </div>
  )
}

export default SideNavSetting
