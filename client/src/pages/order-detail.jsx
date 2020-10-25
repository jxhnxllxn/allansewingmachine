import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from "../redux/order/order-action";
import { clearCart } from '../redux/cart/cart-action';
import { update, generateData, resetFields } from '../components/custom/form-action';
import { selectCartItems, selectCartItemsCount, selectCartTotal } from '../redux/cart/cart-selectors';
import addComma from '../utils/helper/add-comma';

import Paypal from '../components/custom/paypal';
import MyButton from '../components/custom/button'
import FormField from '../components/custom/form-field'
import Modal from '../components/modal';
import { withRouter } from 'react-router-dom';
const OrderDetail = (props) => {
  const cartCount = useSelector(state => selectCartItemsCount(state))
  useEffect(() => {
    if (cartCount <= 0) {
      props.history.push('/user/dashboard')
    }
  }, [cartCount, props.history])
  const dispatch = useDispatch();
  const modalRef = useRef();
  const cartItems = useSelector(state => selectCartItems(state));
  const total = useSelector(state => selectCartTotal(state))
  const [formField, setFormField] = useState({
    formError: false,
    formErrorMessage: [],
    formSuccess: false,
    formData: {
      additionalInfo: {
        element: 'textarea',
        label: 'orders notes (optional)',
        value: '',
        config: {
          name: 'input_additional_Info',
          type: 'text',
        },
        validation: {
          required: false,
        },
        valid: true,
        touched: true,
        validationMessage: '',
        showlabel: true
      },
    }
  })


  const updateForm = (element) => {
    const newFormData = update(element, formField.formData, 'checkout');
    setFormField({
      ...formField,
      formError: false,
      formData: newFormData,
    })
  }

  const [orderDetail, setOrderDetail] = useState({
    orders: cartItems,
    total: total,
    shipping: 'flat_rate',
    paymentOptions: 'viaPaypal'
  })

  const handleOnChange = e => {
    setOrderDetail({
      ...orderDetail,
      [e.target.name]: e.target.value
    })
  }

  const addFee = () => {
    const t = orderDetail.shipping === "flat_rate" ? total + 200 : total;
    return t;
  }


  const openModal = () => {
    modalRef.current.openModal()
  }

  const closeModal = () => {
    modalRef.current.closeModal()

  }

  const resetFieldHandler = () => {
    openModal()
    const newFormData = resetFields(formField.formData, 'checkout')
    setFormField({
      formData: newFormData,
      formSuccess: true
    })

    setTimeout(() => {
      closeModal()
      dispatch(clearCart())
    }, 10000);
  }


  const submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(formField.formData, 'checkout');
    // let formIsValid = isFormValid(formField.formData,'checkout');
    let paymentId = {
      paymentID: ''
    }
    let data = {
      ...dataToSubmit,
      ...orderDetail
    }

    dispatch(addOrder({
      orderDetail: data,
      paymentData: paymentId
    }))
      .then(res => {
        if (res.payload.success) {
          resetFieldHandler()
        } else {
          setFormField({
            ...formField,
            formSuccess: false,
            formErrorMessage: res.payload.data
          })
        }
      })
  }

  const transactionError = (data) => {
    console.log(data)

  }
  const transactionCanceled = (data) => {
    console.log(data)

  }
  const transactionSuccess = (data) => {
    let dataToSubmit = generateData(formField.formData, 'checkout');

    dispatch(addOrder({
      orderDetail: dataToSubmit,
      paymentData: data
    }))
      .then(res => {
        if (res.payload.success) {
          resetFieldHandler();
        } else {
          setFormField({
            ...formField,
            formSuccess: false,
          })
        }
      })
      .catch(err => {
        setFormField({
          ...formField,
          formError: true,
          formErrorMessage: err.response.data.error
        })
      })

  }


  return (
    <form onSubmit={e => submitForm(e)}>
      <div className="additional_info card">
        <h3>Additional Information</h3>

        <FormField
          id={'additionalInfo'}
          formData={formField.formData.additionalInfo}
          change={(element) => updateForm(element)}
        />

      </div>
      <div className="payment_method card">
        <h3>Your order</h3>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(i => (
              <tr key={i._id}>
                <td>
                  {i.name} &times; {i.quantity}
                </td>
                <td>
                  Php {addComma(parseFloat(i.quantity * i.price).toFixed(2))}
                </td>
              </tr>
            ))}
            <tr>
              <td>subtotal</td>
              <td className='total-pr'>Php {addComma(total)}.00</td>
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
                      name='shipping'
                      id='flat_rate'
                      onChange={handleOnChange}
                      checked={orderDetail.shipping === 'flat_rate'}
                      value='flat_rate'
                    />
                  </li>
                  <li>
                    <label htmlFor='free_shipping'>Free Shipping</label>
                    <input
                      type='radio'
                      name='shipping'
                      id='free_shipping'
                      onChange={handleOnChange}
                      checked={orderDetail.shipping === 'free_shipping'}
                      value='free_shipping'
                    />
                  </li>
                  <li>
                    <label htmlFor='local_pickup'>Local Pickup</label>
                    <input
                      type='radio'
                      name='shipping'
                      id='local_pickup'
                      onChange={handleOnChange}
                      checked={orderDetail.shipping === 'local_pickup'}
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


        <h2 className='payment-header'>Payment method</h2>

        <ul className='payment-options'>
          <li>
            <input
              type='radio'
              name='paymentOptions'
              id='direct_bank_transfer'
              onChange={handleOnChange}
              checked={orderDetail.paymentOptions === 'direct_bank_transfer'}
              value='direct_bank_transfer'
            />
            <label htmlFor='direct_bank_transfer'>Direct bank transfer</label>
            <div className='po-box'>
              <p>
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </p>
            </div>
          </li>
          <li>
            <input
              type='radio'
              name='paymentOptions'
              id='check_payments'
              onChange={handleOnChange}
              checked={orderDetail.paymentOptions === 'check_payments'}
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
              name='paymentOptions'
              id='cash_on_delivery'
              onChange={handleOnChange}
              checked={orderDetail.paymentOptions === 'cash_on_delivery'}
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
              name='paymentOptions'
              id='viaPaypal'
              onChange={handleOnChange}
              checked={orderDetail.paymentOptions === 'viaPaypal'}
              value='viaPaypal'
            />
            <label htmlFor='viaPaypal'>Paypal</label>
            <div className='po-box'>
              <img
                src='https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg'
                alt='PayPal acceptance mark'
              />
              <p>
                Pay via PayPal; you can pay with your credit card if you don’t
                have a PayPal account.
              </p>
            </div>
          </li>
        </ul>

        <div className="agreement" style={{ marginBottom: '1rem' }}>
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

        
        {
          orderDetail.paymentOptions === 'viaPaypal' ?
            <Paypal
              toPay={addFee()}
              transactionError={(data) => transactionError(data)}
              transactionCanceled={(data) => transactionCanceled(data)}
              transactionSuccess={(data) => transactionSuccess(data)}
            />
            :
            <MyButton runAction={e => submitForm(e)} type="submit" title="Place order" value="Submit" />
        }
        
        {formField.formSuccess ?
          <div className="success_label">
            <h1>Successfull</h1>
          </div> : null
        }

        {formField.formError ?
          <div className="error_label">
            <h1>{formField.formErrorMessage}</h1>
          </div> : null
        }
      </div>


      <Modal ref={modalRef}>
        <h1>THANK YOU!</h1>
        <h1>YOUR ORDER IS NOW COMPLETE</h1>
      </Modal>

    </form>

  )
}

export default withRouter(OrderDetail)
