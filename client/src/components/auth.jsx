import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAdmin, selectIsAuth } from '../redux/auth/auth-selector';
import Loading from "./loading";

export default function (ComposedClass, reload, adminRoute) {


    const AuthenticationCheck = (props) => {
        const isAdmin = useSelector(state => selectIsAdmin(state));
        const isAuthenticated = useSelector(state => selectIsAuth(state));
        const currentUser = useSelector(state => selectCurrentUser(state))

        const [state, setState] = useState({
            loading: true,
        });

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
            setState({ loading: false })
        }, [isAuthenticated, isAdmin, props.history])


        return (
            <Fragment>
                {state.loading ?
                    <div className="main_loader">
                        <Loading />
                    </div>
                    :
                    <ComposedClass {...props} user={currentUser} />
                }
            </Fragment>
        )
    }
    return AuthenticationCheck;
}
