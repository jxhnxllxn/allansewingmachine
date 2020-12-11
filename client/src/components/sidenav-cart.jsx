import React from 'react'
import { selectCartItems, selectCartTotal } from '../redux/cart/cart-selectors'
import CartItem from './sidenav-cart-item'
import addComma from '../utils/helper/add-comma'
import { useSelector } from 'react-redux'
import MyButton from '../components/button'

const SideNavCart = () => {
  const total = useSelector((state) => selectCartTotal(state))
  const cartItems = useSelector((state) => selectCartItems(state))
  const cartItemList = () =>
    cartItems.map((i) => <CartItem key={i._id} item={i} />)

  // useEffect(() => {
  //   return history.listen(() => {
  //     isNavMenuIconsHidden && document.getElementById('toggleIconCart').click()
  //   })
  // }, [history, isNavMenuIconsHidden])

  return (
    <div className='sidenav-cart'>
      {cartItems.length > 0 ? (
        <>
          <table className='sidenav-cart__table'>
            <caption>
              <h1 className='heading-secondary'>Cart</h1>
            </caption>
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
          <div className='sidenav-cart__total'>
            <h2>
              <small>Total: Php </small>
              {addComma(total)}
            </h2>
          </div>

          <MyButton
            addStyle={{
              textAlign: 'center',
              margin: '2rem 1rem',
              padding: '.5rem',
              fontSize: '1rem',
              textTransform: 'uppercase',
              fontWeight: '700',
              float: 'right',
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
