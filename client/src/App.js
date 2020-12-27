import React, { lazy, Suspense, useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { getProductsToHome } from './redux/product/product-action'
import useResponsiveVH from './utils/hooks/useResponsiveVH'

import Auth from './utils/hoc/auth'
import Home from './pages/home'
import Layout from './layout/_layout'
import ErrorBoundary from './utils/hoc/errorBoundary'
import { getCollections } from './redux/collection/collection-action'
import { getUserDetails } from './redux/user/user-action'
import LoadingScreen from './components/loadingScreen'

const Shop = lazy(() => import('./pages/shop'))
const ProductPreview = lazy(() => import('./pages/product-preview'))
const Checkout = lazy(() => import('./pages/checkout'))
const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
const AdminIndex = lazy(() => import('./pages/admin/_index'))
const UserIndex = lazy(() => import('./pages/user/_index'))
const Logout = lazy(() => import('./components/loadingScreen'))

const App = () => {
  const location = useLocation()
  useResponsiveVH()
  const isAuthenticated = useSelector(({ user }) => user.isAuthenticated)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsToHome())
    dispatch(getCollections())
    gsap.to('body', { css: { visibility: 'visible' } })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0)
    }
  }, [location])

  useEffect(() => {
    if (localStorage.getItem('access_token') && !isAuthenticated) {
      dispatch(getUserDetails())
    }
    // eslint-disable-next-line
  }, [localStorage.getItem('access_token')])

  return (
    <Layout>
      <Switch>
        <ErrorBoundary>
          <Route exact path='/' component={Home} />
          <Suspense fallback={<LoadingScreen />}>
            <Route path='/shop/:collection?' component={Shop} exact />
            <Route path='/shop/c/:product' component={ProductPreview} exact />

            <Route path='/login' component={Auth(Login, false)} exact />

            <Route path='/register' component={Auth(Register, false)} exact />

            <Route path='/checkout' component={Auth(Checkout, true)} exact />

            <Route path='/user' component={Auth(UserIndex, true)} />

            <Route path='/admin' component={Auth(AdminIndex, true, true)} />

            <Route path='/Logout' component={Auth(Logout, true)} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </Layout>
  )
}

export default App
