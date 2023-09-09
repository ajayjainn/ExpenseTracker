import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer.js'
export default configureStore({
  reducer:{
    auth:authReducer
  }
})