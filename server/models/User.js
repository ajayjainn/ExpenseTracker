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
  categories:[{type:String}]
})

const User = mongoose.model('User',userSchema)

export default User