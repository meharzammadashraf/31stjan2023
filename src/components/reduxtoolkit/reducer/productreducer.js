import { createSlice } from "@reduxjs/toolkit";
export const productreducer = createSlice({
    name: "product",
    initialState: {
        products: []
    },
    reducers:{
        addProducts: (state, action)=>{
            state.products.push(action.payload)
        }
    },
})

export const {addProducts} = productreducer.actions
export default productreducer.reducer