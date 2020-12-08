import axios from 'axios'
import { AuthActionTypes } from './user-constants'

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

    localStorage.setItem('userInfo', JSON.stringify(data))
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

    localStorage.setItem('userInfo', JSON.stringify(data))
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

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AuthActionTypes.USER_REQUEST,
    })

    const {
      userAuth: { token },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get('/user/profile', config)

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
      type: AuthActionTypes.USER_FAIL,
      payload: message,
    })
  }
}

export const updateUserProfile = (dataToSubmit) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: AuthActionTypes.USER_REQUEST,
    })

    const {
      userAuth: { token },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.put('/user/profile', dataToSubmit, config)
    dispatch({
      type: AuthActionTypes.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
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

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AuthActionTypes.USER_REQUEST,
    })

    const {
      userAuth: { token },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`/user`, config)

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

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AuthActionTypes.USER_REQUEST,
    })

    const {
      userAuth: { token },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    await axios.delete(`/users/${id}`, config)

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
  localStorage.removeItem('userInfo')
  dispatch({ type: AuthActionTypes.USER_LOGOUT })
  dispatch({ type: AuthActionTypes.USER_DETAILS_RESET })
  // dispatch({ type: AuthActionTypes.ORDER_LIST_MY_RESET })
  // dispatch({ type: AuthActionTypes.USER_LIST_RESET })
}

//   updatepassword

export const updatePassword = (dataToSubmit) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AuthActionTypes.USER_REQUEST,
    })

    const {
      userAuth: { token },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.put('/user/password', dataToSubmit, config)
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
