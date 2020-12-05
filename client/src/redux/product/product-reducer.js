import { ProductActionTypes } from './product-constants'

export const productListHomeReducer = (
  state = { productToHome: [] },
  action
) => {
  const { type, payload } = action
  switch (type) {
    case ProductActionTypes.PRODUCT_LIST_HOME_REQUEST:
      return { loading: true, productToHome: [] }
    case ProductActionTypes.PRODUCT_LIST_HOME_SUCCESS:
      return {
        loading: false,
        productToHome: payload.data,
      }
    case ProductActionTypes.PRODUCT_LIST_HOME_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const productListShopReducer = (
  state = { toShop: [], toShopSize: 0 },
  action
) => {
  const { type, payload } = action
  switch (type) {
    case ProductActionTypes.PRODUCT_LIST_SHOP_REQUEST:
      return { loading: true }
    case ProductActionTypes.PRODUCT_LIST_SHOP_SUCCESS:
      return {
        loading: false,
        toShop: payload.articles,
        toShopSize: payload.size,
      }
    case ProductActionTypes.PRODUCT_LIST_SHOP_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const productDetailsReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ProductActionTypes.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ProductActionTypes.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload }
    case ProductActionTypes.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ProductActionTypes.PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case ProductActionTypes.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: payload }
    case ProductActionTypes.PRODUCT_CREATE_FAIL:
      return { loading: false, error: payload }
    case ProductActionTypes.PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ProductActionTypes.PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case ProductActionTypes.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ProductActionTypes.PRODUCT_DELETE_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case ProductActionTypes.PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case ProductActionTypes.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: payload }
    case ProductActionTypes.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: payload }
    case ProductActionTypes.PRODUCT_UPDATE_RESET:
      return { product: {} }
    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ProductActionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case ProductActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case ProductActionTypes.PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: payload }
    case ProductActionTypes.PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case ProductActionTypes.PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] }
    case ProductActionTypes.PRODUCT_TOP_SUCCESS:
      return { loading: false, products: payload }
    case ProductActionTypes.PRODUCT_TOP_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
