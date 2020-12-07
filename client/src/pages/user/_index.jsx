import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Loading from '../../components/loading'
import SideNavLeft from '../../layout/sidenav-left'

const Dashboard = lazy(() => import('./dashboard'))
const ProfileUpdate = lazy(() => import('./profile-update'))

const User = ({ match }) => {
  const sideNavLink = [
    {
      name: 'Dashboard',
      linkTo: '/user/dashboard',
    },
    {
      name: 'User information',
      linkTo: '/user/user_profile',
    },
    {
      name: 'My Cart',
      linkTo: '/user/cart',
    },
  ]

  return (
    <div className='user'>
      <SideNavLeft sideNavLink={sideNavLink} />
      <Switch>
        <Suspense fallback={<Loading />}>
          <Route path={`${match.path}/dashboard`} component={Dashboard} exact />
          <Route
            path={`${match.path}/profile-update`}
            component={ProfileUpdate}
            exact
          />
        </Suspense>
      </Switch>
    </div>
  )
}
export default User
