import CartActionTypes from './cart-types'
import { addItemToCart, removeItemFromCart, updateQuantity } from './cart-utils'

const INITIAL_STATE = {
  cartItems: [],
  shippingOption: 'flat_rate',
}

if (localStorage.cartItems) {
  INITIAL_STATE.cartItems = JSON.parse(localStorage.getItem('cartItems'))
}

const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case CartActionTypes.ADD_ITEM:
      localStorage.setItem(
        'cartItems',
        JSON.stringify(addItemToCart(state.cartItems, payload))
      )
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, payload),
      }
    case CartActionTypes.REMOVE_ITEM:
      localStorage.setItem(
        'cartItems',
        JSON.stringify(removeItemFromCart(state.cartItems, payload))
      )
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, payload),
      }
    case CartActionTypes.UPDATE_QUANTITY:
      localStorage.setItem(
        'cartItems',
        JSON.stringify(
          updateQuantity(state.cartItems, payload.item, payload.quantity)
        )
      )
      return {
        ...state,
        cartItems: updateQuantity(
          state.cartItems,
          payload.item,
          payload.quantity
        ),
      }
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      localStorage.setItem('cartItems', [
        JSON.stringify(
          state.cartItems.filter((cartItem) => cartItem._id !== payload._id)
        ),
      ])
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem._id !== payload._id
        ),
      }
    case CartActionTypes.CLEAR_CART:
      return {
        cartItems: [],
      }
    case CartActionTypes.SHIPPING_OPTION:
      return {
        ...state,
        shippingOption: payload,
      }
    default:
      return state
  }
}

export default cartReducer
