import React from 'react'
import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from "react-redux";

const AdminRoute = ({ component: Component, auth:{isAuthenticated,loading,isAdmin}, ...otherProps }) => (
    <Route {...otherProps} 
        render={ props => !isAuthenticated && !loading ? 
                (<Redirect to='/signin' />):(<Component {...props} />)
        }
    />
)
   
AdminRoute.propTypes = { 
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(AdminRoute)
