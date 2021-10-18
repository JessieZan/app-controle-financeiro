import './style.css'
import '../../css/layout.css'
import '../../css/spacing.css'

import useTasksList from '../../hooks/useTasksList'

import { useState } from 'react'
import { format } from 'date-fns'

import Confirm from './Confirm'

function Line() {
  const { transaction, setTransacInEditing, diasDaSemana } = useTasksList()
  const [showConfirm, setShowConfirm] = useState(false)

  function formatWeekDay(dia) {
    for (let i = 0; i <= diasDaSemana.length; i++) {
      if (dia === i) {
        return diasDaSemana[i]
      }
    }
  }

  return (
    <div
      className="table-line flex-row justify-around gap-05"
      key={transaction.id}
    >
      <h3 className="line-items" id="date">
        {format(new Date(transaction.date), 'dd/MM/yyyy')}
      </h3>
      <h3 className="line-items" id="week-day">
        {formatWeekDay(transaction.week_day)}
      </h3>
      <h3 className="line-items">{transaction.description}</h3>
      <h3 className="line-items">{transaction.category}</h3>
      <h3
        className={`line-items ${
          transaction.type === 'credit' ? 'credit-value' : 'debit-value'
        }`}
        id="value"
      >
        R$ {transaction.value},00
      </h3>
      <div className="flex-row justify-between position">
        <img
          className="edit-icon"
          src="./editar.svg"
          alt="edit"
          width="20"
          onClick={() => setTransacInEditing(transaction)}
        ></img>
        <img
          className="delete-icon ml-2"
          src="./excluir.svg"
          alt="delete"
          width="20"
          onClick={() => setShowConfirm(!showConfirm)}
        ></img>
      </div>
      {showConfirm && <Confirm transactionId={transaction.id} />}
    </div>
  )
}

export default Line
