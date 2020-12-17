import React from 'react'
import { selectCartItems } from '../redux/cart/cart-selectors'
import { useSelector } from 'react-redux'
import MyButton from '../components/button'
import { useHistory } from 'react-router-dom'
import Cart from './cart'

const SideNavCart = () => {
  const history = useHistory()
  const cartItems = useSelector((state) => selectCartItems(state))

  const handleCloseS = () => {
    document.getElementById('toggleSideNav').click()
    history.push('/shop')
  }

  return (
    <div className='sidenav-cart'>
      {cartItems.length > 0 ? (
        <Cart />
      ) : (
        <>
          <h1 className='heading-secondary'>Empty Cart</h1>
          <MyButton
            addStyle={{
              margin: '2rem 0',
              padding: '.5rem',
              fontSize: '1rem',
              letterSpacing: '4px',
            }}
            runAction={() => handleCloseS()}
            title={'Shop Now'}
            type={'primary'}
          />
        </>
      )}
    </div>
  )
}

export default SideNavCart
