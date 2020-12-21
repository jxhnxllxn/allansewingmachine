import React from 'react'
import { selectCartItems, selectCartTotal } from '../redux/cart/cart-selectors'
import CartItem from './cart-item'
import addComma from '../utils/helper/add-comma'
import { useSelector } from 'react-redux'
import MyButton from '../components/button'
import { useHistory } from 'react-router-dom'

const Cart = () => {
  const history = useHistory()
  const total = useSelector((state) => selectCartTotal(state))
  const cartItems = useSelector((state) => selectCartItems(state))
  const cartItemList = () =>
    cartItems.map((i) => <CartItem key={i._id} item={i} history={history} />)

  const handleCloseC = () => {
    document.getElementById('toggleSideNav').click()
    history.push('/checkout')
  }

  return (
    <div className='cart'>
      <h1 className='heading-secondary'>Your Cart</h1>
      <table className='cart__table'>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Sub Total</th>
            <th></th>
          </tr>
          {cartItems.length > 0 && cartItemList()}
        </tbody>
      </table>
      <div className='cart__total'>
        <h2>Total</h2>
        <h2 className='heading-secondary'>
          Php {addComma(parseFloat(total).toFixed(2))}
        </h2>
      </div>

      <MyButton
        addStyle={{
          margin: '1rem 0',
          fontSize: '1rem',
        }}
        runAction={() => handleCloseC()}
        type={'primary'}
        title={'Checkout'}
      />
    </div>
  )
}

export default Cart
