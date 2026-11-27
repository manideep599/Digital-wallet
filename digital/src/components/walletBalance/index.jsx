import './index.css'

const WalletBalance =({balance}) => {
       return (
        <div className="wallet-balance-container">
            <h2 className="wallet-balance-heading">
                Wallet Balance
            </h2>
            <p className="wallet-balance-amount">
                ₹{balance.toFixed(2)}
            </p>
        </div>
       )
}
export default WalletBalance