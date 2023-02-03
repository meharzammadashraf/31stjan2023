

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
  const [validation, setValidation] = useState('');

  const stripe = useStripe();
  const elements = useElements();




//   const Modal1 = (e)=>{
//     e.preventDefault();
//     if (name && email) {
//       handleSubmit()
   
//   } else {
//     if (!name) {
//       document.getElementById("name").classList.remove("hidden")
//     }else if(!email){
//       document.getElementById("email").classList.remove("hidden")
//       document.getElementById("name").classList.add("hidden")
//     }else{
//       document.getElementById("email").classList.add("hidden")
//     }
//     }
// }





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
            {/* <span id='name' className="hidden p-2 text-xs text-red-600">Please fill the name field!</span> */}
            <input
              id="name"
              type="text"
              className="border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            /></div>
          <div className="">
            <label htmlFor="email">Email</label>
            {/* <span id='email' className="hidden p-2 text-xs text-red-600">Please fill the email field!</span> */}
            <input
              id="email"
              type="email"
              className="border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="number">Card Number</label>
            <CardNumberElement
              id="number"
              className="border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="expiry">Expiration Date</label>
            <CardExpiryElement
              id="expiry"
              className="border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
          <div className="col-md-6 mb-2">
            <label htmlFor="cvc">CVC</label>
            <CardCvcElement
              id="cvc"
              className="border-2 border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight"
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