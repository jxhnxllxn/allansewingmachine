import React from 'react'
import { selectCartItems, selectCartTotal } from '../redux/cart/cart-selectors'
import CartItem from './sidenav-cart-item'
import { useHistory } from 'react-router-dom'
import addComma from '../utils/helper/add-comma'
import { selectNavMenuIconsHidden } from '../redux/ui/ui-selector'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MyButton from '../components/button'

const SideNavCart = ({ cartMenuRef }) => {
  const total = useSelector((state) => selectCartTotal(state))
  const history = useHistory()
  const cartItems = useSelector((state) => selectCartItems(state))
  const isNavMenuIconsHidden = useSelector((state) =>
    selectNavMenuIconsHidden(state)
  )
  const cartItemList = () =>
    cartItems.map((i) => <CartItem key={i._id} item={i} />)

  useEffect(() => {
    return history.listen(() => {
      isNavMenuIconsHidden && document.getElementById('toggleIconCart').click()
    })
  }, [history, isNavMenuIconsHidden])

  return (
    <div className='sidenav-cart' ref={cartMenuRef}>
      {cartItems.length > 0 ? (
        <>
          <table className='sidenav-cart__table'>
            <caption>
              <h1 className='heading-secondary'>Your Cart</h1>
            </caption>
            <tbody>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Quantity</th>
                <th></th>
                <th>Price</th>
                <th></th>
                <th>Sub Total</th>
              </tr>
              {cartItems.length > 0 && cartItemList()}
            </tbody>
          </table>
          <div className='sidenav-cart__total'>
            <h2>
              Total: <small>Php </small>
              {addComma(total)}
            </h2>
          </div>

          <MyButton
            addStyle={{
              display: 'block',
              textAlign: 'center',
              margin: '2rem 0',
              padding: '1rem 0',
              fontSize: '1rem',
              textTransform: 'uppercase',
              fontWeight: '700',
            }}
            type={'default'}
            linkTo={'/checkout'}
            title={'Checkout'}
          />
        </>
      ) : (
        <div className='sidenav-cart__emptymsg'>
          <p>Your cart is Empty</p>
          <MyButton linkTo={'/shop'} title={'Shop Now'} type={'default'} />
          <span className='sidenav-cart__link'></span>
        </div>
      )}
    </div>
  )
}

export default SideNavCart
