import { AuthActionTypes } from './auth-types'

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.USER_LOGIN_REQUEST:
      return { loading: true }
    case AuthActionTypes.USER_LOGIN_SUCCESS:
      return { loading: false, isAuthenticated: true, userInfo: action.payload }
    case AuthActionTypes.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case AuthActionTypes.USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case AuthActionTypes.USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case AuthActionTypes.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case AuthActionTypes.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case AuthActionTypes.USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

// const auth = (state = initialState, action) => {
//   const { type, payload } = action
//   switch (type) {
//     case AuthActionTypes.USER_LOGIN_REQUEST:
//     case AuthActionTypes.USER_REGISTER_REQUEST:
//     case AuthActionTypes.USER_DETAILS_REQUEST:
//     case AuthActionTypes.USER_UPDATE_PROFILE_REQUEST:
//     case AuthActionTypes.USER_LIST_REQUEST:
//     case AuthActionTypes.USER_DELETE_REQUEST:
//     case AuthActionTypes.USER_UPDATE_REQUEST:
//       return { ...state, loading: true }

//     case AuthActionTypes.USER_LOGIN_SUCCESS:
//     case AuthActionTypes.USER_REGISTER_SUCCESS:
//     case AuthActionTypes.USER_DETAILS_SUCCESS:
//     case AuthActionTypes.USER_UPDATE_PROFILE_SUCCESS:
//     case AuthActionTypes.USER_LIST_SUCCESS:
//     case AuthActionTypes.USER_DELETE_SUCCESS:
//     case AuthActionTypes.USER_UPDATE_SUCCESS:
//       return { ...state, loading: false, ...payload }

//     case AuthActionTypes.USER_LOGIN_FAIL:
//       return { ...state, loading: false, loginError: payload }

//     case AuthActionTypes.USER_REGISTER_FAIL:
//       return { ...state, loading: false, loginError: payload }

//     case AuthActionTypes.USER_DETAILS_FAIL:
//     case AuthActionTypes.USER_UPDATE_PROFILE_FAIL:
//     case AuthActionTypes.USER_LIST_FAIL:
//     case AuthActionTypes.USER_UPDATE_FAIL:
//     case AuthActionTypes.USER_DELETE_FAIL:
//     case AuthActionTypes.USER_UPDATE_FAIL:
//       return { ...state, loading: false, error: payload }

//     case AuthActionTypes.USER_LIST_RESET:
//       return { ...state, loading: false, users: [] }

//     case AuthActionTypes.USER_DETAILS_RESET:
//     case AuthActionTypes.USER_UPDATE_PROFILE_RESET:
//       return { ...state, user: {} }

//     case AuthActionTypes.USER_LOGOUT:
//       return {}
//     default:
//       return state
//   }
// }

// export default auth
