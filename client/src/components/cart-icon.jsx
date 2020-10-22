import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartHidden } from "../redux/ui/ui-actions";
import { selectCartItemsCount } from "../redux/cart/cart-selectors"
import { ReactComponent as ShoppingIcon } from '../assets/shopping-bag.svg';

const CartIcon = () => {
  const dispatch = useDispatch();
  const handleToggleCartHidden = () => {
    dispatch(toggleCartHidden())
  }
  const itemCount = useSelector(state => selectCartItemsCount(state));
  return (
    <div className='cart-icon' onClick={handleToggleCartHidden}>
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="2rem" height="2rem" viewBox="0 0 24 24" stroke-width="1" stroke="#d9b95e" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <circle cx="9" cy="19" r="2" />
        <circle cx="17" cy="19" r="2" />
        <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" />
    </svg>
      <span className='item-count'>{itemCount > 0 ? itemCount : null}</span>
    </div>
  )
}



export default CartIcon;