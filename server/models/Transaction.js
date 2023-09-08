import mongoose from "mongoose";


const transactionSchema =new mongoose.Schema({
  amount:Number,
  description:String,
  date:{
    type:Date,
    default:new Date()
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})

transactionSchema.set('toJSON',{
  versionKey:false,
  virtuals:true,
  transform:(doc,ret)=>{
    delete ret._id
  }
})



const Transaction = new mongoose.model('Transaction',transactionSchema)
export default Transaction