import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearItem, updateQuantity } from "../redux/cart/cart-action";
import addComma from "../utils/helper/add-comma";

const SideNavCartItem = ({ item }) => {
   const dispatch = useDispatch();

   const [quantity, setQuantity] = useState(item.quantity);

   const quantityChange = (e) => {
      setQuantity(e.target.value);
   };

   const handleClearItem = () => {
      dispatch(clearItem(item));
   };

   useEffect(
      () => {
         if (quantity > 0) {
            dispatch(updateQuantity(item, quantity));
         }
      },
      // eslint-disable-next-line
      [dispatch, quantity]
   );

   return (
      <div className='sidenav-cart-item'>
         <span className='sidenav-cart-item__name'>{item.name}</span>
         <div className='sidenav-cart-item__calc'>
            <span className='sidenav-cart-item__quantity'>
               <input
                  type='number'
                  name='quantity'
                  onChange={quantityChange}
                  value={quantity}
                  min='1'
               />
            </span>
            <span>x</span>
            <div className='sidenav-cart-item__price'>
               <span>Php</span>
               <span>{addComma(item.price * item.quantity)}</span>
            </div>
         </div>
         <span
            className='sidenav-cart-item__remove_button'
            onClick={handleClearItem}
         >
            &#10005;
         </span>
      </div>
   );
};

export default React.memo(SideNavCartItem);
