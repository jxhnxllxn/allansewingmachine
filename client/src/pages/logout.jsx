import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/user/user-action'
import Loading from '../components/loading'

const Logout = ({ location }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (location && location.pathname === '/logout') {
      dispatch(logout())
    }

    // eslint-disable-next-line
  }, [])
  return (
    <div className='loading_screen'>
      <Loading />
    </div>
  )
}

export default Logout
