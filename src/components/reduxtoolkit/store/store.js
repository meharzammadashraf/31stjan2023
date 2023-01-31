import { configureStore } from "@reduxjs/toolkit"
import productreducer from '../reducer/productreducer'

export const store = configureStore({
    reducer: productreducer
  })
