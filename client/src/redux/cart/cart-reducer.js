import CartActionTypes from "./cart-types";
import {
   addItemToCart,
   removeItemFromCart,
   updateQuantity,
} from "./cart-utils";

const INITIAL_STATE = {
   cartItems: [],
   shippingOption: "flat_rate",
};

const cartReducer = (state = INITIAL_STATE, action) => {
   const { type, payload } = action;
   switch (type) {
      case CartActionTypes.ADD_ITEM:
         return {
            ...state,
            cartItems: addItemToCart(state.cartItems, payload),
         };
      case CartActionTypes.REMOVE_ITEM:
         return {
            ...state,
            cartItems: removeItemFromCart(state.cartItems, payload),
         };
      case CartActionTypes.UPDATE_QUANTITY:
         return {
            ...state,
            cartItems: updateQuantity(
               state.cartItems,
               payload.item,
               payload.quantity
            ),
         };
      case CartActionTypes.CLEAR_ITEM_FROM_CART:
         return {
            ...state,
            cartItems: state.cartItems.filter(
               (cartItem) => cartItem._id !== payload._id
            ),
         };
      case CartActionTypes.CLEAR_CART:
         return {
            cartItems: [],
         };
      case CartActionTypes.SHIPPING_OPTION:
         return {
            ...state,
            shippingOption: payload,
         };
      default:
         return state;
   }
};

export default cartReducer;
