import React from 'react'
import StripCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {

    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IRL5XL1Z92Rvt1V76aRSfo9CNhrYqQVRpWeXEs7tH2JK1CIrzzzw7KcSeXnVWNphpy5Pqwr9chg9yVJtF4Kxum100HL1PbQZz'

    const onToken = token => {
        console.log(token)
        alert('Payment Successful')
    }

    return (
        <StripCheckout

            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/en/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}

        />
    )

}

export default StripeCheckoutButton