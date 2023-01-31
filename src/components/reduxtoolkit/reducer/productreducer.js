import { createReducer } from "@reduxjs/toolkit";
    const initialstate = {}
export default createReducer(initialstate, (builder)=>{
    builder.addCase('PRODUCTS', (state, action)=>{
        state.data = action.payload
    })
})