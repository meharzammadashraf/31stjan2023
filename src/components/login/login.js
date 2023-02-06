import React, {useState} from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase'
import { useDispatch, useSelector } from 'react-redux';
import { addIsuser } from '../reduxtoolkit/reducer/isuserReducer';
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errormsg, setErrormsg] = useState("");
    const auth = getAuth(app);
    // console.log(window.history.previous.href());
    const konsaPage = useSelector(store => store.pageNoReducer.pageNo)
    console.log("page No: ", konsaPage);
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
    dispatch(addIsuser({login: true}))
    document.getElementById("loginToast").classList.remove("hidden")
    setErrormsg("")
    console.log("login successfully!");
    if (konsaPage === 1) {
        console.log("home");
        navigate("/")
    } else if(konsaPage === 2){
        navigate("/products")
        console.log("product");
    }
    else if(konsaPage === 3){
        navigate("/cart")
        console.log("cart");
    }else{
        navigate("/")
    }
    // ...
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrormsg("invalid email or password")
    console.log(errorMessage);

    
});
    }
    return (
    <>
    <div id='loginToast' className='hidden'>
      <div id="toast-default" class="float-right flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="ml-3 text-sm font-normal">Login Successfully.</div>
    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
</div>
</div>
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
                    {errormsg}
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