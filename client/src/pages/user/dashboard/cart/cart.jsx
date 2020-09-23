import React from 'react'
import { useSelector } from 'react-redux';
import CartItem from '../../../../components/cart-item/cart-item';
import {selectCartItems,selectCartTotal} from '../../../../redux/cart/cart-selectors';
import MyButton from '../../../../components/utils/button/button';
import './cart.scss'
  

const Cart = (props) => {
    const cartItems = useSelector(state => selectCartItems(state));
    const total = useSelector(state => selectCartTotal(state));
    
    return (
        <div className='checkout-page'>
            <div className='checkout-header'>
            <div className='header-block'>
            
            </div>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
            </div>
            {cartItems.map(cartItem => (
            <CartItem key={cartItem._id} cartItem={cartItem} />
            ))}
            <div className='total'>TOTAL: Php {total}.00 <br/><MyButton type="primary" title="Checkout" runAction={()=>props.history.push('/cart/checkout')}/></div>
            <div className="checkot_button"></div>
           
        </div>
    )
}

export default Cart
