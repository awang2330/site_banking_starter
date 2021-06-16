import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import "./App.css"

export default function App() {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [filterInputValue, setfilterInputValue] = useState()
  const [transactions, setTransactions] = useState([])
  const [transfers, setTransfers] = useState([])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const resTransactions = await axios.get("http://localhost:3001/bank/transactions")
        const resTransfers = await axios.get("http://localhost:3001/bank/transfers")
        const transactions = resTransactions?.data?.transactions // checks each part and returns null if error 
        const transfers = resTransfers?.data?.transfers
        if (transactions) {
          setTransactions(transactions)
        }
        if (transfers) {
          setTransfers(transfers)
        }
        
      } catch(err) {
        setError(err)
      }
    }
    setIsFetching(true)
    fetchTransactions()
    setIsFetching(false)

  }, []) // runs the useEffect only when the list changes (only once)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home transactions={transactions} transfers={transfers}/>}/>
          <Route path="/transactions/:transactionId" element={<TransactionDetail/>}/>
          <Route path="/transfer/:transferId" element={<TransactionDetail/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
