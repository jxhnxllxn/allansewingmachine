import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cart from '../../components/cart'
import Table from '../../components/table'
import ThankYouCard from '../../components/thankYouCard'
import { selectCartItems } from '../../redux/cart/cart-selectors'
import { successBuyFalse } from '../../redux/order/order-action'
import addComma from '../../utils/helper/add-comma'

const UserDashboard = () => {
  const name = useSelector(({ user }) => user.name)
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => selectCartItems(state))
  const orderState = useSelector(({ order }) => order)
  const { loading, successBuy, orderPending } = orderState

  useEffect(() => {
    return () => {
      dispatch(successBuyFalse())
    }
  }, [])

  const tableFormat = {
    tHead: ['Code', 'Total', 'Date', 'Action'],
    tData: ['code', 'totalPrice', 'createdAt'],
    action: {
      view: '/admin/order',
      delete: '',
      edit: '',
    },
  }

  const total = () => {
    let total = 0
    orderPending.map((i) => {
      let t = parseInt(i.totalPrice)
      total = total + t
    })
    return addComma(parseFloat(total).toFixed(2))
  }

  return (
    <div className='dash_user'>
      <div className='dash_user__success'>
        {successBuy && <ThankYouCard name={name} />}
      </div>
      {cartItems.length > 0 && (
        <div className='dash_user__cart card'>
          <Cart />
        </div>
      )}
      {orderPending.length > 0 && (
        <div className='dash_user__order card'>
          <h2 className='heading-secondary'>Active Orders</h2>
          <Table tableFormat={tableFormat} tableData={orderPending} />
          <h2>Total</h2>
          <h2 className='heading-secondary'>
            <span>Php {total()}</span>
          </h2>
        </div>
      )}
    </div>
  )
}

export default UserDashboard
