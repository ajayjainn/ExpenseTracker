import mongoose from "mongoose"
import config from '../utils/config.js'

const connect = async () =>{
  try{
    await mongoose.connect(config.MONGODB_URI)
    console.log("connection successful")
  }catch(error){
    console.log(error)
  }
}
export default connect