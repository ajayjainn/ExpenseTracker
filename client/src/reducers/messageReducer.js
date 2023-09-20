import { createSlice } from "@reduxjs/toolkit";

const transSlice = createSlice({
  name:"message",
  initialState:null,
  reducers:{
    setMessage(state,action){
      return action.payload
    }
  }

})

export default transSlice.reducer
export const {setMessage} = transSlice.actions