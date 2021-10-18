import './style.css'
import '../../css/layout.css'
import '../../css/spacing.css'

function Head({
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

export default Head
