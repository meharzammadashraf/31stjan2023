import { createSlice } from "@reduxjs/toolkit";
export const isuserreducer = createSlice({
    name: "isuser",
    initialState: {
        isusers: []
    },
    reducers:{
        addIsuser: (state, action)=>{
            state.isusers.push(action.payload)
        },
        deleteIsuser: (state, action)=>{
            state.isusers.shift()
        }
    },
})

export const {addIsuser, deleteIsuser} = isuserreducer.actions
export default isuserreducer.reducer