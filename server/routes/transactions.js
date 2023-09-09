import {Router} from "express"
import Transaction from "../models/Transaction.js"
import passport from "passport"


const router = Router()

router.get('/',passport.authenticate('jwt',{session:false}), async (req,res)=>{
  const allTransaction = await Transaction.find()
  return res.json(allTransaction)
})

router.post('/',async (req,res)=>{
  const newTrans = Transaction(req.body)
  const newT = await newTrans.save()
  console.log(newT)
  return res.json(newT)
})

router.put('/:id',async (req,res)=>{
  const id = req.params.id
  const trans = req.body
  const updated = await Transaction.findByIdAndUpdate(id,trans, {
    new: true,
  })
  res.json(updated)
})

router.delete('/:id',async (req,res)=>{
  const id = req.params.id
  const trans = await Transaction.findByIdAndDelete(id)
  res.send(204).end()
})


export default router