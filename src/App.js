import './App.css'
import '../src/css/layout.css'
import '../src/css/spacing.css'
import Header from './components/Header'
import Filter from './components/Filter'
import Table from './components/Table'
import Modal from './components/Modal'

import { useState, useEffect } from 'react'

function App() {
  const [showFiltro, setShowFiltro] = useState(false)
  const [showModal, setShowModal] = useState(false)
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
    // loadCredits(transactions)
    // loadDebits(transactions)
  }, [])

  useEffect(() => {
    setTotalCredits(credits.reduce((total, item) => total + item.value, 0))
    setTotalDebits(debits.reduce((total, item) => total + item.value, 0))
    setBalance(totalCredits - totalDebits)
  }, [credits, debits])

  useEffect(() => {
    setBalance(totalCredits - totalDebits)
  }, [totalCredits, totalDebits])

  // useEffect(() => {
  //   setShowModal(true)
  // }, [transacInEditing])

  async function loadCategories(transactions) {
    console.log(categorias)
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

  return (
    <div className="App">
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          loadTransactions={loadTransactions}
          transacInEditing={transacInEditing}
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
          showModal={showModal}
          setTransacInEditing={setTransacInEditing}
        />
      )}
      <Header />
      <div className="container">
        <button
          className="open-filters-button"
          onClick={() => setShowFiltro(!showFiltro)}
        >
          <img src="./filtro.svg" alt="Logo" width="25" />
          Filtrar
        </button>
        <div className="flex-row">
          <div className="flex-column">
            {showFiltro && (
              <Filter
                diasDaSemana={diasDaSemana}
                categorias={categorias}
                transactions={transactions}
                setTransactions={setTransactions}
                loadCredits={loadCredits}
                loadDebits={loadDebits}
                setShowFiltro={setShowFiltro}
              />
            )}

            {
              <Table
                transactions={transactions}
                setTransactions={setTransactions}
                loadTransactions={loadTransactions}
                setTransacInEditing={setTransacInEditing}
                setShowModal={setShowModal}
                transacInEditing={transacInEditing}
                showModal={showModal}
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
            }
          </div>
          <div className="flex-column align-center">
            <div className="flex-column container-resume p-4">
              <h1 className="resume-title">Resumo</h1>
              <div className="flex-row align-center justify-between">
                <h2>Entradas</h2>
                <span className="in">R$ {totalCredits},00</span>
              </div>
              <div className="flex-row align-center justify-between">
                <h2>Saídas</h2>
                <span className="out">R$ {totalDebits},00</span>
              </div>
              <div className="flex-row align-center justify-between balance-title mt-3">
                <h2>Saldo</h2>
                <span className="balance">R$ {balance},00</span>
              </div>
            </div>
            <button className="btn-add" onClick={() => setShowModal(true)}>
              Adicionar Registro
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
