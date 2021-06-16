import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"

export default function Home( {transactions, transfers, addTransaction, isFetching, error, filterInputValue} ) {
  if (isFetching) return <h1>Fetching...</h1>
  if (error) return <p className="description">No transaction found</p>

  var filteredTransactions = (filterInputValue) ? transactions.filter(t=>t.description === filterInputValue)
  : transactions

  return (
    <div className="Home">
      <AddTransaction addTransaction={addTransaction}/>
      <BankActivity transactions={transactions} transfers={transfers} filteredTransactions={filteredTransactions}/>
    </div>
  )
}
