import './style.css'
import '../../css/layout.css'
import '../../css/spacing.css'

import useTasksList from '../../hooks/useTasksList'

import InputMask from 'react-input-mask'

import { getDay } from 'date-fns'

function Modal() {
  const {
    setShowModal,
    loadTransactions,
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
    setTransacInEditing,
  } = useTasksList()
  async function handleSubmit() {
    if (!value || !category) {
      alert('Preencha os campos obrigatórios.')
      return
    }

    function formataData(date) {
      const arrayDate = date.split('/')
      const day = arrayDate[0]
      const month = arrayDate[1]
      const year = arrayDate[2]
      return new Date(year, month - 1, day)
    }
    try {
      const body = {
        date: !date ? new Date() : formataData(date),
        week_day: getDay(!date ? new Date() : formataData(date)),
        description,
        value,
        category,
        type: credit ? 'credit' : 'debit',
      }

      await fetch('http://localhost:3333/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      await loadTransactions()
      setValue('')
      setCategory('')
      setDate('')
      setDescription('')
    } catch (error) {
      console.log(error)
    }
  }

  async function handleEdit() {
    if (!value || !category || !description) {
      alert('Preencha os campos obrigatórios.')
      return
    }

    function formataData(date) {
      const arrayDate = date.split('/')
      const day = arrayDate[0]
      const month = arrayDate[1]
      const year = arrayDate[2]
      return new Date(year, month - 1, day)
    }
    try {
      const body = {
        date: !date ? new Date() : formataData(date),
        week_day: getDay(!date ? new Date() : formataData(date)),
        description,
        value,
        category,
        type: credit ? 'credit' : 'debit',
      }

      await fetch(`http://localhost:3333/transactions/${transacInEditing.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      await loadTransactions()
      setValue('')
      setCategory('')
      setDate('')
      setDescription('')
    } catch (error) {
      console.log(error)
    }
  }

  async function cleanModal() {
    setTransacInEditing(false)
    setValue('')
    setCategory('')
    setDate('')
    setDescription('')
    setDebit(true)
    setCredit(false)
    setShowModal(false)
  }

  return (
    <div className="modal">
      <div className="modal-container">
        <h1 className="modal-title">
          {transacInEditing ? 'Editando' : 'Adicionar'} Registro
        </h1>
        <img
          className="close-icon"
          src="close.svg"
          alt="close"
          onClick={() => cleanModal()}
        ></img>
        <div className="flex-row mt-5 mb-3">
          <button
            id="credit-button"
            className={
              credit ? 'button credit-button' : 'button inactive-credit-button'
            }
            onClick={() => {
              setCredit(!credit)
              setDebit(!debit)
            }}
          >
            Entrada
          </button>
          <button
            id="debit-button"
            className={
              debit ? 'debit-button button' : 'inactive-debit-button button'
            }
            onClick={() => {
              setCredit(!credit)
              setDebit(!debit)
            }}
          >
            Saída
          </button>
        </div>
        <label>
          Valor
          <input
            name="value"
            className="modal-input mb-2 mt-1"
            onChange={(e) => setValue(Number(e.target.value))}
            value={value}
          />
        </label>
        <label>
          Categoria
          <input
            name="category"
            className="modal-input mb-2 mt-1"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </label>
        <label>
          Data
          <InputMask
            mask="99/99/9999"
            name="date"
            className="modal-input mb-2 mt-1"
            alwaysShowMask={false}
            onChange={(e) => {
              setDate(e.target.value)
            }}
            value={date}
          />
        </label>
        <label>
          Descrição
          <input
            className="modal-input mb-2 mt-1"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </label>
        <button
          className="btn-insert"
          onClick={() => (transacInEditing ? handleEdit() : handleSubmit())}
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}

export default Modal
