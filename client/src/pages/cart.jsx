import React from 'react'
import { useSelector } from 'react-redux';
import CartItem from '../components/cart-item';
import {selectCartItems,selectCartTotal} from '../redux/cart/cart-selectors';
import MyButton from '../components/button';
import addComma from '../utils/helper/add-comma';

const Cart = (props) => {
    const cartItems = useSelector(state => selectCartItems(state));
    const total = useSelector(state => selectCartTotal(state));
    
    return (
        cartItems.length? 
        <div className='cart_wrapper container'>
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
                    <span>Subtotal</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map(cartItem => (
            <CartItem key={cartItem._id} cartItem={cartItem} />
            ))}  
        </div>
        <div className='total'>
            <span>TOTAL: Php {addComma(total)}.00</span>
            <MyButton type="primary" title="Checkout" runAction={()=>props.history.push('/cart/checkout')}/>
        </div>
        </div>
        
        : <div className="no_result checkout-page">
            Your cart is empty
            <MyButton title="shop now" type="default" linkTo="/shop"/>
        </div>
    )
}

export default Cart
