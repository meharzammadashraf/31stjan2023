import React, {useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {Link, Outlet} from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase'
function Signup() {
    
    const [status, setStatus] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const auth = getAuth(app);
    const SignupDone = async (e)=>{
        e.preventDefault();
        const post = {
          firstName,
          lastName,
          address,
          email,
          phone,
          password
          };
                     createUserWithEmailAndPassword(auth, post.email, post.password)
                     .then((userCredential) => {
                       // Signed in 
                       const user = userCredential.user;
                       alert("Account created Successfully!")
                       // ...
                     })
                     .catch((error) => {
                       const errorCode = error.code;
                       const errorMessage = error.message;
                       alert("Error", errorMessage);
                       // ..
                     });
                     dispatch({
                      type: 'SIGNUP_DATA',
                      payload: post
                  })
                  setStatus("Account Created!")
                //   window.history.back()
  }
  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-500 underline">
                   Signup
                </h1>
                <form className="mt-6" onSubmit={SignupDone}>
                    <div className="mb-2">
                        <label
                            htmlFor="firstname"
                            className="block text-sm font-semibold text-blue-600"
                        >
                            First Name
                        </label>
                        <input
                        id='firstname'
                            type="text"
                            value={firstName}
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md border-blue-300 focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={e=>setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="lastname"
                            className="block text-sm font-semibold text-blue-600"
                        >
                            Last Name
                        </label>
                        <input
                        id='lastname'
                            type="text"
                            value={lastName}
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md border-blue-300 focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={e=>setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-blue-600"
                        >
                            Contact #
                        </label>
                        <input
                        id='phone'
                            type="number"
                            value={phone}
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md border-blue-300 focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={e=>setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="address"
                            className="block text-sm font-semibold text-blue-600"
                        >
                            Address
                        </label>
                        <input
                        id='address'
                            type="text"
                            value={address}
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md border-blue-300 focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={e=>setAddress(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-blue-600"
                        >
                            Email
                        </label>
                        <input
                        id='email'
                            type="email"
                            value={email}
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md border-blue-300 focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={e=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-blue-600"
                        >
                            Password
                        </label>
                        <input
                        id='password'
                        value={password}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md border-blue-300 focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-6">
                        <input type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-600"
                            value="Signup"
                        />
                    </div>
                </form>
<p className="mt-8 text-xs font-light text-center text-blue-600">{status}</p>
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    If already have an account?{" "}
                    <Link
                        to='/login'
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
        <Outlet />
    </>
  )
}

export default Signup