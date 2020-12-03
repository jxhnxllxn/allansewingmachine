import { combineReducers } from 'redux'
import alert from './alert/alert-reducer'
import auth from './auth/auth-ruducer'
import cart from './cart/cart-reducer'
import collection from './collection/collection-reducer'
import product from './product/product-reducer'
import order from './order/order-reducer'
import ui from './ui/ui-reducer'

export default combineReducers({
  alert,
  auth,
  collection,
  product,
  cart,
  order,
  ui,
})
