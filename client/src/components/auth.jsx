import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAdmin, selectIsAuth } from '../redux/auth/auth-selector';

export default function (ComposedClass, reload, adminRoute) {
    const AuthenticationCheck = (props) => {
        const isAdmin = useSelector(state => selectIsAdmin(state));
        const isAuthenticated = useSelector(state => selectIsAuth(state));
        const currentUser = useSelector(state => selectCurrentUser(state))

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
                <ComposedClass {...props} user={currentUser} />
            </>
        )
    }
    return AuthenticationCheck;
}
