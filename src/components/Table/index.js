import './style.css'
import '../../css/layout.css'
import '../../css/spacing.css'

import { useState } from 'react'
import { format } from 'date-fns'
import { useEffect } from 'react'

function Head({
  transactions,
  loadTransactions,
  setTransactions,
  diasDaSemana,
  ordenaData,
  setOrdenaData,
  ordenaWeekDay,
  setOrdenaWeekDay,
  ordenaValue,
  setOrdenaValue,
}) {
  return (
    <div className="table-head flex-row justify-around ">
      <h3
        className="column-title"
        id="date"
        value="date"
        onClick={() => setOrdenaData(!ordenaData)}
      >
        Data{' '}
        <img
          alt="reverse"
          src={ordenaData ? 'arrow-down.svg' : 'arrow-up.svg'}
        ></img>
      </h3>
      <h3
        className="column-title"
        id="week-day"
        onClick={() => setOrdenaWeekDay(!ordenaWeekDay)}
      >
        Dia da Semana{' '}
        <img
          alt="reverse"
          src={ordenaWeekDay ? 'arrow-down.svg' : 'arrow-up.svg'}
        ></img>
      </h3>
      <h3 className="column-title">Descrição</h3>
      <h3 className="column-title">Categoria</h3>
      <h3
        className="column-title"
        id="value"
        onClick={() => setOrdenaValue(!ordenaValue)}
      >
        Valor{' '}
        <img
          alt="reverse"
          src={ordenaValue ? 'arrow-down.svg' : 'arrow-up.svg'}
        ></img>
      </h3>
    </div>
  )
}

function Line({
  transaction,
  loadTransactions,
  setTransacInEditing,
  setShowModal,
  transacInEditing,
  value,
  setValue,
  category,
  setCategory,
  date,
  setDate,
  description,
  setDescription,
  credit,
  setCredit,
  debit,
  setDebit,
  diasDaSemana,
}) {
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
      {showConfirm && (
        <Confirm
          loadTransactions={loadTransactions}
          setShowConfirm={setShowConfirm}
          transactionId={transaction.id}
        />
      )}
    </div>
  )
}

function Confirm({ loadTransactions, setShowConfirm, transactionId }) {
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

function Table({
  transactions,
  setTransactions,
  loadTransactions,
  setTransacInEditing,
  setShowModal,
  transacInEditing,
  value,
  setValue,
  category,
  setCategory,
  date,
  setDate,
  description,
  setDescription,
  credit,
  setCredit,
  debit,
  setDebit,
  showModal,
  diasDaSemana,
}) {
  // function formataData(date) {
  //   const arrayDate = date.split('/')
  //   const day = arrayDate[0]
  //   const month = arrayDate[1]
  //   const year = arrayDate[2]
  //   return new Date(year, month, day)
  // }
  const [ordenaData, setOrdenaData] = useState(false)
  const [ordenaWeekDay, setOrdenaWeekDay] = useState(false)
  const [ordenaValue, setOrdenaValue] = useState(false)

  useEffect(() => {
    handleReverseDate()
    setOrdenaWeekDay(false)
    setOrdenaValue(false)
  }, [ordenaData])

  useEffect(() => {
    handleReverseWeekDay()
    setOrdenaData(false)
    setOrdenaValue(false)
  }, [ordenaWeekDay])

  useEffect(() => {
    handleReverseValue()
    setOrdenaData(false)
    setOrdenaWeekDay(false)
  }, [ordenaValue])

  function handleReverseDate() {
    if (ordenaData) {
      setTransactions(
        transactions.sort((x, y) => {
          let a = new Date(x.date)
          let b = new Date(y.date)
          return a - b
        }),
      )
    } else {
      setTransactions(transactions.reverse())
    }
  }

  function handleReverseWeekDay() {
    if (ordenaWeekDay) {
      setTransactions(
        transactions.sort((x, y) => {
          let a = x.week_day
          let b = y.week_day
          return a - b
        }),
      )
    } else {
      setTransactions(transactions.reverse())
    }
  }

  function handleReverseValue() {
    if (ordenaValue) {
      setTransactions(
        transactions.sort((x, y) => {
          let a = x.value
          let b = y.value
          return a - b
        }),
      )
    } else {
      setTransactions(transactions.reverse())
    }
  }
  useEffect(() => {
    if (transacInEditing) {
      setShowModal(!showModal)
      setValue(transacInEditing.value)
      setCategory(transacInEditing.category)
      setDate(format(new Date(transacInEditing.date), 'dd/MM/yyyy'))
      setDescription(transacInEditing.description)
      if (transacInEditing.type === 'credit') {
        setCredit(true)
        setDebit(false)
      } else {
        setCredit(false)
        setDebit(true)
      }
    }
  }, [transacInEditing])
  return (
    <div className="table mt-5">
      <Head
        transactions={transactions}
        diasDaSemana={diasDaSemana}
        setTransactions={setTransactions}
        ordenaData={ordenaData}
        setOrdenaData={setOrdenaData}
        ordenaWeekDay={ordenaWeekDay}
        setOrdenaWeekDay={setOrdenaWeekDay}
        ordenaValue={ordenaValue}
        setOrdenaValue={setOrdenaValue}
      />
      <div className="table-body">
        {transactions.map((transaction) => (
          <Line
            transaction={transaction}
            loadTransactions={loadTransactions}
            setTransacInEditing={setTransacInEditing}
            setShowModal={setShowModal}
            value={value}
            setValue={setValue}
            category={category}
            setCategory={setCategory}
            date={date}
            setDate={setDate}
            description={description}
            setDescription={setDescription}
            credit={credit}
            setCredit={setCredit}
            debit={debit}
            setDebit={setDebit}
            diasDaSemana={diasDaSemana}
          />
        ))}
      </div>
    </div>
  )
}

export default Table
