import { ProductActionTypes } from './product-types'

const initialState = {
  loading: true,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case ProductActionTypes.GET_PRODUCT_TO_HOME:
      return {
        ...state,
        productToHome: payload.data,
        loading: false,
      }
    case ProductActionTypes.GET_PRODUCT_BY_ARRIVAL:
      return {
        ...state,
        productByArrival: payload.data,
        loading: false,
      }
    case ProductActionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.data,
        loading: false,
      }
    case ProductActionTypes.ADD_SUCCESS:
      return {
        ...state,
        products: [...state.products, payload.data],
        loading: false,
      }
    case ProductActionTypes.GET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: payload.data,
        loading: false,
      }
    case ProductActionTypes.CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: payload.data,
        loading: false,
      }
    case ProductActionTypes.ADD_FAIL:
      return {
        ...state,
        ...payload,
        loading: false,
      }
    case ProductActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== payload.data._id
        ),
        loading: false,
      }
    case ProductActionTypes.GET_COLLECTIONS:
      return {
        ...state,
        collections: payload.data,
      }
    case ProductActionTypes.GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: payload.articles,
        toShopSize: payload.size,
      }
    case ProductActionTypes.ADD_PRODUCT:
      return {
        ...state,
        addProduct: payload.data,
      }
    case ProductActionTypes.ERROR_PRODUCT:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
