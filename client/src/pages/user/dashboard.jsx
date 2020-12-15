import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cart from '../../components/cart'
import { selectCartItems } from '../../redux/cart/cart-selectors'
import { successBuyFalse } from '../../redux/order/order-action'

const UserDashboard = () => {
  const name = useSelector(({ user }) => user.name)
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => selectCartItems(state))
  const orderState = useSelector(({ order }) => order)
  const { loading, successBuy } = orderState

  useEffect(() => {
    return () => {
      dispatch(successBuyFalse())
    }
  }, [])

  return (
    <div className='dashboard_user'>
      <div className='dashboard_user__title'>
        <h1 className='heading-secondary'>{name}'s</h1>
      </div>
      {successBuy && (
        <div className='success_bought card'>
          <h1 className='heading-primary'>Thanks</h1>
          <h2>
            <i>so much !</i>
          </h2>
          <p>We appreciate your</p>
          <p>most recent purchased and hope you</p>
          <span>ENJOY YOUR NEW SEWING BUDDY.</span>
        </div>
      )}
      {cartItems.length > 0 && <Cart />}
    </div>
  )
}

export default UserDashboard
