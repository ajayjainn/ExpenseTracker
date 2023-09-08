import {Router} from "express"
import Transaction from "../models/Transaction.js"

const router = Router()

router.get('/',async (req,res)=>{
  const allTransaction = await Transaction.find()
  return res.json(allTransaction)
})

router.post('/',async (req,res)=>{
  const newTrans = Transaction(req.body)
  const newT = await newTrans.save()
  console.log(newT)
  return res.json(newT)
})

export default router