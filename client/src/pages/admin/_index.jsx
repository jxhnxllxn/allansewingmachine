import React, { lazy, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Loading from '../../components/loading'
import NavLinks from '../../components/navlinks'
import { getAllOrder, getDashboardAdmin } from '../../redux/order/order-action'

const Dashboard = lazy(() => import('./dashboard'))
const Collection = lazy(() => import('./collection'))
const Product = lazy(() => import('./product'))
const ProductAdd = lazy(() => import('./product-add'))
const Order = lazy(() => import('./order'))

const Admin = ({ match }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDashboardAdmin())
    dispatch(getAllOrder())
    // eslint-disable-next-line
  }, [])

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
    <div className='user'>
      <div className='user__links'>
        <NavLinks links={links} />
      </div>
      <div className='user__main'>
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route
              path={`${match.path}/dashboard`}
              component={Dashboard}
              exact
            />
            {/* <Route path={`${match.path}/product`} component={Product} exact /> */}
            {/* <Route
            path={`${match.path}/product/add`}
            component={ProductAdd}
            exact
          />
          <Route
            path={`${match.path}/collection`}
            component={Collection}
            exact
          />
          <Route path={`${match.path}/order/:id`} component={Order} exact /> */}
          </Suspense>
        </Switch>
      </div>
    </div>
  )
}
export default Admin
