import React from 'react'
import {selectIsAuth} from '../redux/auth/auth-selector'
import OrderDetail from './order-detail';
import BillingShipping from './billing-shipping'
import { useSelector } from 'react-redux';

const Checkout = () => {
    const isAuthenticated = useSelector(state => selectIsAuth(state));
            
    return (
          <div className="checkout_wrapper">
          <BillingShipping />
          {
            isAuthenticated ? 
              <OrderDetail />
            :null
          }
        </div>
    )
}

export default Checkout
