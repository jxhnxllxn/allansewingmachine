import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { gsap } from 'gsap'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { getProductsToHome } from './redux/product/product-action'
import useResponsiveVH from './utils/hooks/useResponsiveVH'

import Auth from './utils/hoc/auth'
import Home from './pages/home'
import Layout from './layout/_layout'
import Loading from './components/loading'
import ErrorBoundary from './utils/hoc/errorBoundary'
import { getCollections } from './redux/collection/collection-action'
import { getUserDetails } from './redux/user/user-action'
const Shop = lazy(() => import('./pages/shop'))
const ProductPreview = lazy(() => import('./pages/product-preview'))
const Cart = lazy(() => import('./pages/cart'))
const Checkout = lazy(() => import('./pages/checkout'))

const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))

const AdminIndex = lazy(() => import('./pages/admin/_index'))
const UserIndex = lazy(() => import('./pages/user/_index'))
const Logout = lazy(() => import('./components/loadingScreen'))

const App = () => {
  useResponsiveVH()
  const token = useSelector(({ user }) => user.token)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsToHome())
    dispatch(getCollections())
    //prevent flashing
    gsap.to('body', { css: { visibility: 'visible' } })
    window.onbeforeunload = () => window.scrollTo(0, 0)

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (token) {
      dispatch(getUserDetails())
    }
    // eslint-disable-next-line
  }, [])

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
