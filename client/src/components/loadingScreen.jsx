import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/user/user-action'

const LoadingScreen = ({ location, message }) => {
  const dispatch = useDispatch()
  const loading = useSelector(({ user }) => user.loading)
  useEffect(() => {
    if (location && location.pathname === '/logout') {
      dispatch(logout())
    }
  }, [])
  return (
    <div
      style={{
        backgroundColor: 'black',
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100vh',
        width: '100vw',
        zIndex: '99999',
      }}
    >
      <h1 className='heading-primary'>{message}</h1>
    </div>
  )
}

export default LoadingScreen
