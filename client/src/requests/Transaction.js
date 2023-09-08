import axios from "axios";

const baseurl = 'http://localhost:4000/transactions'

const create = async (transaction) => {
    const res = await axios.post(baseurl, transaction)
    return res.data
}

const fetchAll = async ()=>{
  const res =await axios.get(baseurl)
  return res.data
}

export default {create,fetchAll}