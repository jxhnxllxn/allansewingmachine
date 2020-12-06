import React, { lazy, Suspense, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { gsap } from 'gsap'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from './redux/user/user-action'
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

const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))

const Admin = lazy(() => import('./pages/admin/admin'))
const User = lazy(() => import('./pages/user/user'))

const SideNav = lazy(() => import('./layout/sidenav'))

const App = () => {
  useResponsiveVH()
  const dispatch = useDispatch()

  const user = useSelector(({ userLogin }) => userLogin)

  useEffect(() => {
    //prevent flashing
    gsap.to('body', { css: { visibility: 'visible' } })

    window.onbeforeunload = () => window.scrollTo(0, 0)

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

            <Route path='/login' component={Auth(Login, false)} exact />

            <Route path='/register' component={Auth(Register, false)} exact />

            <Route path='/cart' component={Auth(Cart, null)} exact />

            <Route path='/checkout' component={Auth(Checkout, null)} exact />

            <Route path='/user' component={Auth(User, true, true)} />

            <Route path='/admin' component={Auth(Admin, true, true)} />

            <Route path='/sidenav' component={SideNav} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </Layout>
  )
}

export default App
