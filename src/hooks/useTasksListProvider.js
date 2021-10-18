import { useState, useEffect } from 'react'

function useTasksListProvider() {
  const [transactions, setTransactions] = useState([])
  const [transactionsOriginal, settransactionsOriginal] = useState([])
  const [transacInEditing, setTransacInEditing] = useState(false)
  const [value, setValue] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [credit, setCredit] = useState(false)
  const [debit, setDebit] = useState(true)

  const [credits, setCredits] = useState([])
  const [debits, setDebits] = useState([])

  const [totalCredits, setTotalCredits] = useState(0)
  const [totalDebits, setTotalDebits] = useState(0)

  const [balance, setBalance] = useState(0)

  const [categorias, setCategorias] = useState([])

  const [diasDaSemana, setDiasDaSemana] = useState([
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ])

  useEffect(() => {
    loadTransactions()
  }, [])

  useEffect(() => {
    setTotalCredits(credits.reduce((total, item) => total + item.value, 0))
    setTotalDebits(debits.reduce((total, item) => total + item.value, 0))
    setBalance(totalCredits - totalDebits)
  }, [credits, debits])

  useEffect(() => {
    setBalance(totalCredits - totalDebits)
  }, [totalCredits, totalDebits])

  async function loadCategories(transactions) {
    const newCategories = transactions.map(
      (transaction) => transaction.category,
    )
    const uniqueCategories = [...new Set(newCategories)]
    setCategorias(uniqueCategories)
  }

  async function loadCredits(transactions) {
    setCredits(
      transactions.filter((transaction) => transaction.type === 'credit'),
    )
  }

  async function loadDebits(transactions) {
    setDebits(
      transactions.filter((transaction) => transaction.type === 'debit'),
    )
  }

  async function loadTransactions() {
    try {
      const response = await fetch('http://localhost:3333/transactions', {
        method: 'GET',
      })
      const data = await response.json()
      setTransactions(data)
      settransactionsOriginal(data)
      loadCredits(data)
      loadDebits(data)
      loadCategories(data)
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  }
  return {
    transactions,
    setTransactions,
    transactionsOriginal,
    settransactionsOriginal,
    transacInEditing,
    setTransacInEditing,
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
    credits,
    setCredits,
    debits,
    setDebits,
    totalCredits,
    setTotalCredits,
    totalDebits,
    setTotalDebits,
    balance,
    setBalance,
    categorias,
    setCategorias,
    diasDaSemana,
    setDiasDaSemana,
    loadCategories,
    loadCredits,
    loadDebits,
    loadTransactions,
  }
}

export default useTasksListProvider
