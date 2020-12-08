import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function (ComposedClass, reload, adminRoute) {
  const AuthenticationCheck = (props) => {
    const userAuthState = useSelector(({ userAuth }) => userAuth)
    const { isAdmin, isAuthenticated } = userAuthState

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
        <ComposedClass {...props} {...userAuthState} />
      </>
    )
  }
  return AuthenticationCheck
}