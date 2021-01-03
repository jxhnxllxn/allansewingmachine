import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavLinks from '../../components/navlinks'

import Dashboard from './dashboard'
import Profile from './profile'
import ProfileUpdate from './profile-update'
import History from './history'

const User = ({ match }) => {
  const routes = [
    { path: `${match.path}/dashboard`, component: Dashboard, exact: true },
    { path: `${match.path}/profile`, component: Profile, exact: true },
    {
      path: `${match.path}/profile/update`,
      component: ProfileUpdate,
      exact: true,
    },
    { path: `${match.path}/history`, component: History, exact: true },
  ]

  const links = [
    {
      name: 'Dashboard',
      linkTo: '/user/dashboard',
      exact: true,
    },
    {
      name: 'User information',
      linkTo: '/user/profile',
      exact: false,
    },
    {
      name: 'History purchased',
      linkTo: '/user/history',
      exact: true,
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
export default User
