import express from 'express'
import config from './utils/config.js'
import mongoose from 'mongoose'
import cors from 'cors'
import Transaction from './models/Transaction.js'
import connect from './database/mongodb.js'
import transRouter from './routes/transactions.js'
import authRouter from './routes/auth.js'
import passport from 'passport'
import userRouter from './routes/user.js'

const app = express()

app.use(express.json())
app.use(cors())

await connect()

import passportConfig from './utils/passport.js'


app.use(passport.initialize())
passportConfig(passport)

app.get('/',(req,res)=>{
  return res.send("hello world").end()
})

app.use('/transactions',transRouter)

app.use('/auth',authRouter )
app.use('/user',userRouter )

app.listen(config.PORT,()=>{
  console.log('server running at http://localhost:4000')
})