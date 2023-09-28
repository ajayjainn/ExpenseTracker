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
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, setTransactions } from '../reducers/transactionReducer';
import { setEditTransaction } from '../reducers/editTransactionReducer'
import { setMessage } from '../reducers/messageReducer'

const Content = () => {

  const categories = useSelector(state => state.auth.user.categories)
  const transactions = useSelector(state => state.transactions)
  const editTransaction = useSelector(state => state.editTransaction)
  const dispatch = useDispatch()

  const initialForm = {
    amount: '',
    description: '',
    date: dayjs('2022-04-17'),
    category: categories[0]
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if (editTransaction != null) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()



    if (!editTransaction) {
      const res = await TransactionService.create(form)
      dispatch(addTransaction(res))
      setForm(initialForm)

      dispatch(setMessage(['Expense added successfully', true]))

    } else {
      const res = await TransactionService.update(form)
      dispatch(setEditTransaction(null))
      setForm(initialForm)
      const updatedTrans = transactions.map(trans => trans.id === res.id ? res : trans)
      dispatch(setTransactions(updatedTrans))
      dispatch(setMessage(['Expense updated successfully', true]))
    }

    setTimeout(() => dispatch(setMessage(null)), 5000)

  }
  return (
    <React.Fragment>
      <CardContent>

        <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <TextField size='small' sx={{ marginRight: 5, marginTop: 5 }} onChange={handleInput} value={form.amount} type="number" name="amount" placeholder="Transaction Amount" />
          <TextField size='small' sx={{ marginRight: 5, marginTop: 5 }} onChange={handleInput} value={form.description} type="text" name="description" placeholder="description" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>

            <DesktopDatePicker
              label="Transaction Date"
              name="date"

              value={dayjs(form.date)}
              sx={{ marginRight: 5, marginTop: 5 }}
              onChange={(newVal) => setForm({ ...form, date: newVal })}
              slotProps={{ textField: { variant: 'outlined', size: 'small' } }}
            />
          </LocalizationProvider>

          <Autocomplete
            value={form.category}
            onChange={(_, newValue) => setForm({ ...form, category: newValue })}
            disableClearable
            options={categories}
            size='small'
            sx={{ width: 200, marginRight: 5, marginTop: 5 }}
            renderInput={(params) => <TextField {...params} label="Categories" />}
          />

          <Button style={{ display: 'block', margin: 'auto', marginTop: 20 }} variant="contained" type="submit">{editTransaction ? 'Update' : 'Submit'}</Button>
        </Box>


      </CardContent>
      <CardActions>
      </CardActions>
    </React.Fragment>
  )
};

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275, margin: 5 }}>
      <Card variant="outlined"><Content /></Card>
    </Box>
  );
}
