import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import app from '../../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { addIsuser, deleteIsuser } from '../reduxtoolkit/reducer/isuserReducer';


function Layout() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(addIsuser({login:}))
  // }, [third])
  
  const koiloginhua = useSelector(state => state.isuserReducer.isusers)
  console.log("isLogin", koiloginhua);
  const auth = getAuth(app);
  const logOut = () => {
    signOut(auth).then(() => {
      dispatch(deleteIsuser())
    }).catch((error) => {

    });
  }
  const numberOfCartItems = useSelector((state) => {
    return state.cartReducer.cartItems;
  })

  return (
    <>
      <nav>
        <div className='bg-blue-200'>
          <ul className='flex px-10 py-6 text-lg font-medium'>
            <li className='mr-8'><Link to='/'>HOME</Link></li>
            <li className='mr-8'><Link to='/products'>PRODUCTS</Link></li>
            {
              koiloginhua.length ?
              <li className='mr-8' onClick={logOut}><Link to="">SIGNOUT</Link></li>
              :
              <li className='mr-8'><Link to='/login'>LOGIN</Link></li>
            }
            {
              !koiloginhua.length &&
              <li className='mr-8'><Link to='/signup'>SIGNUP</Link></li>
            }
            <li><Link to='/cart'><span className="relative inline-block">
              CART
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{numberOfCartItems ? numberOfCartItems.length : 0}</span>
            </span></Link></li>

          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default Layout