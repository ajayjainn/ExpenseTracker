import express from 'express'
import config from './utils/config.js'
import cors from 'cors'
import connect from './database/mongodb.js'
import transRouter from './routes/transactions.js'
import authRouter from './routes/auth.js'
import passport from 'passport'
import userRouter from './routes/user.js'
import passportConfig from './utils/passport.js'
import categoryRouter from './routes/category.js'
import { fileURLToPath } from 'url';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json())
app.use(cors())

await connect()


app.use(passport.initialize())
passportConfig(passport)

app.use(express.static('dist'))



app.use('/transactions',passport.authenticate('jwt',{session:false}),transRouter)

app.use('/auth',authRouter )
app.use('/user',userRouter )
app.use('/category',passport.authenticate('jwt',{session:false}),categoryRouter)

app.get(['/login','/register'],(req, res) =>{
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.listen(config.PORT,()=>{
  console.log('server running')
})