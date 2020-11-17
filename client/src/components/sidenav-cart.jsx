import React from "react";
import { selectCartItems, selectCartTotal } from "../redux/cart/cart-selectors";
import CartItem from "./sidenav-cart-item";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as CartIcon } from "../assets/icons/shopping-bag.svg";
import { ReactComponent as RightIcon } from "../assets/icons/arrow-right.svg";
import addComma from "../utils/helper/add-comma";
import { selectNavMenuIconsHidden } from "../redux/ui/ui-selector";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SideNavCart = ({ cartMenuRef }) => {
   const total = useSelector((state) => selectCartTotal(state));
   const history = useHistory();
   const cartItems = useSelector((state) => selectCartItems(state));
   const isNavMenuIconsHidden = useSelector((state) =>
      selectNavMenuIconsHidden(state)
   );

   const viewCart = () => {
      history.push("/user/checkout");
   };

   const cartItemList = () => (
      <div>
         {cartItems.map((cartItem) => (
            <CartItem key={cartItem._id} item={cartItem} />
         ))}
         <div className='sidenav-cart__footer'>
            <div className='sidenav-cart__total'>
               <span>Total </span>
               <span>Php {addComma(total)}</span>
            </div>
            <div className='sidenav-cart_button' onClick={viewCart}>
               <h3>Checkout</h3>
               <RightIcon />
            </div>
         </div>
      </div>
   );

   useEffect(() => {
      return history.listen(() => {
         isNavMenuIconsHidden &&
            document.getElementById("toggleIconCart").click();
      });
   }, [history, isNavMenuIconsHidden]);

   return (
      <div className='sidenav-cart' ref={cartMenuRef}>
         <h2 className='sidenav-cart__header'>Your Cart</h2>
         <div className='sidenav-cart__items'>
            {cartItems.length ? (
               cartItemList()
            ) : (
               <div className='sidenav-cart__emptymsg'>
                  <p>Your cart is Empty</p>
                  <Link to='/shop'>Shop Now</Link>
                  <span className='sidenav-cart__link'></span>
               </div>
            )}
         </div>
      </div>
   );
};

export default SideNavCart;
