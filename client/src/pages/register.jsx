import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, register } from '../redux/user/user-action'
import MyButton from '../components/button'
import FormField from '../components/form-field'
import { update, generateData, isFormValid } from '../utils/helper/form-action'
import Loading from '../components/loading'

const SignUp = () => {
  const dispatch = useDispatch()
  const userState = useSelector(({ user }) => user)
  const { error, loading } = userState
  const [formField, setFormField] = useState({
    formError: false,
    formSuccess: '',
    formData: {
      name: {
        element: 'input',
        value: '',
        showlabel: true,
        config: {
          label: 'Name:',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      email: {
        element: 'input',
        value: '',
        showlabel: true,
        config: {
          label: 'Email:',
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      password: {
        element: 'input',
        value: '',
        showlabel: true,
        config: {
          label: 'Password:',
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      confirmPassword: {
        element: 'input',
        value: '',
        showlabel: true,
        config: {
          label: 'Confirm password:',
          name: 'confirm_password_input',
          type: 'password',
          placeholder: 'Confirm your password',
        },
        validation: {
          required: true,
          confirm: 'password',
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  })

  const updateForm = (element) => {
    const newFormData = update(element, formField.formData, 'register')
    setFormField({
      formError: false,
      formData: newFormData,
    })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    let dataToSubmit = generateData(formField.formData, 'register')
    let formIsValid = isFormValid(formField.formData, 'register')

    if (formIsValid) {
      dispatch(register(dataToSubmit))
    } else {
      setFormField({ ...formField, formError: true })
    }
  }

  useEffect(() => {
    return () => {
      setFormField({})
      dispatch(clearError())
    }
  }, [])

  return (
    <div className='authWrapper'>
      <h1 className='heading-primary'>Sign Up</h1>

      <form onSubmit={(e) => submitForm(e)} className='card'>
        <FormField
          id={'name'}
          formData={formField.formData.name}
          change={(element) => updateForm(element)}
        />
        <FormField
          id={'email'}
          formData={formField.formData.email}
          change={(element) => updateForm(element)}
        />
        <FormField
          id={'password'}
          formData={formField.formData.password}
          change={(element) => updateForm(element)}
        />
        <FormField
          id={'confirmPassword'}
          formData={formField.formData.confirmPassword}
          change={(element) => updateForm(element)}
        />
        {loading ? (
          <Loading />
        ) : (
          <MyButton
            runAction={(e) => submitForm(e)}
            type='submit'
            title='Sign Up'
            value='Submit'
            disabled={formField.formError}
          />
        )}
        {console.log(formField.formError)}
        <p>
          Owned an account ? Login <Link to='/login'>here</Link>
        </p>
        {error ? (
          <div className='form_error'>
            <h2>ERROR !</h2>
            <span>{error}</span>
          </div>
        ) : null}
      </form>
    </div>
  )
}

export default SignUp
