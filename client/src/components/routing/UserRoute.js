import React from 'react'
import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from "react-redux";

const UserRoute = ({ component: Component, auth:{isAuthenticated,loading,isAdmin}, ...otherProps }) => (
    <Route {...otherProps} 
        render={ props => isAuthenticated && !loading && isAdmin !== 'admin' ? 
            (<Component {...props} />):(<Redirect to='/signin' />)
        }
    />
)
   
AdminRoute.propTypes = { 
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(UserRoute)
