import './index.css'

import {useState} from 'react'

const TransactionForm = ({onAddTransaction}) => {
 const [type, setType] = useState('Add')
 const [amount, setAmount] = useState('')
 const [description, setDescription] = useState('')

 const handleSubmit = event => {
event.preventDefault()

    onAddTransaction(type,amount,description)

    setAmount('')
    setDescription('')
 }
 return (
    <div className="transaction-form-container">
        <h2 className="transaction-form-heading">
            Add Transaction
        </h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="transaction-type">
                Transaction Type
            </label>

            <select
            id="transaction-type"
            value={type}
            onChange={event =>setType(event.target.value)}
            >
                <option value="Add">Add Money</option>
                <option value="Spend">Spend Money</option>
            </select>

            <label htmlFor="amount">Amount</label>

            <input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={event => setAmount(event.target.value)}
            min="0.01"
            step="0.01"
            />
            <label htmlFor="description">Description</label>
            <input 
            id="description"
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={event => setDescription(event.target.value)}
            />
            <button type="submit">Submit transaction</button>
        </form>
    </div>
 )
}
export default TransactionForm 