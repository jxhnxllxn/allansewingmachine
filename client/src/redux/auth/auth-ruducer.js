import { AuthActionTypes } from './auth-types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isAdmin: false,
  userData: null,
  loading: true,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case AuthActionTypes.AUTH_USER:
    case AuthActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        loading: false,
      }

    case AuthActionTypes.REGISTER_FAIL:
    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.LOGOUT_FAIL:
    case AuthActionTypes.AUTH_ERROR:
    case AuthActionTypes.PASSWORD_UPDATE_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        userData: null,
        isAdmin: false,
        loading: false,
        error: payload,
      }

    case AuthActionTypes.CHECKOUT_UPDATE_USER:
      return {
        ...state,
        loading: false,
        data: payload.data,
      }
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload.data,
      }
    default:
      return state
  }
}
