import React from 'react'
import { useDispatch } from 'react-redux';
import './cart-item.scss'

import {
    clearItem,
    addItem,
    removeItem
  } from '../../redux/cart/cart-action';

const renderImage = (images) => {
if(images.length > 0){
    return images[0].url
}else{
    return '/images/slide2.jpg'
}
}

const CartItem = (props) => {
    const dispatch = useDispatch();
    return (
        <div className='checkout-item'>
        <div className='image-container'>
            <img src={renderImage(props.cartItem.images)} alt='item' />
        </div>
        <span className='name'>{props.cartItem.name}</span>
        <span className='quantity'>
            <div className='arrow' onClick={() => dispatch(removeItem(props.cartItem))}>
            &#10094;
            </div>
            <span className='value'>{props.cartItem.quantity}</span>
            <div className='arrow' onClick={() => dispatch(addItem(props.cartItem))}>
            &#10095;
            </div>
            
            <span className='value'>{props.cartItem.unit}</span>
        </span>
        <span className='price'>{props.cartItem.price}</span>
        <div className='remove-button' onClick={() => dispatch(clearItem(props.cartItem))}>
            &#10005;
        </div>
        </div>
    )
}

export default CartItem
