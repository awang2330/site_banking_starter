import { useState } from "react"
import axios from "axios"
import "./AddTransaction.css"

export default function AddTransaction( {addTransaction}) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    description: "",
    category: "",
    amount: 0,
  })

  const handleOnChange = (event) => {
    setForm(f => ({...f, [event.target.name]: event.target.value}))
  }

  const handleOnSubmit = async (event) => {
    setIsProcessing(true)
    try {
      const res = await axios.post(`http://localhost:3001/bank/transactions`, {transaction: form})
      if (res?.data?.transaction) {
        addTransaction(res.data.transaction)
      }
    } catch(err) {
      setError(err)
    }

    setIsProcessing(false)
    setForm({
      description: "",
      category: "",
      amount: 0,
    })
  }
  return (
    <div className="AddTransaction">
      <h2>Add Transaction</h2>

      <div className="form">
        <div className="fields">
          <div className="field">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" placeholder="Enter a description..." value={form.description} onChange={handleOnChange}/>
          </div>
          <div className="field">
            <label htmlFor="category">Category</label>
            <input type="text" name="category" placeholder="Enter a category..." value={form.category} onChange={handleOnChange}/>
          </div>
          <div className="field" style={{ flex: 0.5 }}>
            <label htmlFor="amount" value={form.amount} onChange={handleOnChange}>Amount (cents) </label>
            <input type="number" name="amount" />
          </div>

          <button className="btn add-transaction" type="submit" onClick={handleOnSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
