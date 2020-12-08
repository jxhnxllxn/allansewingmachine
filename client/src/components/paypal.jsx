import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './loading'

const Paypal = (props) => {
  const dispatch = useDispatch()
  const [sdkReady, setSdkReady] = useState(false)
  const [currency, setcurrency] = useState('')
  const paypalConfigState = useSelector(({ paypalConfig }) => paypalConfig)

  const addPayPalScript = async () => {
    const { data } = await Axios.get('/config/paypal')
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${data.clientId}`
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if (!window.paypal) {
      addPayPalScript()
    } else {
      setSdkReady(true)
    }
  }, [])

  return (
    <>
      {sdkReady ? (
        <PayPalButton
          amount={props.toPay}
          currency={currency}
          onSuccess={(details, data) => {
            alert('Transaction completed by ' + details.payer.name.given_name)
            return fetch('/paypal-transaction-complete', {
              method: 'post',
              body: JSON.stringify({
                orderId: data.orderID,
              }),
            })
          }}
        />
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Paypal
