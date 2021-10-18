import './style.css'
import '../../css/layout.css'
import '../../css/spacing.css'

import useTasksList from '../../hooks/useTasksList'

function Resume() {
  const { totalCredits, totalDebits, balance } = useTasksList()
  return (
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
  )
}

export default Resume
