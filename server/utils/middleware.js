import jwt, { decode } from 'jsonwebtoken'
import config from '../utils/config.js'
const auth = (req,res,next)=>{
  const header = req.headers['authorization'] || ''

  const token = header.split(' ')[1]
  try{
    const decoded = jwt.verify(token,config.KEY)
    req.user = decoded
    next()
  }catch (err){
    next(err) 
  }
}
export default {auth}