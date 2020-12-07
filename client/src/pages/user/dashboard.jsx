import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MyButton from '../../components/button'
import UserHistoryBlock from '../../components/history-block'
import Loading from '../../components/loading'
import { getOrderHistory } from '../../redux/order/order-action'

const UserDashboard = () => {
  const dispatch = useDispatch()
  const userAuthState = useSelector(({ userAuth }) => userAuth)
  const { loading, name, email, contact, address } = userAuthState

  useEffect(() => {
    dispatch(getOrderHistory())
  }, [])

  return (
    <div>
      <div className='dashboard_user'>
        <h1 className='heading-secondary'>User information</h1>
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
