import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavLinks from '../../components/navlinks'
import Dashboard from './dashboard'

const Admin = ({ match }) => {
  const routes = [
    { path: `${match.path}/dashboard`, component: Dashboard, exact: true },
  ]
  const links = [
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
  return (
    <div className='user page'>
      <div className='user__links'>
        <NavLinks links={links} />
      </div>
      <div className='user__main'>
        <Switch>
          {routes.map(({ path, component, exact = true }) => (
            <Route exact={exact} path={path} component={component} key={path} />
          ))}
        </Switch>
      </div>
    </div>
  )
}
export default Admin
