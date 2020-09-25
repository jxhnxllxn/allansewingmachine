import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from "../../../../redux/order/order-action";
import {update,generateData} from '../../../../components/utils/form-action/form-action';
import Paypal from '../../../../components/utils/paypal/paypal';
import MyButton from '../../../../components/utils/button/button'
import FormField from '../../../../components/utils/form-field/form-field'
import BillingShipping from './billing-shipping'
import './checkout.scss'
import { selectCartItems, selectCartTotal } from '../../../../redux/cart/cart-selectors';
import addComma from '../../../../components/utils/add-comma';

const Checkout = () => {
  const cartItems = useSelector(state => selectCartItems(state));
  const total = useSelector(state => selectCartTotal(state))
    const dispatch = useDispatch();

    const [formField, setFormField] = useState({
        formError: false,
        formSuccess:false,
        formData:{  
                orders:{
                  value:cartItems,
                },
                additionalInfo:{
                  element:'textarea',
                  label:'orders notes (optional)',
                  value:'',
                  config:{
                      name:'input_additional_Info',
                      type:'text',
                  },
                  validation:{
                    required:false,
                  },
                  valid:true,
                  touched:true,
                  validationMessage:'',
                  showlabel:true  
                },
                shipping:{
                  element:'radio',
                  value:'',
                  config:{
                      name:'shipping',
                      type:'radio',
                      radios:[
                        {key:'1',value:'flat_rate',label:'Flat Rate Php 200.00'},
                        {key:'2',value:'free_shipping', label:'Free Shipping'},
                        {key:'3',value:'local_pickup',label:'Local Pickup'},
                      ]
                  }
                },
                paymentOptions:{
                  element:'radio',
                  value:'',
                  config:{
                      name:'paymentOptions',
                      type:'radio',
                      radios:[
                        {key:'1',value:'direct_bank_transfer',label:'Direct bank tranfer'},
                        {key:'2',value:'check_payments',label:'Check payments'},
                        {key:'3',value:'cash_on_delivery',label:'Cash on delivery'},
                        {key:'4',value:'paypal',label:'Paypal'}
                      ]
                  }
                },
                total:{
                  value:total
                },
        }
    })

    const updateForm = (element) => {
        const newFormData = update(element,formField.formData,'checkout');
        setFormField({
            ...formField,
            formError:false,
            formData: newFormData,
        })
    }

    
    const addFee = () => {
      const t = formField.formData.shipping.value === "flat_rate" ? total + 200 : total;
      return t;
    }

    // const resetFieldHandler = () => {
    //     const newFormData = resetFields(formField.formData,'product')
    //     setFormField({
    //         formData:newFormData,
    //         formSuccess:true
    //     });
    //     setTimeout(()=>{
    //         setFormField({
    //             ...formField,
    //             formSuccess:true
    //         })
    //     },3000)
    // }

    const submitForm = e => {
        e.preventDefault();
        let dataToSubmit = generateData(formField.formData,'checkout');
        // let formIsValid = isFormValid(formField.formData,'checkout');
      
        console.log(dataToSubmit)
        // dispatch(addOrder(dataToSubmit)).then(res => {
        //   console.log(res)
        // })   
        
    }

    const shippingDetail = () => {
      switch (formField.formData.paymentOptions.value) {
        case('direct_bank_transfer'):
          return (
            <div className='po-box'>
              <p>
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </p>
            </div>
          )
        case('check_payments'):
          return (
            <div className='po-box'>
              <p>
                Please send a check to Store Name, Store Street, Store Town,
                Store State / County, Store Postcode.
              </p>
            </div>
          )
        case('cash_on_delivery'):
          return (
            <div className='po-box'>
              <p>Pay with cash upon delivery.</p>
            </div>

          )
        case('paypal'):
          return (
            <div className='po-box'>
              <img
                src='https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg'
                alt='PayPal acceptance mark'
              />
              <p>
                Pay via PayPal you can pay with your credit card if you don’t
                have a PayPal account.
              </p>
            </div>
          )
        default: return null
      }
    }

    const transactionError = (data) => {
      console.log(data)

    }
    const transactionCanceled = (data) => {
      console.log(data)

    }
    const transactionSuccess = (data) => {
      let dataToSubmit = generateData(formField.formData,'checkout');
      // let formIsValid = isFormValid(formField.formData,'checkout');
     
      // console.log(dataToSubmit);
      dispatch(addOrder({
        orderDetail: dataToSubmit,
        paymentData: data
      })).then(res => {
        if(res.payload.success){
          setFormField({
            ...formField,
            formSuccess:true,
          })
        }else{
          setFormField({
            ...formField,
            formSuccess:false,
          })
        }
      })
      
    }

    return (
      <div className="checkout_wrapper">
      
      <BillingShipping />

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
                  <FormField
                      id={'shipping'}
                      formData={formField.formData.shipping}
                      change={(element) => updateForm(element)}
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

        <ul className='payment-options'>
              <h3>Payment method</h3>
          <li>
              <FormField
                  id={'paymentOptions'}
                  formData={formField.formData.paymentOptions}
                  change={(element) => updateForm(element)}
                  addStyle={{
                    display:'flex',
                    flexDirection: 'row-reverse',
                    alignItems:'center',
                    justifyContent: 'flex-end',
                  }}
                />
                {
                  shippingDetail()
                }

          </li>
        </ul>

      <div className="agreement" style={{marginBottom:'1rem'}}>
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
          formField.formData.paymentOptions.value === 'paypal' ? 
          <Paypal
            toPay={addFee()}
            transactionError={(data)=>transactionError(data)}
            transactionCanceled={(data)=>transactionCanceled(data)}
            transactionSuccess={(data)=>transactionSuccess(data)}
          />
          :
          <MyButton runAction={e => submitForm(e)} type="submit" title="Place order" value="Submit" />          
        }
        

        </div>

        {formField.formError ?
          <div className="error_label">
              Please check your data
          </div> : null
        }

        </form>

        </div>
    )
}

export default Checkout
