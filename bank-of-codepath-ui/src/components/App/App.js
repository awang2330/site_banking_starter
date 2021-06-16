import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import "./App.css"

export default function App() {
  const [isFetching, setIsFetching] = useState(false)
  const [errors, setErrors] = useState([])
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
          console.log(transactions)
        }
        if (transfers) {
          setTransfers(transfers)
          console.log(transfers)
        }
        
      } catch(err) {
        setErrors(originalErrors => [...originalErrors, err])
      }
    }
    setIsFetching(true)
    fetchTransactions()
    setIsFetching(false)

  }, []) //runs the useEffect only when the list changes (only once )

  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  )
}
