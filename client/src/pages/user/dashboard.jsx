import React from 'react'
import { useSelector } from 'react-redux'

const UserDashboard = () => {
  const name = useSelector(({ user }) => user.name)

  return (
    <div>
      <div className='dashboard_user'>
        <h1 className='heading-primary'>Welcome {name}</h1>
      </div>
    </div>
  )
}

export default UserDashboard
