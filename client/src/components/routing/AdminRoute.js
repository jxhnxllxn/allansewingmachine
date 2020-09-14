import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...otherProps }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const loading = useSelector(state => state.auth.loading);
    return(
        <Route {...otherProps} 
        render={ props => isAuthenticated && !loading && isAdmin ? 
                (<Component {...props} />):(<Redirect to='/signin' />)
        }
        />
    )
    
}

export default AdminRoute;
