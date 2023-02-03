import React from 'react'
import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import productreducer from './productreducer'
import userReducer from './userReducer'
import isuserReducer from './isuserReducer'
import pageNoReducer from './pageNoReducer'


    const rootReducer = combineReducers({cartReducer, isuserReducer, userReducer, productreducer, pageNoReducer})

export default rootReducer