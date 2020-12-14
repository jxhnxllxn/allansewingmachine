import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../components/loading'
import Cart from '../../components/cart'
import { selectCartItems } from '../../redux/cart/cart-selectors'

const UserDashboard = () => {
  const name = useSelector(({ user }) => user.name)
  const cartItems = useSelector((state) => selectCartItems(state))
  const orderState = useSelector(({ order }) => order)
  const { loading, successBuy } = orderState

  return (
    <div className='dashboard_user'>
      <h1 className='heading-secondary'>
        {name.split(' ')[0]}'s <span>dashboard</span>
      </h1>
      {/* {successBuy && ( */}
      <div className='success_bought card'>
        <h1 className='heading-primary'>Thanks</h1>
        <h2>
          <i>so much !</i>
        </h2>
        <p>We appreciate your</p>
        <p>most recent purchased and hope you</p>
        <span>ENJOY YOUR NEW SEWING BUDDY.</span>
      </div>
      {/* )} */}
      {cartItems.length > 0 && <Cart />}
    </div>
  )
}

export default UserDashboard
