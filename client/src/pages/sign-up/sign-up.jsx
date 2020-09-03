import React, { Fragment, useState } from 'react';
import { connect } from "react-redux";
import FormInput from '../../components/form-input/form-input';
import CustomButton from '../../components/custom-button/custom-button';

import { setAlert } from "../../redux/alert/alert-action";
import { register } from "../../redux/auth/auth-action";
import PropTypes from 'prop-types'

import './sign-up.scss';
import { Redirect, Link } from 'react-router-dom';


  const SignUp = ({auth:{isAuthenticated,loading,isAdmin},setAlert,register}) => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword:''
  });
  const { name, email, password, confirmPassword } = formData;
  const onChange = e => setformData({...formData,[e.target.name]:e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    if(password !== confirmPassword){
      setAlert('password not match', 'danger')
    }else{
      register({name,email,password});
  }
  }

  if(isAuthenticated && isAdmin === 'admin' && !loading){
    return <Redirect to="/admin"/>
  }
  if (isAuthenticated && isAdmin === 'user' && !loading) {
      return <Redirect to="/cart"/>
  }

  return (
    <Fragment>
      <div className='sign-up card'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={e => onSubmit(e)}>
          <FormInput
            type='text'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            label='Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            label='Password'
            required
            autoComplete={'autocomplete'}
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={e => onChange(e)}
            label='Confirm Password'
            required
            autoComplete={'autocomplete'}
          />
          <CustomButton type='submit'>Sign Up</CustomButton>
        </form>
        
        <span className="signIn">Already have an account sign in <Link style={{textDecoration:'underline'}} to='/signin'>here</Link></span>
      </div>
    </Fragment>
  )
}

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{setAlert,register})(SignUp);
