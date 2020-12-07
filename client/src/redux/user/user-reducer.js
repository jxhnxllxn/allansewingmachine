import { AuthActionTypes } from './user-constants'

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  ...userInfoFromStorage,
}

export const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.USER_LOGIN_REQUEST:
    case AuthActionTypes.USER_REGISTER_REQUEST:
      return { loading: true }
    case AuthActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      }
    case AuthActionTypes.USER_LOGIN_FAIL:
    case AuthActionTypes.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case AuthActionTypes.USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const user = (
  state = { loading: true, userDetail: {} },
  { type, payload }
) => {
  switch (type) {
    case AuthActionTypes.USER_REQUEST:
      return { ...state, loading: true }

    case AuthActionTypes.USER_DETAILS_SUCCESS:
      return { ...state, loading: false, userDetail: payload.data }

    case AuthActionTypes.USER_DETAILS_RESET:
    case AuthActionTypes.USER_UPDATE_PROFILE_RESET:
      return { ...state, userDetail: {} }

    case AuthActionTypes.USER_FAIL:
      return { loading: false, error: payload }

    case AuthActionTypes.USER_LOGOUT:
      return { loading: false }

    default:
      return state
  }
}
