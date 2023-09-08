import axios from "axios";

const baseurl = 'http://localhost:4000/transactions/'

const create = async (transaction) => {
    const res = await axios.post(baseurl, transaction)
    return res.data
}

const fetchAll = async ()=>{
  const res =await axios.get(baseurl)
  return res.data
}


const remove = async (id) => {
  const res = await axios.delete(baseurl+id)
  return res
}

const update = async (transaction)=>{
  const res = await axios.put(baseurl+transaction.id,transaction)
  return res.data
}

export default {create,fetchAll,remove,update}