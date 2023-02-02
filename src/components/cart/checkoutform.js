

import React, { useState } from 'react';
import {
  useStripe, useElements,
  CardNumberElement, CardExpiryElement, CardCvcElement
} from '@stripe/react-stripe-js';
import { stripePaymentMethodHandler } from './stripeapi';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      lineHeight: "27px",
      color: "#212529",
      fontSize: "1.1rem",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = (props)=> {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const stripe = useStripe();
  const elements = useElements();
    const handleSubmit = async (event) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
   if (!stripe || !elements) {
     // Stripe.js has not yet loaded.
     // Make sure to disable form submission until Stripe.js has loaded.
     return;
    }
   
      setLoading(true);
      setErrorMsg('');
   
      const paymentMethodObj = {
        type: 'card',
        // cardnumberelement mn hmary pass card ka number aay ga
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name,
          email
        },
      };
      const paymentMethodResult = await stripe.createPaymentMethod(paymentMethodObj);
   
      stripePaymentMethodHandler({
        result: paymentMethodResult,
        amount: props.amount
      }, handleResponse);
    };
   
    // callback method to handle the response
    const handleResponse = response => {
      setLoading(false);
      if (response.error) {
        setErrorMsg(typeof response.error === 'string' ? response.error : response.error.message);
        return;
      }
      props.setPaymentCompleted(response.success ? true : false);
    };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>

        <div className="row">
          <div className="">
            <label htmlFor="name">Name on card:</label>
            <input
              id="name"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="number">Card Number</label>
            <CardNumberElement
              id="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="expiry">Expiration Date</label>
            <CardExpiryElement
              id="expiry"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
          <div className="col-md-6 mb-2">
            <label htmlFor="cvc">CVC</label>
            <CardCvcElement
              id="cvc"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>

        <hr className="" />
        <button className="btn btn-dark w-full pt-2 pb-2 bg-blue-400 rounded-md font-semibold" type="submit" disabled={loading}>
          {loading ? <div className="spinner-border spinner-border-sm text-light" role="status"></div> : `PAY NOW`}
        </button>
        {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
      </form>
    </React.Fragment>
  );
}
export default CheckoutForm