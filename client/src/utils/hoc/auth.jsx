import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function authCheck(ComposedClass, reload, adminRoute) {
  const AuthenticationCheck = (props) => {
    const userState = useSelector(({ user }) => user)
    const { isAdmin, isAuthenticated } = userState

    useEffect(() => {
      if (!isAuthenticated) {
        if (reload === true) {
          props.history.push('/login')
        }
      } else {
        if (adminRoute && !isAdmin) {
          props.history.push('/user/dashboard')
        } else {
          if (reload === false && isAdmin) {
            props.history.push('/admin/dashboard')
          } else if (reload === false && !isAdmin) {
            props.history.push('/user/dashboard')
          }
        }
      }
    }, [isAuthenticated, isAdmin, props.history])

    return (
      <>
        <ComposedClass {...props} {...userState} />
      </>
    )
  }
  return AuthenticationCheck
}
