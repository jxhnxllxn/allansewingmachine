import React from 'react'
import { selectCartItems } from "../redux/cart/cart-selectors";
import CartItem from './cart-item-dropdown';
import MyButton from "./button";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


const CartDropdown = ({handleToggleNavCart,cartMenuRef}) => {
    const history = useHistory()
    const cartItems = useSelector(state => selectCartItems(state))
    const viewCart = () => {
        handleToggleNavCart()
        history.push('/user/cart')
      }
    
    return(
    <div className="cart-dropdown"  ref={cartMenuRef}>
        <div className="cartwrap">
        <div className="cart-items">
            {
                cartItems.length ? (
                    cartItems.map(cartItem => (
                    <CartItem key={cartItem._id} item={cartItem}/>
                ))
                ):(
                    <span className="empty_message">Your cart is Empty</span>
                )
            }
        </div>
       
        </div>
        
        <div className="cartLinkWrap">
            <MyButton className="cart_dropdown_button"  type="primary" 
                runAction={() => { viewCart() }}  
                title="Go to Cart" />
            </div>
    </div>
)
}


export default CartDropdown;
