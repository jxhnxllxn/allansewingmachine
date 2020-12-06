import React, { useState } from 'react'
import FormField from '../../components/form-field'
import {
  update,
  generateData,
  isFormValid,
  populateFields,
} from '../../utils/helper/form-action'
import { useEffect } from 'react'
import { updateUserProfile, updatePassword } from '../../redux/user/user-action'
import { useDispatch, useSelector } from 'react-redux'
import MyButton from '../../components/button'

const UpdatePersonalNfo = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(({ userDetails }) => userDetails.user)
  const [password, setPassword] = useState({
    formError: false,
    formErrorMessage: [],
    formSuccess: false,
    formData: {
      currentPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'current_Password_input',
          type: 'password',
          autoComplete: 'on',
          placeholder: 'Current password',
        },
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      newPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'new_password_input',
          type: 'password',
          autoComplete: 'on',
          placeholder: 'New password',
        },
        validation: {
          required: false,
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
          type: 'password',
          autoComplete: 'on',
          placeholder: 'Confirm new password',
        },
        validation: {
          required: false,
          confirm: 'newPassword',
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  })
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
          type: 'text',
          placeholder: 'Full name',
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
          type: 'text',
          placeholder: 'Contact No.',
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
          type: 'text',
          placeholder: 'Unit/House No.',
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
          type: 'text',
          placeholder: 'Street',
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
          type: 'text',
          placeholder: 'City',
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
          type: 'text',
          placeholder: 'State / Province',
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
          type: 'text',
          placeholder: 'Postal/Zip code',
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
          type: 'text',
          disabled: true,
          placeholder: 'Country',
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
          type: 'email',
          placeholder: 'Email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  })

  const updateForm = (element) => {
    const newFormdata = update(element, formField.formData, 'update_user')
    setFormField({
      ...formField,
      formError: false,
      formData: newFormdata,
    })
  }

  const updateFormPassword = (element) => {
    const newFormdata = update(
      element,
      password.formData,
      'update_user_password'
    )
    setPassword({
      ...password,
      formError: false,
      formData: newFormdata,
    })
  }

  const submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = generateData(formField.formData, 'update_user')
    let formIsValid = isFormValid(formField.formData, 'update_user')

    if (formIsValid) {
      dispatch(updateUserProfile(dataToSubmit))
      // .then((res) => {
      //   if (res.payload.success) {
      //     setFormField({
      //       ...formField,
      //       formSuccess: true,
      //     })
      //   }
      // })
      // .catch((err) => {
      //   setFormField({
      //     ...formField,
      //     formError: true,
      //     formErrorMessage: err.response.data.error,
      //   })
      // })
    } else {
      setFormField({
        ...formField,
        formError: true,
      })
    }
  }

  const submitFormPassword = (event) => {
    event.preventDefault()

    let dataToSubmit = generateData(password.formData, 'update_user_password')
    let formIsValid = isFormValid(password.formData, 'update_user_password')
    console.log(dataToSubmit)

    if (formIsValid) {
      dispatch(updatePassword(dataToSubmit))
        .then((res) => {
          if (res.payload.success) {
            setPassword({
              ...password,
              formSuccess: true,
            })
          }
        })
        .catch((err) => {
          setPassword({
            ...password,
            formError: true,
            formErrorMessage: err.response.data.error,
          })
        })
    } else {
      setPassword({
        ...password,
        formError: true,
      })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setFormField((f) => ({
        ...f,
        formSuccess: false,
      }))
    }, 2000)
  }, [formField.formSuccess])

  useEffect(() => {
    setTimeout(() => {
      setPassword((p) => ({
        ...p,
        formSuccess: false,
      }))
    }, 2000)
  }, [password.formSuccess])

  useEffect(() => {
    const user = {
      city: currentUser.address.city,
      country: currentUser.address.country,
      state: currentUser.address.state,
      street: currentUser.address.street,
      unit: currentUser.address.unit,
      zipcode: currentUser.address.zipcode,
      contact: currentUser.contact,
      email: currentUser.email,
      name: currentUser.name,
    }
    const newFormData = populateFields(formField.formData, user)
    setFormField({
      ...formField,
      formData: newFormData,
    })
    // eslint-disable-next-line
  }, [])

  return (
    <div className='profile_update'>
      <h2 className='heading-secondary'>update info</h2>
      <form onSubmit={(event) => submitForm(event)} className='form_block'>
        <h4>Info</h4>

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
        <MyButton type={'submit'} title={'Update profile'} />
      </form>

      <div className='form_message'>
        {formField.formSuccess ? (
          <div className='form_success'>Success</div>
        ) : null}
        {formField.formError ? (
          <div className='error_label'>{formField.formErrorMessage}</div>
        ) : null}
      </div>

      <form
        onSubmit={(event) => submitFormPassword(event)}
        className='form_block'
      >
        <h1 className='heading-secondary'>Update Password</h1>
        <div className='form_block'>
          <FormField
            id={'currentPassword'}
            formData={password.formData.currentPassword}
            change={(element) => updateFormPassword(element)}
          />
          <FormField
            id={'newPassword'}
            formData={password.formData.newPassword}
            change={(element) => updateFormPassword(element)}
          />
          <FormField
            id={'confirmPassword'}
            formData={password.formData.confirmPassword}
            change={(element) => updateFormPassword(element)}
          />
          <MyButton type={'submit'} title={'Update password'} />
        </div>
      </form>

      <div className='form_message'>
        {formField.formSuccess ? (
          <div className='form_success'>Success</div>
        ) : null}
        {formField.formError ? (
          <div className='error_label'>{formField.formErrorMessage}</div>
        ) : null}
      </div>

      <div>
        {password.formSuccess ? (
          <div className='form_success'>Success</div>
        ) : null}
        {password.formError ? (
          <div className='error_label'>{password.formErrorMessage}</div>
        ) : null}
      </div>
    </div>
  )
}
export default UpdatePersonalNfo
