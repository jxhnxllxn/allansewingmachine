import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCreateUser, checkoutUpdateUser } from "../../../../redux/auth/auth-action";
import {selectIsAuth,selectCurrentUser} from '../../../../redux/auth/auth-selector'
import {update,generateData,isFormValid,resetFields} from '../../../../components/utils/form-action/form-action';
import MyButton from '../../../../components/utils/button/button'
import FormField from '../../../../components/utils/form-field/form-field'

const BillingShipping = () => {
    
    const currentUser = useSelector(state => selectCurrentUser(state));
    const isAuthenticated = useSelector(state => selectIsAuth(state));
    const dispatch = useDispatch();
    const [formField, setFormField] = useState({
        formError: false,
        formErrorMessage:[],
        formSuccess:false,
        formData:{
            name:{
                element:'input',
                label:'Full Name',
                value: isAuthenticated ? currentUser.name : '',
                config:{
                    name:'name_input',
                    type:'text',
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            contact:{
                element:'input',
                label:'Contact No.',
                value:isAuthenticated ? currentUser.contact : '',
                config:{
                    name:'contact_input',
                    type:'text',
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            unit:{
                element:'input',
                label:'Unit/House no.',
                value:isAuthenticated ? currentUser.address.unit : '',
                config:{
                    name:'unit_input',
                    type:'text',
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            street:{
                element:'input',
                label:'Street',
                value:isAuthenticated ? currentUser.address.street : '',
                config:{
                    name:'street_input',
                    type:'text',
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            city:{
                element:'input',
                label:'City',
                value:isAuthenticated ? currentUser.address.city : '',
                config:{
                    name:'city_input',
                    type:'text',
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            state:{
                element:'input',
                label:'State / Province',
                value:isAuthenticated ? currentUser.address.state : '',
                config:{
                    name:'state_input',
                    type:'text',
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            zipcode:{
                element:'input',
                label:'Postal/Zip code',
                value:isAuthenticated ? currentUser.address.zipcode : '',
                config:{
                    name:'zipcode_input',
                    type:'text',
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            country:{
                element:'input',
                label:'Country',
                value: 'Philippines only',
                config:{
                    name:'country_input',
                    type:'text',
                    disabled:true,
                },
                valid:true,
                touched:true,
                validationMessage:''
            },
            email:{
                element:'input',
                label:'Email',
                value:isAuthenticated ? currentUser.email : '',
                config:{
                    name:'email_input',
                    type:'email',
                },
                validation:{
                    required:true,
                    email:true,
                },
                valid:isAuthenticated,
                touched:isAuthenticated,
                validationMessage:''
            },
            password:{
                element:'input',
                label:'Password',
                value:'1',
                config:{
                    name:'password_input',
                    type:'password',
                },
                validation:{
                    required:!isAuthenticated,
                },
                valid:isAuthenticated,
                touched:isAuthenticated,
                validationMessage:''
            },
            confirmPassword:{
                element:'input',
                label:'Confirm password',
                value:'1',
                config:{
                    name:'confirm_password_input',
                    type:'password',
                },
                validation:{
                    required:!isAuthenticated,
                    confirm: 'password'
                },
                valid:isAuthenticated,
                touched:isAuthenticated,
                validationMessage:''
            },
        }
    })

    const updateForm = (element) => {
        const newFormData = update(element,formField.formData,'billing');
        setFormField({
            ...formField,
            formError:false,
            formData: newFormData,
        })
    }

    const resetFieldHandler = () => {
        const newFormData = resetFields(formField.formData,'billing')
        setFormField({
            formData:newFormData,
            formSuccess:true
        });
        setTimeout(()=>{
            setFormField({
                ...formField,
                formSuccess:true
            })
        },3000)
    }

    const submitForm = e => {
        e.preventDefault();
        let dataToSubmit = generateData(formField.formData,'billing');
        let formIsValid = isFormValid(formField.formData,'billing');
        console.log(formIsValid)
        // setErrors(true)

        if(formIsValid){
            if(isAuthenticated){
                dispatch(checkoutUpdateUser(dataToSubmit)).then(res =>{ 
                  if(res.payload.success){
                    setFormField({
                        ...formField,
                        formSuccess:true
                    });
                  }else{
                    setFormField({
                        ...formField,
                        formError:true,
                        formErrorMessage:res.payload.error
                    })
                  }
                }).catch(err => console.log(err.error))
            }else{
                dispatch(checkoutCreateUser(dataToSubmit)).then(res =>{
                  if(res.payload.success){
                    setFormField({
                        ...formField,
                        formSuccess:true,
                        formErrorMessage:res.payload.error
                    });
                  }else{
                    setFormField({
                        ...formField,
                        formError:true
                    })
                  }
                }).catch(err => console.log(err.error))
            }
        }else{
            console.log(dataToSubmit,'failed')
            setFormField({...formField,formError:true})
        }
    }


    return (
        <form onSubmit={e => submitForm(e)} className="billing card">
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
                    {
                        !isAuthenticated ?    
                            <Fragment>
                            
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
                            </Fragment>
                        :null
                    }
                    
                    
                    <MyButton runAction={e => submitForm(e)} type="submit" title={isAuthenticated ? "Update detail":"Create account"} value="Submit" />

                    {formField.formError ?
                        <div className="error_label">
                            {console.log(formField.formErrorMessage)}
                        </div> : null
                    }
            
            </form>
    )
}

export default BillingShipping
