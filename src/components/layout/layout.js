import React, {useState, useEffect} from 'react'
import { Link, Outlet } from 'react-router-dom'



function Layout() {
  const UrlSave = ()=>{
    // localStorage.setItem("url", JSON.stringify(window.history.back()))
  }
  return (
    <>
    <nav>
    <div className='bg-blue-200'>
        <ul className='flex px-10 py-6 text-lg font-medium'>
            <li className='mr-8'><Link to='/'>HOME</Link></li>
            <li className='mr-8'><Link to='/products'>PRODUCTS</Link></li>
            <li className='mr-8' onClick={UrlSave}><Link to='/login'>LOGIN</Link></li>
            <li className='mr-8' onClick={UrlSave}><Link to='/signup'>SIGNUP</Link></li>
            <li><Link to='/cart'>CART</Link></li>
        </ul>
    </div>
    </nav>
    <Outlet />
    </>
  )
}

export default Layout