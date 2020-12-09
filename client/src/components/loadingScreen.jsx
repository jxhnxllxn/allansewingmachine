import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/user/user-action'

const LoadingScreen = ({ loading, location }) => {
  const dispatch = useDispatch()
  const loadingScreenActive = useSelector(({ ui }) => ui.loadingScreenActive)
  useEffect(() => {
    if (location.pathname === '/logout') {
      dispatch(logout())
    }
  }, [])
  return (
    <div>
      <h1 className='heading-primary'>Loading</h1>
    </div>
  )
}

export default LoadingScreen
