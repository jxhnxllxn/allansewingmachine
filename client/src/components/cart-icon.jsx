import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartHidden } from "../redux/ui/ui-actions";
import { selectCartItemsCount } from "../redux/cart/cart-selectors"

import { ReactComponent as ShoppingBagIcon } from '../assets/icons/shopping-bag.svg'

const CartIcon = () => {
  const dispatch = useDispatch();
  const handleToggleCartHidden = () => {
    dispatch(toggleCartHidden())
  }
  const itemCount = useSelector(state => selectCartItemsCount(state));
  return (
    <div className='cart-icon' onClick={handleToggleCartHidden}>
      <ShoppingBagIcon />
      <span className='item-count'>{itemCount > 0 ? itemCount : null}</span>
    </div>
  )
}



export default CartIcon;