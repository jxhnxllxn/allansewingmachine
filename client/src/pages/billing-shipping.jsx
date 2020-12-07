import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, updateUserProfile } from '../redux/user/user-action'
import {
  update,
  generateData,
  isFormValid,
  populateFields,
} from '../utils/helper/form-action'
import MyButton from '../components/button'
import FormField from '../components/form-field'

const BillingShipping = ({ isAuthenticated }) => {
  const userState = useSelector(({ user }) => user)
  const { userDetail, loading, error } = userState

  const dispatch = useDispatch()
  const [formField, setFormField] = useState({
    formError: false,
    formErrorMessage: [],
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          placeholder: 'Name',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      contact: {
        element: 'input',
        value: '',
        config: {
          name: 'contact_input',
          placeholder: 'Contact no',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      unit: {
        element: 'input',
        value: '',
        config: {
          name: 'unit_input',
          placeholder: 'Unit/House no:',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      street: {
        element: 'input',
        value: '',
        config: {
          name: 'street_input',
          placeholder: 'Street',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      city: {
        element: 'input',
        value: '',
        config: {
          name: 'city_input',
          placeholder: 'City',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      state: {
        element: 'input',
        value: '',
        config: {
          name: 'state_input',
          placeholder: 'State / Province',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      zipcode: {
        element: 'input',
        value: '',
        config: {
          name: 'zipcode_input',
          placeholder: 'Postal/Zip code',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      country: {
        element: 'input',
        value: 'Philippines',
        config: {
          name: 'country_input',
          placeholder: 'Country',
          type: 'text',
          disabled: true,
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
        config: {
          name: 'email_input',
          placeholder: 'Email',
          type: 'email',
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
        config: {
          name: 'password_input',
          placeholder: 'Password',
          type: 'password',
          autoComplete: 'on',
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
        config: {
          name: 'confirm_password_input',
          placeholder: 'Confirm password',
          type: 'password',
          autoComplete: 'on',
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

  useEffect(() => {
    if (isAuthenticated && !loading) {
      const userData = {
        city: userDetail.address.city,
        country: userDetail.address.country,
        state: userDetail.address.state,
        street: userDetail.address.street,
        unit: userDetail.address.unit,
        zipcode: userDetail.address.zipcode,
        contact: userDetail.contact,
        email: userDetail.email,
        name: userDetail.name,
      }
      const newFormData = populateFields(formField.formData, userData)
      setFormField({
        ...formField,
        formData: newFormData,
      })
    }
    // eslint-disable-next-line
  }, [])

  const updateForm = (element) => {
    const newFormData = update(element, formField.formData, 'billing')
    setFormField({
      ...formField,
      formError: false,
      formData: newFormData,
    })
  }

  // const resetFieldHandler = () => {
  //     const newFormData = resetFields(formField.formData, 'billing')
  //     setFormField({
  //         formData: newFormData,
  //         formSuccess: true
  //     });
  //     setTimeout(() => {
  //         setFormField({
  //             ...formField,
  //             formSuccess: true
  //         })
  //     }, 5000)
  // }

  const submitForm = (e) => {
    e.preventDefault()
    let dataToSubmit = generateData(formField.formData, 'billing')
    let formIsValid = isFormValid(formField.formData, 'billing')
    if (formIsValid) {
      if (isAuthenticated) {
        dispatch(updateUserProfile(dataToSubmit)).then((res) => {
          if (res.payload.success) {
            setFormField({
              ...formField,
              formSuccess: true,
            })

            setTimeout(() => {
              setFormField({
                ...formField,
                formSuccess: false,
              })
            }, 5000)
          } else {
            setFormField({
              ...formField,
              formError: true,
              formErrorMessage: res.payload.error,
            })
          }
        })

        // .catch((err) => {
        //   setFormField({
        //     ...formField,
        //     formError: true,
        //     formErrorMessage: err.response.data.error,
        //   })
        // })
      } else {
        dispatch(register(dataToSubmit))
          .then((res) => {
            if (res.payload.success) {
              setFormField({
                ...formField,
                formSuccess: true,
              })

              setTimeout(() => {
                setFormField({
                  ...formField,
                  formSuccess: false,
                })
              }, 5000)
            } else {
              setFormField({
                ...formField,
                formError: true,
                formErrorMessage: res.payload.error,
              })
            }
          })

          .catch((err) => {
            setFormField({
              ...formField,
              formError: true,
              formErrorMessage: err.response.data.error,
            })
          })
      }
    } else {
      setFormField({ ...formField, formError: true })
    }
  }

  return (
    <div className='billing'>
      <h1 className='heading-primary'>Checkout</h1>
      <form onSubmit={(e) => submitForm(e)} className='card'>
        <h3>Billing and Shipping</h3>
        <FormField
          id={'name'}
          formData={formField.formData.name}
          change={(element) => updateForm(element)}
        />
        <FormField
          id={'contact'}
          formData={formField.formData.contact}
          change={(element) => updateForm(element)}
        />
        <h4>Address</h4>
        <FormField
          id={'country'}
          formData={formField.formData.country}
          change={(element) => updateForm(element)}
        />
        <FormField
          id={'unit'}
          formData={formField.formData.unit}
          change={(element) => updateForm(element)}
        />
        <FormField
          id={'street'}
          formData={formField.formData.street}
          change={(element) => updateForm(element)}
        />
        <FormField
          id={'city'}
          formData={formField.formData.city}
          change={(element) => updateForm(element)}
        />
        <FormField
          id={'state'}
          formData={formField.formData.state}
          change={(element) => updateForm(element)}
        />
        <FormField
          id={'zipcode'}
          formData={formField.formData.zipcode}
          change={(element) => updateForm(element)}
        />
        {!isAuthenticated ? (
          <>
            <h4>Create Account</h4>
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
          </>
        ) : null}

        <MyButton
          runAction={(e) => submitForm(e)}
          type='submit'
          title={isAuthenticated ? 'Update detail' : 'Create account'}
          value='Submit'
        />

        {formField.formSuccess ? (
          <div className='success_label'>
            <h1>Successfull</h1>
          </div>
        ) : null}

        {formField.formError ? (
          <div className='error_label'>
            <h1>{formField.formErrorMessage}</h1>
          </div>
        ) : null}
      </form>
    </div>
  )
}

export default BillingShipping
