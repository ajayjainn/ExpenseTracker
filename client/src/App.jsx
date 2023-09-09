import { useEffect, useState } from 'react'
import AppBar from './components/AppBar.jsx'
import { Outlet } from "react-router-dom"
import accountService from './requests/Account.js'
import { useDispatch } from 'react-redux'
import { setUser } from './reducers/authReducer.js'
const App = () => {
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    const fetchUser = async (req,res)=>{
      const token = localStorage.getItem('expenseTrackerToken')
      if(!token){
        return
      }
      try{
        const res = await accountService.fetchUser(token)
        console.log(res)
        dispatch(setUser(res.data.user))

      }catch(err){
        if(err.response.status===401){
          localStorage.removeItem('expenseTrackerToken')
        }
      }
      
    }

    fetchUser()
    setLoading(false)
  },[])

  if(loading){
    return(
      <div>
        Loading....
      </div>
    )
  }

  return (
    <div>
      <AppBar/>
      <Outlet/>
    </div>
  )
}

export default App
