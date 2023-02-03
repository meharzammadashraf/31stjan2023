import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCart } from '../reduxtoolkit/reducer/cartReducer'
import { addCart, reduceCart } from '../reduxtoolkit/reducer/cartReducer'
import { addpageNo } from '../reduxtoolkit/reducer/pageNoReducer'


import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkoutform'
import { Elements } from '@stripe/react-stripe-js';
import SuccessMessage from './scccessmessage'
import Login from '../login/login'
const stripePromise = loadStripe("pk_test_51MQtBjJU8efuyOseP0AMcbtc5i0XBi8ExHGJYYpwNz9DaVCNGeZBerjyIXXAH3cfFz2fkms3XmlmLouQOYSO5V5M00nxJTYhkr");


function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const total = [];
  dispatch(addpageNo(3))
  const a = useSelector((state) => {
    return state.cartReducer.cartItems;
  })
const loginhayani = useSelector(state => state.isuserReducer.isusers);
  return (
    <>
      {
        a ?
          <div className="container mx-auto mt-10">
            <div className=" shadow-md my-10">
              <div className=" bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                  <h2 className="font-semibold text-2xl">No. of Item: {a.length}</h2>
                </div>
                <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
                </div>
                {
                  a.map((data) => {
                    total.push(parseInt(data.price * data.quantity))
                    return (

                      <>
                        <div key={data.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                          <div className="flex w-2/5">
                            <div className="w-20">
                              <img className="h-24" src={data.thumbnail} alt="" />
                            </div>
                            <div className="flex flex-col justify-between ml-4 flex-grow">
                              <span className="font-bold text-sm">{data.title}</span>
                              <span className="text-red-500 text-xs">{data.brand}</span>
                              <a className="cursor-pointer font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={() => dispatch(deleteCart({ id: data.id }))}>Remove</a>
                            </div>
                          </div>
                          <div className="flex justify-center w-1/5">
                            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512" onClick={() => dispatch(reduceCart(data))}>
                              <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                            </svg>

                            <input className="mx-2 border text-center w-8" type="text" value={data.quantity} />

                            <svg className="cursor-pointer fill-current text-gray-600 w-3" viewBox="0 0 448 512" onClick={() => dispatch(addCart(data))}>
                              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                            </svg>
                          </div>
                          <span className="text-center w-1/5 font-semibold text-sm">${data.price}</span>
                          <span className="text-center w-1/5 font-semibold text-sm">${data.quantity * data.price}</span>
                        </div>
                      </>)
                  })
                }
                {
                  total.length ?
                  <div className="flex justify-end pb-4">
                    <h1 className="font-semibold text-2xl">Total: </h1>
                    <h2 className="font-bold text-2xl">{total.reduce((a, b) => a + b, 0)}</h2>
                  </div>:
                  ""
                }
                {
                  total.length ?
                  <div onClick={() => { 
                    loginhayani.length ?
                    setShowModal(true)
                  :
                  navigate("/login")
                  // window.location.pathname = '/login'
                }} className='text-center bg-blue-400 pt-2 pb-2 rounded-md'>
                    <button>PAY NOW</button>
                  </div>:
                  ""
                }
                <Link to="/products" className="flex font-semibold text-indigo-600 text-sm mt-10">
                  <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          : <p></p>
      }
      {showModal ? (
        // <form>
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className=" text-3xl font-semibold">
                    Pay with card
                  </h3>
                  <button
                    className="p-1 ml-auto bg-red-400 border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-red-500 text-black opacity-5 h-6 w-6 text-2xl block  focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {
                    paymentCompleted ? <SuccessMessage /> :
                      <Elements stripe={stripePromise}>
                        <CheckoutForm amount={total.reduce((a, b) => a + b, 0)} setShowModal={setShowModal} setPaymentCompleted={setPaymentCompleted} />
                      </Elements>
                  }
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">

                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => { 
                      if(paymentCompleted){
                        setShowModal(false)
                        window.location.reload()

                    }else{
                      setShowModal(false)
                    }
                     }}
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default Cart









