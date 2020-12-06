import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../redux/user/user-action'
import MyButton from '../../components/button'
import UserHistoryBlock from '../../components/history-block'
import Loading from '../../components/loading'

const UserDashboard = () => {
  const dispatch = useDispatch()
  const userDetailsState = useSelector(({ userDetails }) => userDetails)
  const { loading, user } = userDetailsState

  useEffect(() => {
    dispatch(getUserDetails())
  }, [])

  return (
    <div>
      {console.log(userDetailsState)}
      <div className='dashboard_user'>
        <h1 className='heading-secondary'>User information</h1>
        {loading ? (
          <Loading />
        ) : (
          <div className='dashboard_user__detail'>
            <div className='detail'>
              <label>Name:</label>
              <span>{user.name}</span>
            </div>
            <div className='detail'>
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className='detail'>
              <label>Contact:</label>
              <span>{user.contact}</span>
            </div>
            <div className='detail'>
              <label>Address:</label>
              <span>
                {user.address.unit}, {user.address.street}, {user.address.city},
                {user.address.state}
              </span>
            </div>
            <div className='action_button'>
              <MyButton
                type='default'
                title='Edit account info'
                linkTo='/user/profile-update'
              />
            </div>
          </div>
        )}
      </div>

      <div className='user_nfo_panel'>
        <h1 className='heading-secondary'>History purchases</h1>
        <div className='user_product_block_wrapper'>
          <UserHistoryBlock />
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
