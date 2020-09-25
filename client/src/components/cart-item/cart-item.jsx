import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import useDebounce from "../utils/debounce";
import './cart-item.scss'

import {
    clearItem,
    addItem,
    removeItem,
    updateQuantity
  } from '../../redux/cart/cart-action';

const CartItem = (props) => {
    const dispatch = useDispatch();
    
    const renderImage = (images) => {
        if(images.length > 0){
            return images[0].url
        }else{
            return '/images/slide2.jpg'
        }
    }
    const handleChange = e =>  setQuantity(e.target.value);
    
    const [quantity, setQuantity] = useState(props.cartItem.quantity)

    const debounceQuantity = useDebounce(quantity,1000);

    useEffect(
        () => {
          if (debounceQuantity) {
              console.log(debounceQuantity)
            dispatch(updateQuantity(props.cartItem,debounceQuantity));
          }
        },
        [debounceQuantity]
    );
    

    
    // const onChange = e => setData({[e.target.name]:e.target.value});



    return (
        <div className='checkout-item'>
        <div className='image-container'>
            <img src={renderImage(props.cartItem.images)} alt='item' />
        </div>
        <span className='name'>{props.cartItem.name}</span>
        {/* <span className='quantity'>
            <div className='arrow' onClick={() => dispatch(removeItem(props.cartItem))}>
            &#10094;
            </div>
            <span className='value'>{props.cartItem.quantity}</span>
            <div className='arrow' onClick={() => dispatch(addItem(props.cartItem))}>
            &#10095;
            </div>
            
            <span className='value'>{props.cartItem.unit}</span>
        </span> */}

        <span className='quantity'>
            <input type='number' name="quantity" value={quantity} onChange={handleChange} min='1' />
        </span>

        <span className='price'>{props.cartItem.price}</span>
        <div className='remove-button' onClick={() => dispatch(clearItem(props.cartItem))}>
            &#10005;
        </div>
        </div>
    )
}

export default CartItem
