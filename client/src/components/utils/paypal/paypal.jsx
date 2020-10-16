import React, { useEffect, useState } from 'react'
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch } from 'react-redux';
import { cleanOrder, getPaypalScript } from '../../../redux/order/order-action';
import Loading from '../../loading/loading'

const Paypal = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [paypalConfig, setPaypalConfig] = useState({})
    const [sdkReady, setSdkReady] = useState(false)

    useEffect(() => {
      setIsLoading(true)
        const addPaypalScript = async (clientId) => {
          const script = document.createElement('script')
          script.type = 'text/javascript'
          script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
          script.async = true
          script.onload = () => {
            setSdkReady(true)
          }
            document.body.appendChild(script)
        }
        dispatch(getPaypalScript())
        .then(res => {
            setPaypalConfig(res.payload)
            addPaypalScript(res.payload.sandbox)
            setIsLoading(false)
        })

        // if(!window.paypal){
        //   console.log(window.paypal)
        // }else{
        //   setSdkReady(true)
        //   console.log(window.paypal)
        // }
        return () => {
            dispatch(cleanOrder())
        }
    }, [dispatch])
    return (
      <>
        {
          sdkReady ?
            <PayPalButton
                amount="0.01"
                currency="PHP"
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details, data) => {
                    alert("Transaction completed by " + details.payer.name.given_name);

                    // OPTIONAL: Call your server to save the transaction
                    return fetch("/paypal-transaction-complete", {
                        method: "post",
                        body: JSON.stringify({
                            orderId: data.orderID
                        })
                    });
                }}
            />
          :  <Loading />
        }
      </>
    )
  }

  export default Paypal