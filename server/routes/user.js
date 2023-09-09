import { Router } from "express";
import passport from "passport";

const app = Router()

app.get('/',passport.authenticate('jwt',{session:false}), (req,res)=>{
  res.json({user:req.user})
})

export default app