import { createSlice } from "@reduxjs/toolkit";
export const userreducer = createSlice({
    name: "user",
    initialState: {
        users: []
    },
    reducers:{
        addUser: (state, action)=>{
            state.users.push(action.payload)
        }
    },
})

export const {addUser} = userreducer.actions
export default userreducer.reducer