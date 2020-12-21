import { OrderActionTypes } from './order-constants'
import authAxios from '../../utils/helper/authAxios'

import { clearCart } from '../cart/cart-action'

export const addOrder = (dataToAdd) => async (dispatch) => {
  try {
    dispatch({
      type: OrderActionTypes.ORDER_REQUEST,
    })

    const { data } = await authAxios.post('/order', dataToAdd)

    dispatch({
      type: OrderActionTypes.ADD_ORDER,
      payload: data,
    })

    dispatch(clearCart())
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const successBuyFalse = () => {
  return {
    type: OrderActionTypes.SUCCESS_BUY_FALSE,
  }
}

export const getAllOrder = () => async (dispatch) => {
  try {
    dispatch({
      type: OrderActionTypes.ORDER_REQUEST,
    })

    const { data } = await authAxios.get('/order')
    dispatch({
      type: OrderActionTypes.GET_ALL_ORDER,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const getSingleOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: OrderActionTypes.ORDER_REQUEST,
    })

    const { data } = await authAxios.get(`/order/${id}`)

    dispatch({
      type: OrderActionTypes.GET_SINGLE_ORDER,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const getPendingOrder = () => async (dispatch) => {
  try {
    dispatch({
      type: OrderActionTypes.ORDER_REQUEST,
    })
    const { data } = await authAxios.get(
      '/order?status=pending&page=1&limit=20'
    )
    dispatch({
      type: OrderActionTypes.GET_PENDING_ORDERS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const getProcessedOrder = () => async (dispatch) => {
  try {
    dispatch({
      type: OrderActionTypes.ORDER_REQUEST,
    })
    const { data } = await authAxios.get(
      '/order?status=processed&page=1&limit=20'
    )
    dispatch({
      type: OrderActionTypes.GET_PROCESSED_ORDERS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const getCanceledOrder = () => async (dispatch) => {
  try {
    dispatch({
      type: OrderActionTypes.ORDER_REQUEST,
    })
    const { data } = await authAxios.get(
      '/order?status=canceled&page=1&limit=20'
    )
    dispatch({
      type: OrderActionTypes.GET_CANCELED_ORDERS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const getDashboardAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: OrderActionTypes.ORDER_REQUEST,
    })
    const { data } = await authAxios.get('/order/dashboard')
    dispatch({
      type: OrderActionTypes.GET_DASHBOARD_ADMIN,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const searchCharacter = (i) => async (dispatch) => {
  try {
    dispatch({
      type: OrderActionTypes.ORDER_REQUEST,
    })
    const { data } = await authAxios.get(`/order/search/${i}`)
    dispatch({
      type: OrderActionTypes.SEARCH_CHARACTER,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const getOrderHistory = () => async (dispatch) => {
  try {
    dispatch({
      type: OrderActionTypes.ORDER_REQUEST,
    })

    const { data } = await authAxios.get('/order/order-history')
    dispatch({
      type: OrderActionTypes.GET_ORDER_HISTORY,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const getOrderPending = () => async (dispatch) => {
  try {
    dispatch({
      type: OrderActionTypes.ORDER_REQUEST,
    })

    const { data } = await authAxios.get('/order/order-pending')
    dispatch({
      type: OrderActionTypes.GET_ORDER_PENDING,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const cleanOrder = () => {
  return {
    type: OrderActionTypes.CLEAN_ORDER,
    payload: {},
  }
}
