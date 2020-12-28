import { OrderActionTypes } from './order-constants'

const initialState = {
  loading: false,
  data: [],
  countDash: {
    pendingCount: 0,
    allCount: 0,
    processedCount: 0,
    canceledCount: 0,
  },
  orderHistory: [],
  orderPending: [],
  successBuy: true,
  error: '',
}

const order = (state = initialState, { type, payload }) => {
  switch (type) {
    case OrderActionTypes.ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case OrderActionTypes.GET_ALL_ORDER:
    case OrderActionTypes.GET_CANCELED_ORDERS:
    case OrderActionTypes.GET_PROCESSED_ORDERS:
    case OrderActionTypes.GET_PENDING_ORDERS:
    case OrderActionTypes.SEARCH_CHARACTER:
      return {
        ...state,
        ...payload,
        loading: false,
      }

    case OrderActionTypes.ADD_ORDER:
      return {
        ...state,
        successBuy: true,
        loading: false,
      }

    case OrderActionTypes.GET_DASHBOARD_ADMIN:
      return {
        ...state,
        loading: false,
        countDash: payload.count,
      }

    case OrderActionTypes.GET_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: payload,
        loading: false,
      }

    case OrderActionTypes.CLEAN_ORDER:
      return {}

    case OrderActionTypes.GET_ORDER_PENDING:
      return {
        ...state,
        orderPending: payload,
        loading: false,
      }

    case OrderActionTypes.SUCCESS_BUY_FALSE:
      return {
        ...state,
        successBuy: false,
      }
    case OrderActionTypes.ORDER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      }

    default:
      return state
  }
}

export default order
