/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import CategoryService from '../requests/Category.js'
import {setUser} from '../reducers/authReducer'
import { useDispatch } from 'react-redux';


const Content = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const handleInput = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await CategoryService.create(name)
    dispatch(setUser(res.data))
    setName('')
  }

  return (
    <React.Fragment>
      <CardContent>

        <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap',justifyContent:'center'
       }}>
          <TextField size='small' sx={{ marginRight: 5 }} onChange={handleInput} value={name} type="text" name="amount" placeholder="New Category Name" />
          <Button variant="contained" type="submit">Submit</Button>
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
