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
    <div
      style={{
        backgroundColor: '#ffffff',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: '99999',
        opacity: '0.8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Loading />
    </div>
  )
}

export default LoadingScreen
