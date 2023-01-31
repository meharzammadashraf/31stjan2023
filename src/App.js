import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from "./components/cart/cart";
import Home from "./components/home/home";
import Layout from "./components/layout/layout";
import Login from "./components/login/login";
import Products from "./components/products/products";
import Signup from "./components/signup/signup";


function App() {
  return (
<>
<BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Routes>
        </BrowserRouter>
</>
  );
}

export default App;
