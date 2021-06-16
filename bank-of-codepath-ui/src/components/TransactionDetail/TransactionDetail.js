import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { formatAmount, formatDate } from "../../utils/format"
import "./TransactionDetail.css"

export default function TransactionDetail() {
  const { transactionId } = useParams()
  const [transaction, setTransaction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTransactionById = async () => {
      setIsLoading(true)

      try {
        const res = await axios.get(`http://localhost:3001/bank/transactions/${transactionId}`)
        const transaction = res?.data?.transaction
        if (transaction) {
          setTransaction(transaction)
        }
      } catch (err) {
        setError(err)
      }

      setIsLoading(false)
    }

    fetchTransactionById()
  }, [transactionId])

  const renderTransactionContent = () => {
    if (isLoading) return <h1>Loading...</h1>
    if (error) return <p className="description">No transaction found</p>

    return (
      <>
        <p className="description">{transaction?.description}</p>
        <div className="meta">
          <p className={`amount ${transaction?.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction?.amount)}</p>
          <p className="date">{formatDate(transaction?.postedAt)}</p>
        </div>
      </>
    )
  }

  return (
    <div className="TransactionDetail">
      <div className="card">
        <div className="title">
          <h3>Transaction #{transactionId}</h3>
          <p className="category">{transaction?.category}</p>
        </div>

        {renderTransactionContent()}
      </div>
    </div>
  )
}
