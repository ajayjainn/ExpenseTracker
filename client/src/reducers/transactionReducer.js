import { createSlice } from "@reduxjs/toolkit";

const transSlice = createSlice({
  name:"transaction",
  initialState:[],
  reducers:{
    addTransaction:(state, action)=>{
      return state.concat(action.payload)
    },
    setTransactions(state,action){
      return action.payload
    },
    removeTransaction(state,action){
      return state.filter(trans => trans.id != action.payload)
    }
  }

})

export default transSlice.reducer
export const {addTransaction,setTransactions,removeTransaction} = transSlice.actions