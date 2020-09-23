import CartActionTypes from './cart-types';
import { addItemToCart, removeItemFromCart } from './cart-utils';

const INITIAL_STATE = {
  hidden: true,
  settingHidden:true,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  const {type,payload} = action;
  switch (type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
        settingHidden:true
      };
    case CartActionTypes.TOGGLE_SETTING_HIDDEN:
      return {
        ...state,
        settingHidden: !state.settingHidden,
        hidden:true,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, payload)
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, payload)
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem._id !== payload._id
        )
      };
    default:
      return state;
  }
};

export default cartReducer;
