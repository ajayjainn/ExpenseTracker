import { useEffect, useState } from 'react'
import AppBar from './components/AppBar.jsx'
import { Outlet } from "react-router-dom"
import accountService from './requests/Account.js'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/authReducer.js'
import { Alert, Snackbar } from '@mui/material'
const App = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const message = useSelector(state => state.message)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('expenseTrackerToken')
      if (token) {
        try {
          const res = await accountService.fetchUser(token)
          dispatch(setUser(res.data.user))

        } catch (err) {
          if (err.response.status === 401) {
            localStorage.removeItem('expenseTrackerToken')
          }
        }
      }
      setLoading(false)
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div>
        Loading....
      </div>
    )
  }

  return (
    <div>

      <AppBar />
      {!loading &&
        <Outlet />}

      {message &&
        <Snackbar open={message!=null} autoHideDuration={6000}>
          <Alert severity={message[1] ? "success" : "error"} sx={{ width: '100%' }}>
            {message[0]}
          </Alert>
        </Snackbar>
      }

    </div>
  )
}

export default App
