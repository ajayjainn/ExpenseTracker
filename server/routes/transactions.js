import { Router } from "express"
import Transaction from "../models/Transaction.js"

const router = Router()

router.get('/', async (req, res) => {
  const userId = req.user.id

  const allTransaction = await Transaction.find({user:userId})
  return res.json(allTransaction)
})

router.post('/', async (req, res) => {
  const newTrans = Transaction({ ...req.body, user: req.user.id })
  const newT = await newTrans.save()
  return res.json(newT)
})

router.put('/:id', async (req, res) => {
  const id = req.params.id

  const trans = await Transaction.findById(id)
  if (String(trans.user) === req.user.id) {
    const updatedTrans = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.json(updatedTrans)
  } else {
    res.status(401).json("not authorized to update someone else's transaction")
  }

})

router.delete('/:id', async (req, res) => {

  const id = req.params.id
  const trans = await Transaction.findById(id)

  if(!trans){
    return res.sendStatus(404).end()
  }

  if (String(trans.user) === req.user.id) {
    await Transaction.findByIdAndDelete(id)
    res.sendStatus(204).end()
  } else {
    res.sendStatus(401).json("not authorized to update someone else's transaction")
  }

})


export default router