import { combineReducers } from 'redux'

import { userLoginReducer, userDetailsReducer } from './user/user-reducer'
import cart from './cart/cart-reducer'
import collection from './collection/collection-reducer'
import {
  productListHomeReducer,
  productListShopReducer,
  productDetailsReducer,
  productCreateReducer,
  productDeleteReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from './product/product-reducer'
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

  productListHome: productListHomeReducer,
  productListShop: productListShopReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,

  collection,
  cart,
  order,
  ui,
})
