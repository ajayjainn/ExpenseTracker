import dotenv from 'dotenv'
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT
const KEY = process.env.SECRET

export default {MONGODB_URI,PORT,KEY}