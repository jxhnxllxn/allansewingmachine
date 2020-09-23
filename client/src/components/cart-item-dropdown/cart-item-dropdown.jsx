import React from 'react'
import './cart-item-dropdown.scss'

const renderCardImage = (images) => {
    if(images.length > 0){
      return images[0].url
    }else{
      return '/images/slide2.jpg'
    }
  }

const CartItemDropdown = ({item}) => (
        <div className='cart-item'>
            <img src={renderCardImage(item.images)} alt='item' />
            <div className='item-details'>
            <span className='name'>{item.name}</span>
            <span className='price'>
                {item.quantity} x ${item.price}
            </span>
            </div>
        </div>
    )

export default CartItemDropdown
