import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MyButton from '../../components/button'
import Loading from '../../components/loading'

const UserDashboard = () => {
  const userState = useSelector(({ user }) => user)
  const { loading, name, email, contact, address } = userState

  return (
    <div>
      <div className='dashboard_user'>
        <h1 className='heading-primary'>Welcome {name}</h1>
      </div>
    </div>
  )
}

export default UserDashboard
