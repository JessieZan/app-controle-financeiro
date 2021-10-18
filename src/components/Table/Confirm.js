import './style.css'
import '../../css/layout.css'
import '../../css/spacing.css'

import useTasksList from '../../hooks/useTasksList'

function Confirm({ transactionId, setShowConfirm }) {
  const { loadTransactions } = useTasksList()
  async function handleTransactionDelete(transactionID) {
    try {
      await fetch(`http://localhost:3333/transactions/${transactionID}`, {
        method: 'DELETE',
      })
      setShowConfirm(false)
      await loadTransactions()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex-column container-confirm-delete">
      Apagar Item?
      <div className="flex-row mt-1 gap-05">
        <button
          className="btn-actions-confirm-delete sim"
          onClick={() => {
            handleTransactionDelete(transactionId)
          }}
        >
          Sim
        </button>
        <button
          className="btn-actions-confirm-delete nao"
          onClick={() => setShowConfirm(false)}
        >
          Não
        </button>
      </div>
    </div>
  )
}

export default Confirm
