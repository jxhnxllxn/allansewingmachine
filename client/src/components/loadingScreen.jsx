import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/user/user-action'
import Loading from './loading'

const LoadingScreen = ({ location }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      if (location && location.pathname === '/logout') {
        dispatch(logout())
      }
    }, 3000)

    // eslint-disable-next-line
  }, [])
  return (
    <div className='loading_screen'>
      <Loading />
    </div>
  )
}

export default LoadingScreen
