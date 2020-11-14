import React from 'react'
import { useDispatch } from 'react-redux'
import { clearItem } from '../redux/cart/cart-action'
import addComma from '../utils/helper/add-comma';

const SideNavCartItem = ({item}) => {
  
  const dispatch = useDispatch()

  const handleClearItem = () => {
    dispatch(clearItem(item))
  }

  return (
    <div className='sidenav-cart-item'>
        <span className='sidenav-cart-item__name'>{item.name}</span>
        <div>
          <span className='sidenav-cart-item__quantity'>
              {item.quantity}x
          </span>
          <span className='sidenav-cart-item__price'>
              Php {addComma(item.price)}
          </span>
        </div>
        <span className='sidenav-cart-item__remove_button' onClick={handleClearItem}>
            &#10005;
        </span>
    </div>
  )
}

export default React.memo(SideNavCartItem)
