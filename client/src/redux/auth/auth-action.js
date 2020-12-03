import axios from 'axios'
import { AuthActionTypes } from './auth-types'

export const auth = () => async (dispatch) => {
  // try {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${localStorage.token}`,
  //     },
  //   }
  //   const { data } = await axios.get('/auth/me', config)
  //   dispatch({
  //     type: AuthActionTypes.AUTH_USER,
  //     payload: data,
  //   })
  // } catch (error) {
  //   dispatch({
  //     type: AuthActionTypes.AUTH_ERROR,
  //     payload:
  //       error.response && error.response.data.error
  //         ? error.response.data.error
  //         : error.message,
  //   })
  // }

  try {
    const { data } = await axios.get('/auth/me')

    dispatch({
      type: AuthActionTypes.AUTH_USER,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AuthActionTypes.AUTH_ERROR,
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
    const { data } = await axios.post('/auth/register', dataToSubmit)
    dispatch({
      type: AuthActionTypes.REGISTER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AuthActionTypes.REGISTER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

//Login User
export const login = (dataToSubmit) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/login', dataToSubmit)
    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AuthActionTypes.LOGIN_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

//logout
export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/auth/logout')
    dispatch({
      type: AuthActionTypes.LOGOUT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AuthActionTypes.LOGOUT_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

export const checkoutUpdateUser = (dataToSubmit) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`,
      },
    }
    const { data } = await axios.get('/auth/updatedetail', dataToSubmit, config)
    dispatch({
      type: AuthActionTypes.CHECKOUT_UPDATE_USER,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AuthActionTypes.AUTH_ERROR,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}

//   updatepassword

export const updatePassword = (dataToSubmit) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`,
      },
    }
    const { data } = await axios.put(
      '/auth/updatepassword',
      dataToSubmit,
      config
    )
    dispatch({
      type: AuthActionTypes.PASSWORD_UPDATE,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AuthActionTypes.PASSWORD_UPDATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    })
  }
}
