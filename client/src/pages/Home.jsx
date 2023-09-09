import { useEffect, useState } from "react"
import TransactionService from '../requests/Transaction'
import TransactionForm from '../components/TransactionForm.jsx'
import TransactionList from '../components/TransactionList.jsx'
import { Container } from "@mui/material"

const Home = () => {

  const [transactions, setTransactions] = useState([])
  const [editTransaction, setEditTransaction] = useState({})

  useEffect(() => {
    async function fetchData() {
      const data = await TransactionService.fetchAll()
      setTransactions(data.sort((a, b) => a.date > b.date ? -1 : 1))
    }
    fetchData()
  }, [])

  return (
    <div>
      <Container>
        <TransactionForm editTransaction={editTransaction} setEditTransaction={setEditTransaction} transactions={transactions} setTransactions={setTransactions} />
        <TransactionList setEditTransaction={setEditTransaction} transactions={transactions} setTransactions={setTransactions} />
      </Container>
    </div>
  )
}

export default Home
