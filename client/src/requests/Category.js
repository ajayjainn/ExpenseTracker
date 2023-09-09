import axios from "axios";

const baseurl = 'http://localhost:4000/category/'

const headers = (token)=> {
  return {authorization:`Bearer ${token}`}
}


const remove = async (catName)=>{
  const token = localStorage.getItem('expenseTrackerToken')
  const res = await axios.delete(baseurl+catName,{headers:headers(token)})
  return res
}
const create = async (catName)=>{
  const token = localStorage.getItem('expenseTrackerToken')
  const res = await axios.post(baseurl,{name:catName},{headers:headers(token)})
  return res
}

export default {remove,create}