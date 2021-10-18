import './style.css'
import '../../css/layout.css'
import '../../css/spacing.css'

import useTasksList from '../../hooks/useTasksList'

import { useState, useEffect } from 'react'

function Button({ item, lista, title, filterStatus, setFilterStatus }) {
  const { filtroLimpo } = useTasksList()
  const [active, setActive] = useState(filtroLimpo)

  useEffect(() => {
    setActive(filtroLimpo)
  }, [filtroLimpo])

  function handleAddFilters(item) {
    setActive(!active)
    if (title === 'Dia da Semana')
      if (!filterStatus.week_days.includes(item)) {
        setFilterStatus({
          week_days: [...filterStatus.week_days, item],
          categories: [...filterStatus.categories],
          max_value: filterStatus.max_value,
          min_value: filterStatus.min_value,
        })
        console.log(filterStatus.week_days)
      } else {
        const newWeekDays = filterStatus.week_days.filter(
          (weekDay) => weekDay !== item,
        )
        setFilterStatus({ ...filterStatus, week_days: newWeekDays })
      }

    if (title === 'Categoria')
      if (!filterStatus.categories.includes(item)) {
        setFilterStatus({
          week_days: [...filterStatus.week_days],
          categories: [...filterStatus.categories, item],
          max_value: filterStatus.max_value,
          min_value: filterStatus.min_value,
        })
      } else {
        const newCategories = filterStatus.categories.filter(
          (category) => category !== item,
        )
        setFilterStatus({ ...filterStatus, categories: newCategories })
      }
    console.log(filterStatus)
  }

  return (
    <button
      className={`container-chip ${active && 'container-chip-active'}`}
      onClick={() =>
        title === 'Dia da Semana'
          ? handleAddFilters(lista.indexOf(item))
          : handleAddFilters(item)
      }
      id={lista.indexOf(item)}
    >
      {item}{' '}
      <img
        src={active ? './active.svg' : './inactive.svg'}
        alt="adicionar"
        width={active ? 15 : 10}
      />
    </button>
  )
}

function Filters({ title, lista, filterStatus, setFilterStatus }) {
  return (
    <div className="filter-containers">
      <h1 className="filter-title">{title}</h1>
      {lista.map((item) => {
        return (
          <Button
            item={item}
            lista={lista}
            title={title}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        )
      })}
    </div>
  )
}

function Filter({ showFiltro, setShowFiltro }) {
  const {
    loadDebits,
    loadCredits,
    diasDaSemana,
    categorias,
    transactions,
    setTransactions,
  } = useTasksList()
  const [max, setMax] = useState(0)
  const [min, setMin] = useState(0)

  const [noFilterTransactions, setNoFilterTransactions] = useState([
    ...transactions,
  ])
  const [filterStatus, setFilterStatus] = useState({
    week_days: [],
    categories: [],
    max_value: 0,
    min_value: 0,
  })

  useEffect(() => {
    setFilterStatus({
      ...filterStatus,
      max_value: max,
      min_value: min,
    })
  }, [min, max])

  function handleApplyFilters() {
    let transactionsFiltered = [...noFilterTransactions]

    if (filterStatus.week_days.length > 0) {
      transactionsFiltered = transactionsFiltered.filter((transaction) =>
        filterStatus.week_days.includes(transaction.week_day),
      )
    }

    if (filterStatus.categories.length > 0) {
      transactionsFiltered = transactionsFiltered.filter((transaction) =>
        filterStatus.categories.includes(transaction.category),
      )
    }
    console.log(transactionsFiltered)
    console.log(filterStatus.categories)

    if (max > 0) {
      transactionsFiltered = transactionsFiltered.filter(
        (transaction) => Number(max) >= Number(transaction.value),
      )
    }
    console.log(transactionsFiltered)
    if (min > 0) {
      transactionsFiltered = transactionsFiltered.filter(
        (transaction) => Number(min) <= Number(transaction.value),
      )
    }
    console.log(transactionsFiltered)
    setTransactions(transactionsFiltered)
    loadDebits(transactionsFiltered)
    loadCredits(transactionsFiltered)
  }

  function handleLimparFiltro() {
    setTransactions(noFilterTransactions)
    loadDebits(noFilterTransactions)
    loadCredits(noFilterTransactions)
    setShowFiltro(false)
  }

  return (
    <div className="container-filters flex-grow3">
      <Filters
        title="Dia da Semana"
        lista={diasDaSemana}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <Filters
        title="Categoria"
        lista={categorias}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <div className="flex-column justify-center pl-3">
        <h1 className="filter-title">Valor</h1>
        <label className="filter-label flex-column mb-2">
          Min
          <input
            id="min-value"
            type="text"
            className="filter-input"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
        </label>
        <label className="filter-label flex-column">
          Max
          <input
            id="max-value"
            type="text"
            className="filter-input"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </label>
        <button
          className="btn-clear-filters"
          onClick={() => handleLimparFiltro()}
        >
          Limpar Filtros
        </button>
        <button
          className="btn-apply-filters"
          onClick={() => handleApplyFilters()}
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  )
}

export default Filter
