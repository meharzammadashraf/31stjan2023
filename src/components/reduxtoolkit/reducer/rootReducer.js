import React from 'react'
import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import productreducer from './productreducer'
import userReducer from './userReducer'


    const rootReducer = combineReducers({cartReducer, userReducer, productreducer})

export default rootReducer