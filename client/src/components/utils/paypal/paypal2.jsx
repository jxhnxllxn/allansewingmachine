import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { useDispatch } from 'react-redux';
import { cleanOrder, getPaypalScript } from '../../../redux/order/order-action';

// sb-p5ber3262392@business.example.com
// ATow62LzM8Rc1TGO2Nh2KGTEOMsqwdxqZQrfR6u4t7Xq7OyF-mYYD9OsjY2OiyDgNDB2K8BO6Dpw_nVF
// EHkmUD_yquUtiMJhcvMdZBI6u8IF61yK-vw26eaTjdDZ6ntEUTmi8vDdecrok4dnypEkAw0CXSetQPSk
const Paypal = (props) => {
    const dispatch = useDispatch()
    const [paypalScript, setPaypalScript] = useState({})
    useEffect(() => {
        dispatch(getPaypalScript()).then(res => setPaypalScript(res.payload))
        return () => {
            dispatch(cleanOrder())
        }
    }, [dispatch])

    const onSuccess = (payment) => {
        props.transactionSuccess(payment)
    }		

    const onCancel = (data) => {
        props.transactionCanceled(data)
    }	

    const onError = (err) => {
        props.transactionError(err)
    }	

    const client = {
        sandbox: paypalScript.sandbox,
        production: paypalScript.production,
     }

    return (
        <div>
            <PaypalExpressBtn 
                client={client}
                env={paypalScript.env}
                locale={paypalScript.locale}
                currency={paypalScript.currency}
                total={props.toPay}

                onError={onError}
                onCancel={onCancel}
                onSuccess={onSuccess}
                style={{
                    size:'medium',
                    shape:'rect',
                }}
            />
        </div>
    )
}

export default Paypal