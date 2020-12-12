import React, { useState } from 'react'
import {
  update,
  generateData,
  isFormValid,
  populateFields,
} from '../utils/helper/form-action'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { selectCartItems, selectCartTotal } from '../redux/cart/cart-selectors'

import addComma from '../utils/helper/add-comma'
import MyButton from '../components/button'
import FormField from '../components/form-field'
import Paypal from '../components/paypal'
import { addOrder } from '../redux/order/order-action'

const Checkout = ({ isAuthenticated }) => {
  const dispatch = useDispatch()
  const userState = useSelector(({ user }) => user)
  const cartItems = useSelector((state) => selectCartItems(state))
  const total = useSelector((state) => selectCartTotal(state))
  const { loading, error, address, contact, email, name } = userState

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
      additionalInfo: {
        element: 'textarea',
        label: 'orders notes (optional)',
        value: '',
        config: {
          name: 'input_additional_Info',
          placeholder: 'Additional Information / Special notes',
          type: 'text',
        },
        validation: {
          required: false,
        },
        valid: true,
        touched: true,
        validationMessage: '',
        showlabel: true,
      },
    },
  })

  useEffect(() => {
    console.log(cartItems)
    if (!loading && isAuthenticated) {
      const userData = {
        city: address.city,
        country: address.country,
        state: address.state,
        street: address.street,
        unit: address.unit,
        zipcode: address.zipcode,
        contact: contact,
        email: email,
        name: name,
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

  const submitForm = (e) => {
    e.preventDefault()
    let dataToSubmit = generateData(formField.formData, 'billing')
    let formIsValid = isFormValid(formField.formData, 'billing')
    console.log(dataToSubmit.zipcode)
    if (formIsValid) {
      console.log({
        name: dataToSubmit.name,
        contact: dataToSubmit.contact,
        additionalInfo: dataToSubmit.additionalInfo,
        shippingAddress: {
          unit: dataToSubmit.unit,
          street: dataToSubmit.street,
          city: dataToSubmit.city,
          state: dataToSubmit.state,
          country: dataToSubmit.country,
          zipcode: dataToSubmit.zipcode,
        },
        orderItems: cartItems,
        shippingMethod: orderOption.shippingOption,
        paymentMethod: orderOption.paymentOption,
        totalPrice: addFee(),
      })
      const finalDataToSubmit = {
        name: dataToSubmit.name,
        contact: dataToSubmit.contact,
        additionalInfo: dataToSubmit.additionalInfo,
        shippingAddress: {
          unit: dataToSubmit.unit,
          street: dataToSubmit.street,
          city: dataToSubmit.city,
          state: dataToSubmit.state,
          country: dataToSubmit.country,
          zipcode: dataToSubmit.zipcode,
        },
        orderItems: cartItems,
        shippingMethod: orderOption.shippingOption,
        paymentMethod: orderOption.paymentOption,
        totalPrice: addFee(),
      }
      dispatch(addOrder(finalDataToSubmit))
    } else {
      setFormField({ ...formField, formError: true })
    }
  }

  const [orderOption, setOrderOption] = useState({
    shippingOption: 'flat_rate',
    paymentOption: 'viaPaypal',
  })

  const handlerOrderOptions = (e) => {
    setOrderOption({
      ...orderOption,
      [e.target.name]: e.target.value,
    })
  }

  const addFee = () =>
    orderOption.shippingOption === 'flat_rate' ? total + 200 : total

  const transactionError = (data) => {
    console.log(data)
  }
  const transactionCanceled = (data) => {
    console.log(data)
  }
  const transactionSuccess = (data) => {
    let dataToSubmit = generateData(formField.formData, 'checkout')

    dispatch(
      addOrder({
        orderDetail: dataToSubmit,
        paymentData: data,
      })
    )
  }

  return (
    <div className='checkout_wrapper'>
      <h1 className='heading-primary'>Checkout</h1>
      <form onSubmit={(e) => submitForm(e)} className='checkout'>
        <div className='billing card'>
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
        </div>
        <div className='orderDetail_wrap'>
          <div className='additional_info card'>
            <h3>Additional Information</h3>

            <FormField
              id={'additionalInfo'}
              formData={formField.formData.additionalInfo}
              change={(element) => updateForm(element)}
            />
          </div>

          <div className='payment_method card'>
            <h3>Your order</h3>

            <table className='orderDetail'>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((i) => (
                  <tr key={i._id}>
                    <td>
                      {i.name} &times; {i.quantity}
                    </td>
                    <td>
                      <p>
                        Php
                        {addComma(parseFloat(i.quantity * i.price).toFixed(2))}
                      </p>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>subtotal</td>
                  <td>
                    <bdi>Php {addComma(total)}.00</bdi>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className='shipping'>
                  <th>Shipping</th>
                  <td>
                    <ul>
                      <li>
                        <label htmlFor='flat_rate'>Flat Rate: $10</label>
                        <input
                          type='radio'
                          name='shippingOption'
                          id='flat_rate'
                          onChange={handlerOrderOptions}
                          checked={orderOption.shippingOption === 'flat_rate'}
                          value='flat_rate'
                        />
                      </li>
                      <li>
                        <label htmlFor='free_shipping'>Free Shipping</label>
                        <input
                          type='radio'
                          name='shippingOption'
                          id='free_shipping'
                          onChange={handlerOrderOptions}
                          checked={
                            orderOption.shippingOption === 'free_shipping'
                          }
                          value='free_shipping'
                        />
                      </li>
                      <li>
                        <label htmlFor='local_pickup'>Local Pickup</label>
                        <input
                          type='radio'
                          name='shippingOption'
                          id='local_pickup'
                          onChange={handlerOrderOptions}
                          checked={
                            orderOption.shippingOption === 'local_pickup'
                          }
                          value='local_pickup'
                        />
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>total</td>
                  <td>
                    <bdi>Php {addComma(addFee())}.00</bdi>
                  </td>
                </tr>
              </tfoot>
            </table>

            <h3 className='payment-header'>Payment method</h3>

            <ul className='payment-options'>
              <li>
                <input
                  type='radio'
                  name='paymentOption'
                  id='direct_bank_transfer'
                  onChange={handlerOrderOptions}
                  checked={orderOption.paymentOption === 'direct_bank_transfer'}
                  value='direct_bank_transfer'
                />
                <label htmlFor='direct_bank_transfer'>
                  Direct bank transfer
                </label>
                <div className='po-box'>
                  <p>
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account.
                  </p>
                </div>
              </li>
              <li>
                <input
                  type='radio'
                  name='paymentOption'
                  id='check_payments'
                  onChange={handlerOrderOptions}
                  checked={orderOption.paymentOption === 'check_payments'}
                  value='check_payments'
                />
                <label htmlFor='check_payments'>Check Payments</label>
                <div className='po-box'>
                  <p>
                    Please send a check to Store Name, Store Street, Store Town,
                    Store State / County, Store Postcode.
                  </p>
                </div>
              </li>
              <li>
                <input
                  type='radio'
                  name='paymentOption'
                  id='cash_on_delivery'
                  onChange={handlerOrderOptions}
                  checked={orderOption.paymentOption === 'cash_on_delivery'}
                  value='cash_on_delivery'
                />
                <label htmlFor=''>Cash on delivery</label>
                <div className='po-box'>
                  <p>Pay with cash upon delivery.</p>
                </div>
              </li>
              <li>
                <input
                  type='radio'
                  name='paymentOption'
                  id='viaPaypal'
                  onChange={handlerOrderOptions}
                  checked={orderOption.paymentOption === 'viaPaypal'}
                  value='viaPaypal'
                />
                <label htmlFor='viaPaypal'>Paypal</label>
                <div className='po-box'>
                  <img
                    src='https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg'
                    alt='PayPal acceptance mark'
                  />
                  <p>
                    Pay via PayPal; you can pay with your credit card if you
                    don’t have a PayPal account.
                  </p>
                </div>
              </li>
            </ul>

            <div className='agreement' style={{ marginBottom: '1rem' }}>
              <input
                id='agreement'
                type='checkbox'
                name='agreement'
                //   checked={userAgreed}
                //   onChange={() => setUserAgreed(!userAgreed)}
              />

              <label htmlFor='agreement'>
                I have read and agree to the webiste terms and conditions *
              </label>
            </div>

            {orderOption.paymentOption === 'viaPaypal' ? (
              <Paypal
                toPay={addFee()}
                transactionError={(data) => transactionError(data)}
                transactionCanceled={(data) => transactionCanceled(data)}
                transactionSuccess={(data) => transactionSuccess(data)}
              />
            ) : (
              <MyButton
                runAction={(e) => submitForm(e)}
                type='submit'
                title='Place order'
                value='Submit'
              />
            )}

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
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout
