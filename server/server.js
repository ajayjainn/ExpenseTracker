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
import passportConfig from './utils/passport.js'
import categoryRouter from './routes/category.js'

const app = express()

app.use(express.json())
app.use(cors())

await connect()


app.use(passport.initialize())
passportConfig(passport)

app.get('/',(req,res)=>{
  return res.send("hello world").end()
})

app.use('/transactions',passport.authenticate('jwt',{session:false}),transRouter)

app.use('/auth',authRouter )
app.use('/user',userRouter )
app.use('/category',passport.authenticate('jwt',{session:false}),categoryRouter)

app.listen(config.PORT,()=>{
  console.log('server running at http://localhost:4000')
})