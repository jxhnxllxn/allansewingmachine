import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from "../../redux/cart/cart-selectors";
import CartItem from '../cart-item-dropdown/cart-item-dropdown';
import { toggleCartHidden } from "../../redux/ui/ui-actions";
import MyButton from "../utils/button/button";
import "./cart-dropdwon.scss";
import { withRouter } from 'react-router-dom';


const CartDropdown = ({history}) => {
    const cartItems = useSelector(state => selectCartItems(state))
    const dispatch = useDispatch()
    return(
        <div className="cart-dropdown">
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
            <MyButton className="cart_dropdown_button"  type="primary" 
                runAction={() => {
                    dispatch(toggleCartHidden());
                    history.push('/user/cart');
                    }
                }  
                title="Go to Cart" />
        </div>
    )
}


export default withRouter(CartDropdown);
