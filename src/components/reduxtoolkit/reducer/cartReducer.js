import { createSlice } from "@reduxjs/toolkit";
export const cartReducer = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers:{
        addCart: (state, action)=>{
            const a = state.cartItems.find((data)=>data.id === action.payload.id)
            a ? (a.quantity += 1) : state.cartItems.push(action.payload)
        },
        reduceCart: (state, action)=>{
            const a = state.cartItems.find((data)=>data.id === action.payload.id)
            a.quantity > 1 ? (a.quantity -= 1) : 
            state.cartItems = state.cartItems.filter(item => item.id != action.payload.id)
        },
        deleteCart: (state, action)=>{
            state.cartItems = state.cartItems.filter(item => item.id != action.payload.id)
        }
    },
})

export const {addCart, deleteCart, reduceCart} = cartReducer.actions
export default cartReducer.reducer