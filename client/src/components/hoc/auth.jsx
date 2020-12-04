import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function (ComposedClass, reload, adminRoute) {
  const AuthenticationCheck = (props) => {
    const userLoginState = useSelector(({ userLogin }) => userLogin)
    const { isAdmin, isAuthenticated } = userLoginState

    useEffect(() => {
      if (!isAuthenticated) {
        if (reload === true) {
          props.history.push('/signin')
        }
      } else {
        if (adminRoute && !isAdmin) {
          props.history.push('/user/dashboard')
        } else {
          if (reload === false && isAdmin) {
            props.history.push('/admin')
          } else if (reload === false && !isAdmin) {
            props.history.push('/user/dashboard')
          }
        }
      }
      return () => {
        window.scrollTo(0, 0)
      }
    }, [isAuthenticated, isAdmin, props.history])

    return (
      <>
        <ComposedClass {...props} />
      </>
    )
  }
  return AuthenticationCheck
}
