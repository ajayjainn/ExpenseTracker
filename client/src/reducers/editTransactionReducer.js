import { createSlice } from "@reduxjs/toolkit";

const transSlice = createSlice({
  name:"editTransaction",
  initialState:null,
  reducers:{
    setEditTransaction(state,action){
      return action.payload
    }
  }

})

export default transSlice.reducer
export const {setEditTransaction} = transSlice.actions