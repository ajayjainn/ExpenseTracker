/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Autocomplete, Button, TextField } from '@mui/material';
import TransactionService from '../requests/Transaction'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const Content = ({ editTransaction, setEditTransaction, transactions, setTransactions }) => {

  const categories = useSelector(state=>state.auth.user.categories)

  const initialForm = {
    amount: '',
    description: '',
    date: dayjs('2022-04-17'),
    category:categories[0]
  }
 
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if (editTransaction.amount != undefined) {
      setForm(editTransaction)
    }
  }, [editTransaction])

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    console.log(form)
    e.preventDefault()

    if (!editTransaction.amount) {
      const res = await TransactionService.create(form)
      setTransactions(transactions.concat(res).sort((a, b) => a.date > b.date ? -1 : 1))
      setForm(initialForm)
      console.log(res)
    } else {
      const res = await TransactionService.update(form)
      setEditTransaction({})
      setForm(initialForm)
      setTransactions(transactions.map(trans => trans.id === res.id ? res : trans))
      console.log(res)
    }
  }

  return (
    <React.Fragment>
      <CardContent>

        <Box component='form' onSubmit={handleSubmit} sx={{display:'flex',flexWrap:'wrap'}}>
          <TextField size='small' sx={{ marginRight: 5,marginTop:5 }} onChange={handleInput} value={form.amount} type="number" name="amount" placeholder="Transaction Amount" />
          <TextField size='small' sx={{ marginRight: 5,marginTop:5  }} onChange={handleInput} value={form.description} type="text" name="description" placeholder="description" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>

            <DesktopDatePicker
              label="Transaction Date"
              name="date"
              
              value={dayjs(form.date)}
              sx={{ marginRight: 5 ,marginTop:5 }}
              onChange={(newVal) => setForm({ ...form, date: newVal })}
              slotProps={{ textField: { variant: 'outlined', size: 'small' } }}
            />
          </LocalizationProvider>

          <Autocomplete
            value={form.category}
            onChange={(_,newValue)=>setForm({...form,category:newValue})}
            disableClearable
            options={categories}
            size='small'
            sx={{ width: 200 ,marginRight: 5,marginTop:5 }}
            renderInput={(params) => <TextField {...params} label="Categories" />}
          />

          <Button style={{display:'block',margin:'auto',marginTop:20}} variant="contained" type="submit">{editTransaction.amount ? 'Update' : 'Submit'}</Button>
        </Box>



      </CardContent>
      <CardActions>
      </CardActions>
    </React.Fragment>
  )
};

export default function OutlinedCard({ editTransaction, setEditTransaction, transactions, setTransactions }) {
  return (
    <Box sx={{ minWidth: 275, margin: 5 }}>
      <Card variant="outlined"><Content editTransaction={editTransaction} setEditTransaction={setEditTransaction} transactions={transactions} setTransactions={setTransactions} /></Card>
    </Box>
  );
}
