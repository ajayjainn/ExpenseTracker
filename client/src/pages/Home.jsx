import { useEffect, useState } from "react"
import TransactionService from '../requests/Transaction'
import TransactionForm from '../components/TransactionForm.jsx'
import TransactionList from '../components/TransactionList.jsx'
import { Container } from "@mui/material"
import TransactionChart from '../components/TransactionChart.jsx'
import { setTransactions } from "../reducers/transactionReducer"
import { useDispatch, useSelector } from "react-redux"

const Home = () => {

  const [chartData, setChartData] = useState([])
  const transactions = useSelector(state => state.transactions)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const transData = await TransactionService.fetchAll()
      const sortedTransaction = transData.sort((a, b) => a.date > b.date ? -1 : 1)
      dispatch(setTransactions(sortedTransaction))
    }
    fetchData()
  }, [])


  useEffect(() => {
    const data = {}
    transactions.forEach((trans) => {
      if (data[trans.category]) {
        data[trans.category] += trans.amount
      } else {
        data[trans.category] = trans.amount
      }
    })
    const keys = Object.keys(data)
    const temp = []

    keys.forEach((key) => {
      temp.push({ "Category": key, "Expense": data[key] })
    })

    setChartData(temp)
  },[transactions])




  return (
    <div>
      <Container>
        <TransactionChart chartData={chartData} />
        <TransactionForm />
        <TransactionList />
      </Container>
    </div>
  )
}

export default Home
