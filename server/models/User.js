import mongoose from "mongoose";

import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  fname:String,
  lname:String,
  email:{
    type:String,
    unique:true
  },
  pHash:String,
  transactions:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Transaction'
    }
  ]
})

const User = mongoose.model('User',userSchema)

export default User