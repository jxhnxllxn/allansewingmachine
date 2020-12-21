import { AuthActionTypes } from './user-constants'

const userInfoFromStorage = localStorage.getItem('access_token')
  ? JSON.parse(localStorage.getItem('access_token'))
  : null

const initialState = {
  token: userInfoFromStorage,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.USER_LOGIN_REQUEST:
    case AuthActionTypes.USER_REGISTER_REQUEST:
    case AuthActionTypes.USER_DETAILS_REQUEST:
      return { loading: true }
    case AuthActionTypes.USER_LOGIN_SUCCESS:
    case AuthActionTypes.USER_REGISTER_SUCCESS:
    case AuthActionTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      }
    case AuthActionTypes.USER_LOGIN_FAIL:
    case AuthActionTypes.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case AuthActionTypes.CLEAR_ERROR:
    case AuthActionTypes.USER_DETAILS_FAIL:
      return { ...state, error: null }
    case AuthActionTypes.USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export default user
