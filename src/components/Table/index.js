import './style.css'
import '../../css/layout.css'
import '../../css/spacing.css'

import useTasksList from '../../hooks/useTasksList'

import { useState } from 'react'
import { format } from 'date-fns'
import { useEffect } from 'react'

import Line from './Line'
import Head from './Head'

function Table() {
  const {
    transactions,
    setTransactions,
    setShowModal,
    transacInEditing,
    setValue,
    setCategory,
    setDate,
    setDescription,
    setCredit,
    setDebit,
    showModal,
  } = useTasksList()

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
        ordenaData={ordenaData}
        setOrdenaData={setOrdenaData}
        ordenaWeekDay={ordenaWeekDay}
        setOrdenaWeekDay={setOrdenaWeekDay}
        ordenaValue={ordenaValue}
        setOrdenaValue={setOrdenaValue}
      />
      <div className="table-body">
        {transactions.map((transaction) => (
          <Line transaction={transaction} />
        ))}
      </div>
    </div>
  )
}

export default Table
