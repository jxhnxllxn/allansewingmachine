import React from 'react'
import { useSelector } from 'react-redux'
import NavLinks from './navlinks'

const SideNavSetting = () => {
  const isAdmin = useSelector(({ user }) => user.isAdmin)
  const linksUser = [
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

  const linksAdmin = [
    {
      name: 'Dashboard',
      linkTo: '/admin/dashboard',
      exact: true,
    },
    {
      name: 'Users',
      linkTo: '/admin/users',
      exact: false,
    },

    {
      name: 'Product',
      linkTo: '/admin/product',
      exact: false,
    },
    {
      name: 'Collection',
      linkTo: '/admin/collection',
      exact: false,
    },
    {
      name: 'Category',
      linkTo: '/admin/category',
      exact: false,
    },
    {
      name: 'User Interface',
      linkTo: '/admin/ui',
      exact: false,
    },
    {
      name: 'Help',
      linkTo: '/admin/help',
      exact: false,
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
          links={isAdmin ? linksAdmin : linksUser}
          addStyle={{ margin: 0 }}
        />
      </div>
    </div>
  )
}

export default SideNavSetting
