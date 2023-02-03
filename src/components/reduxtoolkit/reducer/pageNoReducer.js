import { createSlice } from "@reduxjs/toolkit";
export const pageNoreducer = createSlice({
    name: "pageNo",
    initialState: {
        
    },
    reducers:{
        addpageNo: (state, action)=>{
            state["pageNo"]=(action.payload)
        }
    },
})

export const {addpageNo} = pageNoreducer.actions
export default pageNoreducer.reducer