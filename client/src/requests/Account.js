import axios from "axios"; 

const headers = (token)=> {
  return {authorization:`Bearer ${token}`}
}

const register = async (userData)=>{
  const res = await axios.post('http://localhost:4000/auth/register/',userData)
  return res.data

}
const login = async (credentials)=>{
  const res = await axios.post('http://localhost:4000/auth/login/',credentials)
  localStorage.setItem('expenseTrackerToken',res.data.token)
  return res.data
}
const fetchUser = async (token) =>{
  console.log('hell')
  const res = await axios.get('http://localhost:4000/user',{headers:headers(token)})
  return res;
}

export default {register,login,fetchUser}