import { useState } from "react"
import axios from "axios"

const App= () => {

  const [form,setForm] = useState({
    amount:0,
    description:'',
    date:''
  })

  const handleInput = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post('http://localhost:4000/transactions',form)
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInput} value={form.amount} type="number" name="amount" placeholder="Transaction Amount" />
        <input onChange={handleInput} value={form.description} type="text" name="description" placeholder="description" />
        <input onChange={handleInput} value={form.date} type="date" name="date" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
