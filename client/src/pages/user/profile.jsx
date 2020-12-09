import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../components/loading'
import MyButton from '../../components/button'

const UserProfile = () => {
  const userState = useSelector(({ user }) => user)
  const { loading, name, email, contact, address } = userState
  return (
    <div className='user_profile'>
      <h1 className='heading-secondary'>Information</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className='dashboard_user__detail'>
          <div className='detail'>
            <label>Name:</label>
            <p>{name}</p>
          </div>
          <div className='detail'>
            <label>Email:</label>
            <p>{email}</p>
          </div>
          <div className='detail'>
            <label>Contact:</label>
            <p>{contact}</p>
          </div>
          <div className='detail'>
            <label>Address:</label>
            <p>
              {address.unit}, {address.street},{address.city},{address.state}
            </p>
          </div>
          <div className='action_button'>
            <MyButton
              type='default'
              title='Edit account info'
              linkTo='/user/profile/update'
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
