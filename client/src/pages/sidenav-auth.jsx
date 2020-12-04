import React from 'react'
import { useSelector } from 'react-redux'
import SideNavSetting from '../components/sidenav-setting'
import SignIn from '../components/sidenav-sign-in'
import SignUp from '../components/sidenav-sign-up'

const AuthSideNav = () => {
  const isAuthenticated = useSelector(
    ({ userLogin }) => userLogin.isAuthenticated
  )

  return (
    <>
      {console.log(isAuthenticated)}
      {isAuthenticated ? (
        <SideNavSetting />
      ) : (
        <div className='signInOut'>
          <SignIn />
          <SignUp />
        </div>
      )}
    </>
  )
}

export default AuthSideNav
