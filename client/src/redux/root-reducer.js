import { combineReducers } from 'redux'

import user from './user/user-reducer'
import cart from './cart/cart-reducer'
import collection from './collection/collection-reducer'
import product from './product/product-reducer'
import order from './order/order-reducer'
import ui from './ui/ui-reducer'

export default combineReducers({
  user,
  order,
  collection,
  product,
  cart,
  ui,
})
