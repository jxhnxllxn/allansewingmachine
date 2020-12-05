import React, { lazy, Suspense, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { gsap } from 'gsap'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from './redux/user/user-action'
import landingAnimation from './utils/animations/landingAnimation'
import useResponsiveVH from './utils/hooks/useResponsiveVH'

import Auth from './components/hoc/auth'
import Home from './pages/home'
import Layout from './layout/layout'
import Loading from './components/loading'
import ErrorBoundary from './utils/helper/errorBoundary'
const Shop = lazy(() => import('./pages/shop'))
const ProductPreview = lazy(() => import('./pages/product-preview'))
const Cart = lazy(() => import('./pages/cart'))
const Checkout = lazy(() => import('./pages/checkout'))
const Admin = lazy(() => import('./pages/admin/admin'))
const UserDashboard = lazy(() => import('./pages/dashboard'))
const UpdateProfile = lazy(() => import('./pages/update_profile'))

const SideNav = lazy(() => import('./layout/sidenav'))

const App = () => {
  useResponsiveVH()
  const dispatch = useDispatch()

  const user = useSelector(({ userLogin }) => userLogin)

  useEffect(() => {
    //prevent flashing
    gsap.to('body', { css: { visibility: 'visible' } })

    window.onbeforeunload = () => window.scrollTo(0, 0)

    landingAnimation()

    if (localStorage.getItem('userInfo') && user.isAuthenticated) {
      dispatch(getUserDetails())
    }
  }, [localStorage.token])

  return (
    <Layout>
      <Switch>
        <ErrorBoundary>
          <Route exact path='/' component={Auth(Home, null)} />
          <Suspense fallback={<Loading />}>
            <Route
              path='/shop/:collection?'
              component={Auth(Shop, null)}
              exact
            />
            <Route
              path='/shop/:collection/:product'
              component={Auth(ProductPreview, null)}
              exact
            />

            <Route path='/user/cart' component={Auth(Cart, null)} exact />
            <Route
              path='/user/checkout'
              component={Auth(Checkout, null)}
              exact
            />

            <Route
              path='/user/dashboard'
              component={Auth(UserDashboard, true)}
              exact
            />
            <Route
              path='/user/user_profile'
              exact
              component={Auth(UpdateProfile, true)}
            />

            <Route path='/admin' component={Auth(Admin, true, true)} />

            <Route path='/sidenav' component={SideNav} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </Layout>
  )
}

export default App
