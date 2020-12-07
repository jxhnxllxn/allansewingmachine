import { combineReducers } from 'redux'

import { user, userAuthReducer } from './user/user-reducer'
import cart from './cart/cart-reducer'
import collection from './collection/collection-reducer'
import product from './product/product-reducer'
import { orderHistoryReducer } from './order/order-reducer'
import ui from './ui/ui-reducer'

export default combineReducers({
  user,
  userAuth: userAuthReducer,
  orderHistory: orderHistoryReducer,
  collection,
  product,
  cart,
  ui,
})
