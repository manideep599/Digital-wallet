import './index.css'

const TransactionHistory =({transactions}) => {
    return (
    <div className="transaction=history-container">
        <h className="transaction=history-heading">
            Transaction History
        </h>

        {transactions.length === 0 ? (
            <p className="no-transaction">No Transactions Found</p>
        ):(
            <ul className="transaction-list">
                {transactions.map(eachtransaction => (
                    <li
                    key={eachtransaction.id}
                    className="transaction-item"
                    >
                    <div>
                        <h3>{eachtransaction.description}</h3>
                        <p>{eachtransaction.date}</p>
                        <p>{eachtransaction.type}</p>
                    </div>
                    <p 
                    className={eachtransaction.type === 'Add' ? 'add-amount' : 'spend-amount'}>
                        {eachtransaction.amount.toFixed(2)}
                    </p>
                    </li>
                ))}
            </ul>
        )}
    </div>
    )
}
export default TransactionHistory