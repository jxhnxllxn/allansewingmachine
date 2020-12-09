import React from 'react'
import OrderDetail from './order-detail'
import BillingShipping from './billing-shipping'
import { selectCartItemsCount } from '../redux/cart/cart-selectors'
import { useSelector } from 'react-redux'

const Checkout = ({ isAuthenticated }) => {
  const cartCount = useSelector((state) => selectCartItemsCount(state))

  return (
    <div className='checkout_wrapper'>
      <BillingShipping isAuthenticated={isAuthenticated} />
      {isAuthenticated && cartCount >= 0 ? <OrderDetail /> : null}
    </div>
  )
}

export default Checkout
