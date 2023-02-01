import React, {useState} from 'react'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase'
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth(app);
    const Login = async (e)=>{
        e.preventDefault();
          const post = {
              email,
              password
            };


            signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    localStorage.setItem("loginHogya", JSON.stringify(true))
    window.history.back()
    // window.location.reload()
    console.log("login successfully!");
    // ...
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Error:", errorMessage)
});
            // axios.post(
            //   `https://dummyjson.com/auth/login`,  post )
            //          .then(res => {
            //            console.log(res);
            //            console.log(res.data);
            //            window.history.back()
            //        })
    }
    return (
    <>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-500 underline">
                   Login
                </h1>
                <form className="mt-6" onSubmit={Login}>
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
                    <Link
                        to="/login"
                        className="text-xs text-blue-600 hover:underline"
                    >
                        Forget Password?
                    </Link>
                    <div className="mt-6">
                        <input type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-600"
                            value="Login"
                        />
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <Link
                        to='/signup'
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
        <Outlet />
    </>
  )
}

export default Login