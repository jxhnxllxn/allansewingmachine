import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, login } from '../redux/user/user-action'
import MyButton from '../components/button'
import FormField from '../components/form-field'
import { update, generateData, isFormValid } from '../utils/helper/form-action'
import Loading from '../components/loading'
import { Link } from 'react-router-dom'
import FormError from '../components/form-error'
const Login = () => {
  const dispatch = useDispatch()

  const userState = useSelector(({ user }) => user)
  const { error, loading } = userState

  const [formField, setFormField] = useState({
    formError: false,
    formSuccess: false,
    formData: {
      email: {
        element: 'input',
        value: '',
        showlabel: true,
        config: {
          label: 'Email',
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
          label: 'Password',
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password',
          autoComplete: 'on',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  })

  useEffect(() => {
    return () => {
      setFormField({})
      dispatch(clearError())
    }
    // eslint-disable-next-line
  }, [])

  const updateForm = (element) => {
    const newFormData = update(element, formField.formData, 'login')
    setFormField({
      formError: false,
      formData: newFormData,
    })
  }
  const submitForm = (e) => {
    e.preventDefault()
    let dataToSubmit = generateData(formField.formData, 'login')
    let formIsValid = isFormValid(formField.formData, 'login')
    // setErrors(true)

    if (formIsValid) {
      dispatch(login(dataToSubmit))
    } else {
      setFormField({ ...formField, formError: true })
    }
  }

  return (
    <div className='authWrapper'>
      <h1>Sign in</h1>
      <form onSubmit={(e) => submitForm(e)} className='card'>
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

        {loading ? (
          <Loading />
        ) : (
          <MyButton
            onClick={(e) => submitForm(e)}
            type='submit'
            title='Sign In'
            value='Submit'
          />
        )}

        <p>
          Don't have an account ? Register <Link to='/register'>here</Link>
        </p>
        {error && <FormError errMsg={error} />}
      </form>
      <div></div>
    </div>
  )
}

export default Login
