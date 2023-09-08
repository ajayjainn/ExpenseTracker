import { useEffect, useState } from "react"
import TransactionService from './requests/Transaction'

const App = () => {

  const initialForm = {
    amount: 0,
    description: '',
    date: ''
  }
  const [form, setForm] = useState(initialForm)

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    async function fetchData() {
      const data = await TransactionService.fetchAll()
      setTransactions(data.sort((a,b)=>a.createdAt>b.createdAt?-1:1))  
    }
    fetchData()
  }, [])

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    setForm(initialForm)
    e.preventDefault()
    const res = await TransactionService.create(form)
    setTransactions(transactions.concat(res).sort((a,b)=>a.createdAt>b.createdAt?-1:1))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInput} value={form.amount} type="number" name="amount" placeholder="Transaction Amount" />
        <input onChange={handleInput} value={form.description} type="text" name="description" placeholder="description" />
        <input onChange={handleInput} value={form.date} type="date" name="date" />
        <button type="submit">Submit</button>
      </form>

      <section>
        <table style={{ marginTop: '10px' }}>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(trans =>
            (
              <tr key={trans.id}>
                <td>{trans.amount}</td>
                <td>{trans.description}</td>
                <td>{trans.createdAt}</td>
              </tr>)
            )}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default App
