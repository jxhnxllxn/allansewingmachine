import axios from 'axios'
import { AuthActionTypes } from './user-constants'
import authAxios from '../../utils/helper/authAxios'

//Login User
export const login = (dataToSubmit) => async (dispatch) => {
  try {
    dispatch({
      type: AuthActionTypes.USER_LOGIN_REQUEST,
    })

    const { data } = await axios.post('/user/login', dataToSubmit)

    dispatch({
      type: AuthActionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('access_token', JSON.stringify(data.token))
  } catch (error) {
    dispatch({
      type: AuthActionTypes.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

//register
export const register = (dataToSubmit) => async (dispatch) => {
  try {
    dispatch({
      type: AuthActionTypes.USER_REGISTER_REQUEST,
    })

    const { data } = await axios.post('/user/register', dataToSubmit)

    dispatch({
      type: AuthActionTypes.USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: AuthActionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('access_token', JSON.stringify(data.token))
  } catch (error) {
    dispatch({
      type: AuthActionTypes.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserDetails = () => async (dispatch) => {
  try {
    dispatch({
      type: AuthActionTypes.USER_DETAILS_REQUEST,
    })

    const { data } = await authAxios.get('/user/profile')

    dispatch({
      type: AuthActionTypes.USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: AuthActionTypes.USER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const updateUserProfile = (dataToSubmit) => async (dispatch) => {
  try {
    dispatch({
      type: AuthActionTypes.USER_REQUEST,
    })

    const { data } = await authAxios.put('/user/profile', dataToSubmit)
    dispatch({
      type: AuthActionTypes.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: AuthActionTypes.USER_FAIL,
      payload: message,
    })
  }
}

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: AuthActionTypes.USER_REQUEST,
    })

    const { data } = await authAxios.get(`/user`)

    dispatch({
      type: AuthActionTypes.USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: AuthActionTypes.USER_FAIL,
      payload: message,
    })
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: AuthActionTypes.USER_REQUEST,
    })

    await authAxios.delete(`/users/${id}`)

    dispatch({ type: AuthActionTypes.USER_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: AuthActionTypes.USER_FAIL,
      payload: message,
    })
  }
}

//logout
export const logout = () => (dispatch) => {
  localStorage.removeItem('access_token')
  dispatch({ type: AuthActionTypes.USER_LOGOUT })
  dispatch({ type: AuthActionTypes.USER_DETAILS_RESET })
  // dispatch({ type: AuthActionTypes.ORDER_LIST_MY_RESET })
  // dispatch({ type: AuthActionTypes.USER_LIST_RESET })
}

//   updatepassword

export const updatePassword = (dataToSubmit) => async (dispatch) => {
  try {
    dispatch({
      type: AuthActionTypes.USER_REQUEST,
    })

    const { data } = await authAxios.put('/user/password', dataToSubmit)
    dispatch({
      type: AuthActionTypes.USER_UPDATE_PASSWORD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: AuthActionTypes.USER_FAIL,
      payload: message,
    })
  }
}
