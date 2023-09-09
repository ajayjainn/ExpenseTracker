import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from '../reducers/authReducer'
import CategoryService from '../requests/Category.js'
import CategoryForm from '../components/CategoryForm.jsx'
export default function Category() {

  const dispatch = useDispatch()

  const categories = useSelector(state=>state.auth.user.categories)

  const handleDelete = async (name) => {
    if (confirm("Are you sure you want to delete the category?")){
      const res = await CategoryService.remove(name)
      // setTransactions(transactions.filter(trans => trans.id != id))
      if(res.status===200){
        console.log('deleted')
        alert('Deleted Successfully')
        dispatch(setUser(res.data))
      }
    }
  }

  return (
    <>

      <CategoryForm/>
      <Typography variant='h4' sx={{ textAlign: 'center', margin: 5 }}>
        List of categories
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Name</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row) => (
              <TableRow
                key={row}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row}</TableCell>
                <TableCell align="center">

                  <IconButton
                    color='error'
                    onClick={() => handleDelete(row)}
                    sx={{ cursor: 'pointer' }}>
                    <DeleteIcon />
                  </IconButton>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}