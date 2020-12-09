import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './loading'

const Paypal = (props) => {
  const dispatch = useDispatch()
  const [sdkReady, setSdkReady] = useState(false)
  const [paypalConfig, setpaypalConfig] = useState({ loading: true })

  useEffect(() => {
    async function getPaypalConfig() {
      await Axios.get('/config/paypal').then((res) =>
        setpaypalConfig({ loading: false, ...res.data })
      )
    }
    getPaypalConfig()
    return () => {}
  }, [])

  const addPayPalScript = async () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalConfig.clientId}`
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
    return () => {
      setSdkReady(false)
    }
  }, [])

  return (
    <>
      {sdkReady ? (
        <PayPalButton
          amount={props.toPay}
          currency={paypalConfig.currency}
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
