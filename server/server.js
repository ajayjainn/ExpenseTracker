import express from 'express'
import config from './utils/config.js'
import mongoose from 'mongoose'
import cors from 'cors'
import Transaction from './models/Transaction.js'
import connect from './database/mongodb.js'
import transRouter from './routes/transactions.js'

const app = express()

app.use(express.json())
app.use(cors())

await connect()

app.get('/',(req,res)=>{
  return res.send("hello world").end()
})

app.use('/transactions',transRouter)

app.listen(config.PORT,()=>{
  console.log('server running at http://localhost:4000')
})