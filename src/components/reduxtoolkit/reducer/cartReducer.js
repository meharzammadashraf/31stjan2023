import { createReducer } from "@reduxjs/toolkit";
    const initialstate = {
        cartItems:[]
    }
export default createReducer(initialstate, (builder)=>{
    builder.addCase('CART', (state, action)=>{
        state.cartItems =[ ...state.cartItems, action.payload]
       })
})