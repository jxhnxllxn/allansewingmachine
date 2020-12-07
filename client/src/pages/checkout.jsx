import React from 'react'
import OrderDetail from './order-detail'
import BillingShipping from './billing-shipping'

const Checkout = ({ isAuthenticated }) => {
  return (
    <div className='checkout_wrapper'>
      <BillingShipping isAuthenticated={isAuthenticated} />
      {isAuthenticated ? <OrderDetail /> : null}
    </div>
  )
}

export default Checkout
