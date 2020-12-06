import { OrderActionTypes } from './order-constants'
import axios from 'axios'

export const addOrder = (data) => {
  const request = axios.post('/order', data).then((res) => res.data)
  return {
    type: OrderActionTypes.ADD_ORDER,
    payload: request,
  }
}

export const getAllOrder = () => {
  const request = axios.get('/order').then((res) => res.data)
  return {
    type: OrderActionTypes.GET_ALL_ORDER,
    payload: request,
  }
}

export const getSingleOrder = (id) => {
  const request = axios.get(`/order/${id}`).then((res) => res.data)
  return {
    type: OrderActionTypes.GET_SINGLE_ORDER,
    payload: request,
  }
}

export const getPendingOrder = () => {
  const request = axios
    .get('/order?status=pending&page=1&limit=20')
    .then((res) => res.data)
  return {
    type: OrderActionTypes.GET_PENDING_ORDERS,
    payload: request,
  }
}

export const getProcessedOrder = () => {
  const request = axios
    .get('/order?status=processed&page=1&limit=20')
    .then((res) => res.data)
  return {
    type: OrderActionTypes.GET_PROCESSED_ORDERS,
    payload: request,
  }
}

export const getCanceledOrder = () => {
  const request = axios
    .get('/order?status=canceled&page=1&limit=20')
    .then((res) => res.data)
  return {
    type: OrderActionTypes.GET_CANCELED_ORDERS,
    payload: request,
  }
}

export const getDashboardAdmin = () => {
  const request = axios.get('/order/dashboard').then((res) => res.data)
  return {
    type: OrderActionTypes.GET_DASHBOARD_ADMIN,
    payload: request,
  }
}

export const searchCharacter = (i) => {
  const request = axios.get(`/order/search/${i}`).then((res) => res.data)
  return {
    type: OrderActionTypes.SEARCH_CHARACTER,
    payload: request,
  }
}

export const getOrderHistory = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: OrderActionTypes.ORDER_HISTORY_REQUEST,
    })
    const {
      userLogin: { token },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get('/order/order-history', config)
    dispatch({
      type: OrderActionTypes.ORDER_HISTORY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_HISTORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getPaypalScript = () => {
  const request = axios.get('/config/paypal').then((res) => res.data)
  return {
    type: OrderActionTypes.GET_PAYPAL_SCRIPT,
    payload: request,
  }
}

export const cleanOrder = () => {
  return {
    type: OrderActionTypes.CLEAN_ORDER,
    payload: {},
  }
}
