import axios from "axios"; 

const headers = (token)=> {
  return {authorization:`Bearer ${token}`}
}

const register = async (userData)=>{
  const res = await axios.post('/auth/register/',userData)
  return res.data

}
const login = async (credentials)=>{
  const res = await axios.post('/auth/login/',credentials)
  localStorage.setItem('expenseTrackerToken',res.data.token)
  return res.data
}
const fetchUser = async (token) =>{
  const res = await axios.get('/user',{headers:headers(token)})
  return res;
}

export default {register,login,fetchUser}