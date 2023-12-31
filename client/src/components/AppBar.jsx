import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../reducers/authReducer';
import { setMessage } from '../reducers/messageReducer';

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  cursor: 'pointer'
}

export default function ButtonAppBar() {
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const logout = () => {
    localStorage.removeItem('expenseTrackerToken')
    dispatch(removeUser())
    navigate('/login')
    dispatch(setMessage(['User logged out', true]))
    setTimeout(() => dispatch(setMessage(null)), 5000)

  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link style={linkStyle} to='/'>Expense Tracker</Link>
          </Typography>

          {user &&
          <>
            <Button color="inherit"><Link style={linkStyle} to='/category'>category</Link></Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
          }

          {!user && 
          <>
          <Button color="inherit"><Link style={linkStyle} to='/login'>Login</Link></Button>
          <Button color="inherit"><Link style={linkStyle} to='/register'>Register</Link></Button>
          </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
