import { ProductActionTypes } from './product-constants'

const initialState = {
  loading: true,
  productToHome: [],
  productToShop: [],
  productToShopSize: 0,
  productDetail: {},
  productReviews: [],
}

const product = (state = initialState, { type, payload }) => {
  switch (type) {
    case ProductActionTypes.PRODUCT_REQUEST:
      return { ...state, loading: true }
    case ProductActionTypes.PRODUCT_LIST_HOME_SUCCESS:
      return {
        ...state,
        loading: false,
        productToHome: payload.data,
      }
    case ProductActionTypes.PRODUCT_LIST_SHOP_SUCCESS:
      return {
        ...state,
        loading: false,
        productToShop: payload.articles,
        productToShopSize: payload.size,
      }
    case ProductActionTypes.PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, productDetail: payload }

    case ProductActionTypes.PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        productToShop: [...state.productToShop, payload],
      }

    case ProductActionTypes.PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        productToShop: state.productToShop.filter(
          (i) => i._id !== payload.data._id
        ),
      }

    case ProductActionTypes.PRODUCT_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true, productDetail: payload }

    case ProductActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        productReviews: [...state.productReviews, payload],
      }

    case ProductActionTypes.PRODUCT_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export default product
