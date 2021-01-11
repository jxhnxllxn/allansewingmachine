import React, { lazy, Suspense, useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { getProductsToHome } from './redux/product/product-action'
import { getCollections } from './redux/collection/collection-action'
import { getUserDetails } from './redux/user/user-action'
import useResponsiveVH from './utils/hooks/useResponsiveVH'

import Auth from './utils/hoc/auth'
import Layout from './layout/_layout'
import ErrorBoundary from './utils/hoc/errorBoundary'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Checkout from './pages/checkout'
import ProductPreview from './pages/product-preview'
import Shop from './pages/shop'
import Logout from './pages/logout'
import Loading from './components/loading'

const AdminIndex = lazy(() => import('./pages/admin/_index'))
const UserIndex = lazy(() => import('./pages/user/_index'))

const App = () => {
  useResponsiveVH()
  const { pathname } = useLocation()
  const isAuthenticated = useSelector(({ user }) => user.isAuthenticated)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsToHome())
    dispatch(getCollections())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    document.body.scrollTo(0, 0)
  }, [pathname])

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
          <Route path='/' component={Home} exact />
          <Route path='/product/:collection?' component={Shop} exact />
          <Route path='/product/c/:product' component={ProductPreview} exact />
          <Route path='/login' component={Auth(Login, false)} exact />
          <Route path='/register' component={Auth(Register, false)} exact />
          <Route path='/checkout' component={Auth(Checkout, true)} exact />
          <Route path='/Logout' component={Auth(Logout, true)} />
          <Suspense fallback={<Loading />}>
            <Route path='/user' component={Auth(UserIndex, true)} />
            <Route path='/admin' component={Auth(AdminIndex, true, true)} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </Layout>
  )
}

export default App
