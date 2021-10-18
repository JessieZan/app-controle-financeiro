import './App.css'
import '../src/css/layout.css'
import '../src/css/spacing.css'
import Header from './components/Header'
import Filter from './components/Filter'
import Table from './components/Table'
import Modal from './components/Modal'
import Resume from './components/Resume'

import { TasksListProvider } from '../src/contexts/TasksListContext'

import useTasksList from '../src/hooks/useTasksList'
import { useState } from 'react'

function App() {
  const [showFiltro, setShowFiltro] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="App">
      <TasksListProvider>
        {showModal && (
          <Modal showModal={showModal} setShowModal={setShowModal} />
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
                <Filter showFiltro={showFiltro} setShowFiltro={setShowFiltro} />
              )}

              {<Table setShowModal={setShowModal}/>}
            </div>
            <div className="flex-column">
              <Resume />
              <button className="btn-add" onClick={() => setShowModal(true)}>
                Adicionar Registro
              </button>
            </div>
          </div>
        </div>
      </TasksListProvider>
    </div>
  )
}

export default App
