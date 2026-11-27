
import {useState, useEffect} from 'react'

import WalletBalance from './components/walletBalance'
import TransactionForm from './components/transactionForm'
import TransactionHistory from './components/transactionHistory'
import './App.css'

const App =()=>{ 
  //walletBalance 
  const [balance,setBalance] = useState(()=>{
  const savedBalance = localStorage.getItem('walletBalance')
  return savedBalance !== null ? Number(savedBalance) : 0
  })
  
  //transactionHistory
  const [transactions, setTransactions] = useState(()=>{
  const savedtransactions =localStorage.getItem('walletTransactions')
  return savedtransactions !== null ? JSON.parse(savedtransactions):[]
  })

  //transaction filter
  const [filter, setFilter] = useState('All')
  const [message, setMessage] = useState('')

  useEffect(()=>{
    localStorage.setItem('walletBalance', balance)
    localStorage.setItem('walletTransactions', JSON.stringify(transactions))
  },[balance,transactions])

    //handle trasactions
    const handleTransaction = (type, amount, description)=>{
      const enteredAmount = Number(amount)
      if (!Number.isFinite(enteredAmount) || enteredAmount <=0){
        setMessage('Please enter a valid amount')
        return 
      }
        if (!description.trim()){
          setMessage('Please enter a description')
          return
        }


      if(type === 'Spend' && enteredAmount > balance){
        setMessage('Insufficient walletBalance!')
          return
      }
      const updateBalance = type ==='Add' ? balance + enteredAmount : balance - enteredAmount

      const newTransaction = {
        id: Date.now(),
        type,
        amount: enteredAmount,
        description: description.trim(),
        date: new Date().toLocaleString(),
      }
      setBalance(updateBalance)
      setTransactions(previousTransactions => 
        [newTransaction, ...previousTransactions,

        ])
      setMessage('Transaction Sucessfull!')
    }
    //filter transactions
    const filteredTransactions = transactions.filter((transaction) => {
      return filter === 'All' || transaction.type === filter
    })

    return (
      <div className="app-container">
        <h1 className="app-heading">Digital Wallet</h1>
        <WalletBalance balance={balance} />

        <TransactionForm
        onAddTransaction={handleTransaction} />

        {message && <p>{message}</p>}

        <div>
          <label htmlFor="transaction-filter">Filter transaction: </label>
          <select
          id="transaction-filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            >
          <option value="All">All</option>
          <option value="Add">Add</option>
          <option value="Spend">Spend</option>  
          </select>    
        </div>

        <TransactionHistory transactions={filteredTransactions} /> 
        </div>
    )
}

export default App