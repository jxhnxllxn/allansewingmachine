import { combineReducers } from 'redux'

import { userLoginReducer, userDetailsReducer } from './auth/auth-ruducer'
import cart from './cart/cart-reducer'
import collection from './collection/collection-reducer'
import product from './product/product-reducer'
import order from './order/order-reducer'
import ui from './ui/ui-reducer'

export default combineReducers({
  userLogin: userLoginReducer,
  // userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  // userUpdateProfile: userUpdateProfileReducer,
  // userList: userListReducer,
  // userDelete: userDeleteReducer,
  // userUpdate: userUpdateReducer,
  collection,
  product,
  cart,
  order,
  ui,
})
