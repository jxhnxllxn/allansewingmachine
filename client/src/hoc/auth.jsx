import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from "../redux/auth/auth-action";
import Loading from '../components/loading/loading'

export default function(ComposedClass,reload){
    class AuthenticationCheck extends Component {

        state = {
            loading:true
        }

        componentDidMount(){
            this.props.dispatch(auth()).then(res => {
                    let user = this.props.user;
                    if(!user.isAuthenticated){
                        if(reload === true){
                            this.props.history.push('/signin')
                        }
                    }else{
                       if(user.isAdmin){
                            if(reload === false){
                                this.props.history.push('/admin')
                            }
                       }else{
                            if(reload === false){
                                this.props.history.push('/user/dashboard')
                            }
                       }
                    }
                    this.setState({loading:false})
                })
        }

        render(){
            if(this.state.loading){
                return(
                    <div className="main_loader">
                        <Loading />
                    </div>
                )
               
            }
            return (
                <ComposedClass {...this.props} user={this.props.user}/>
            )
        }
    }
    function mapStateToProps(state){
        return{
            user: state.auth
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck)
}

