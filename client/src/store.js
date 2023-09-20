import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer.js'
import transactionReducer from './reducers/transactionReducer.js'
import editTransactionReducer from './reducers/editTransactionReducer.js'
import messageReducer from './reducers/messageReducer.js'

export default configureStore({
  reducer:{
    auth:authReducer,
    transactions:transactionReducer,
    editTransaction:editTransactionReducer,
    message:messageReducer
  }
})