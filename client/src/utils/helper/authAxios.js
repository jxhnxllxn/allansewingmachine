import axios from 'axios'

import store from '../../redux/store'
import { getUserDetails } from '../../redux/user/user-action'

const authAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: '/api',
})

authAxios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${JSON.parse(
      localStorage.getItem('access_token')
    )}`

    return config
  },
  (err) => Promise.reject(err)
)

authAxios.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalRequest = err.config

    if (err.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true

      await store.dispatch(getUserDetails())
      return authAxios(originalRequest)
    }

    return Promise.reject(err)
  }
)

export default authAxios
