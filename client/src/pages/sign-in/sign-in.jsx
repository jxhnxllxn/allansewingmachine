import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import  PropTypes  from "prop-types";
import { login} from "../../redux/auth/auth-action";
import FormInput from "../../components/form-input/form-input";
import CustomButton from "../../components/custom-button/custom-button";
import Loading from "../../shared/loading/loading";
import './sign-in.scss';


    const SignIn = ({auth:{isAuthenticated,isAdmin,loading},login}) => {

        const [formData, setformData] = useState({
            email:'',
            password:'',
        });

        const {email,password} = formData;

        const onChange = e => setformData({...formData,[e.target.name]:e.target.value});

        const onSubmit = async e => {
            setformData({...formData,isLoading:true})
            e.preventDefault();
            login(email,password);

        }

        if(isAuthenticated && isAdmin === 'admin' && !loading){
            return <Redirect to={{pathname:"/admin"}}/>
        }
        if (isAuthenticated && isAdmin === 'user' && !loading) {
            return <Redirect to="/cart"/>
        }

        return (
            <div className="sign-in card">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={e => onSubmit(e)}>
                    <FormInput type="email" name="email" value={email} onChange={e => onChange(e)} label="email" required/>
                    <FormInput type="password" autoComplete={'autocomplete'} name="password" value={password} onChange={e => onChange(e)} label="password" required/>
                    {loading ? (<Loading />):(<CustomButton type="submit" buttonType="primary" value="Submit">Sign In</CustomButton>)}
                </form>

                <span className="signUp">Don't have account register <Link style={{textDecoration:'underline'}} to='/signup'>here</Link></span>
            </div>
        )
    }


SignIn.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{ login })(SignIn);
