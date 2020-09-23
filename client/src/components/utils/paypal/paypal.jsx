import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

// sb-p5ber3262392@business.example.com
// ATow62LzM8Rc1TGO2Nh2KGTEOMsqwdxqZQrfR6u4t7Xq7OyF-mYYD9OsjY2OiyDgNDB2K8BO6Dpw_nVF
// EHkmUD_yquUtiMJhcvMdZBI6u8IF61yK-vw26eaTjdDZ6ntEUTmi8vDdecrok4dnypEkAw0CXSetQPSk
const Paypal = (props) => {
    const onSuccess = (payment) => {
        props.transactionSuccess(payment)
    }		

    const onCancel = (data) => {
        props.transactionCanceled(data)
    }	

    const onError = (err) => {
        props.transactionError(err)
    }	

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'PHP'; // or you can set this value from your props or state  
    let total = props.toPay;  // same as above, this is the total amount (based on currency) to be 
    // let locale = 'en-PH';
    let locale = 'en-US'; 

    const client = {
        sandbox: 'ATow62LzM8Rc1TGO2Nh2KGTEOMsqwdxqZQrfR6u4t7Xq7OyF-mYYD9OsjY2OiyDgNDB2K8BO6Dpw_nVF',
        production: '',
     }

    return (
        <div>
            <PaypalExpressBtn 
                client={client}
                env={env}
                locale={locale}
                currency={currency}
                total={total}

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
