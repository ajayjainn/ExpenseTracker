import axios from "axios";

const baseurl = 'http://localhost:4000/transactions/'


const headers = (token)=> {
  return {authorization:`Bearer ${token}`}
}

const create = async (transaction) => {
    const res = await axios.post(baseurl,transaction)
    return res.data
}

const fetchAll = async ()=>{
  const token = localStorage.getItem('expenseTrackerToken')
  const res =await axios.get(baseurl,{headers:headers(token)})
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