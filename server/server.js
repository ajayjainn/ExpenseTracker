import express from 'express'
import config from './utils/config.js'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

try{
  await mongoose.connect(config.MONGODB_URI)
  console.log("connection successful")
}catch(error){
  console.log(error)
}

app.get('/',(req,res)=>{
  return res.send("hello world").end()
})

app.post('/transactions',(req,res)=>{
  console.log(req.body)
  return res.send(req.body).end()
})

app.listen(config.PORT,()=>{
  console.log('server running at http://localhost:4000')
})