import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import transactionService from '../requests/Transaction.js'
import dayjs from 'dayjs';

export default function BasicTable({ setEditTransaction,transactions, setTransactions }) {

  const handleEdit = (transaction) => {
    setEditTransaction(transaction)
    return
  }

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete the transaction?")){
      const res = await transactionService.remove(id)
      setTransactions(transactions.filter(trans => trans.id != id))
      if(res.status===204){
        alert('Deleted Successfully')
      }
    }
  }

  return (
    <>

      <Typography variant='h4' sx={{ textAlign: 'center', marginBottom: 5 }}>
        List of transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell align="center"><strong>Description</strong></TableCell>
              <TableCell align="center"><strong>Date</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.amount}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{dayjs(row.date).format('MMMM D, YYYY')}</TableCell>
                <TableCell align="center">

                  <IconButton
                    color='primary'
                    sx={{ marginLeft: 1, cursor: 'pointer' }}
                    onClick={()=>handleEdit(row)}
                    >
                    <EditIcon/>
                  </IconButton>

                  <IconButton
                    color='error'
                    onClick={() => handleDelete(row.id)}
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