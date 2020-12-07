import axios from 'axios'
import { ProductActionTypes } from './product-constants'

// user
export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: ProductActionTypes.PRODUCT_REQUEST })

    const { data } = await axios.get(`/product/${id}`)

    dispatch({
      type: ProductActionTypes.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ProductActionTypes.PRODUCT_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const clearProductDetail = () => {
  return {
    type: ProductActionTypes.PRODUCT_DETAILS_RESET,
    payload: [],
  }
}

export const getProductsToHome = () => async (dispatch) => {
  try {
    dispatch({ type: ProductActionTypes.PRODUCT_REQUEST })

    const { data } = await axios.get('/product/home')
    dispatch({
      type: ProductActionTypes.PRODUCT_LIST_HOME_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ProductActionTypes.PRODUCT_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const getProductsToShop = (
  skip,
  limit,
  filters = [],
  previousState = []
) => async (dispatch) => {
  const dataToSubmit = {
    limit,
    skip,
    filters,
  }

  try {
    dispatch({ type: ProductActionTypes.PRODUCT_REQUEST })
    const data = await axios.post(`/product/shop`, dataToSubmit).then((res) => {
      let newState = [...previousState, ...res.data.articles]
      return {
        size: res.data.size,
        articles: newState,
      }
    })
    dispatch({
      type: ProductActionTypes.PRODUCT_LIST_SHOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ProductActionTypes.PRODUCT_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const addProduct = (dataToSubmit) => async (dispatch) => {
  try {
    dispatch({ type: ProductActionTypes.PRODUCT_REQUEST })
    const { data } = await axios.post('/product', dataToSubmit)
    dispatch({
      type: ProductActionTypes.PRODUCT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ProductActionTypes.PRODUCT_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const deleteProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: ProductActionTypes.PRODUCT_REQUEST })
    const { data } = await axios.delete(`/product/${data}`)
    dispatch({
      type: ProductActionTypes.PRODUCT_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ProductActionTypes.PRODUCT_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}
