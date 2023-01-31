import { createReducer } from "@reduxjs/toolkit";
    const initialstate = {}
export default createReducer(initialstate, (builder)=>{
    builder.addCase('USER', (state, action)=>{
        state.data = action.payload
    })
})