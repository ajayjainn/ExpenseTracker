import { useEffect, useState } from "react"
import TransactionService from '../requests/Transaction'
import TransactionForm from '../components/TransactionForm.jsx'
import TransactionList from '../components/TransactionList.jsx'
import { Container } from "@mui/material"
import TransactionChart from '../components/TransactionChart.jsx'

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


  const data = {}
  const chartData = []
  if(transactions){

    transactions.forEach((trans)=>{
      if(data[trans.category]){
        data[trans.category]+=trans.amount
      }else{
        data[trans.category] = trans.amount
      }
    })

    const keys = Object.keys(data)

    keys.forEach((key)=>{
      chartData.push({"Category":key,"Expense":data[key]})
    })
    console.log(chartData);
  }

  return (
    <div>
      <Container>
        <TransactionChart chartData={chartData} />
        <TransactionForm editTransaction={editTransaction} setEditTransaction={setEditTransaction} transactions={transactions} setTransactions={setTransactions} />
        <TransactionList setEditTransaction={setEditTransaction} transactions={transactions} setTransactions={setTransactions} />
      </Container>
    </div>
  )
}

export default Home
