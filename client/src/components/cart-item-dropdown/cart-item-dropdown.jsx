import React from 'react'
import { useDispatch } from 'react-redux'
import { clearItem } from '../../redux/cart/cart-action'
import './cart-item-dropdown.scss'


const CartItemDropdown = ({item}) => {
  
  const renderCardImage = (images) => {
    if(images.length > 0){
      return images[0].url
    }else{
      return '/images/slide2.jpg'
    }
  }

  const dispatch = useDispatch()
  return (
    <div className='cart-item'>
        <img src={renderCardImage(item.images)} alt='item' />
        <div className='item-details'>
          <span className='name'>{item.name}</span>
          <span className='price'>
              {item.quantity} x ${item.price}
          </span>
          <span className='remove-button' onClick={() => dispatch(clearItem(item))}>
              &#10005;
          </span>
        </div>
    </div>
  )
}

export default CartItemDropdown
