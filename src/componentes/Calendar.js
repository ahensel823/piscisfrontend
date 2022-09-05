import React from 'react'
import useCalendar from '../hooks/useCalendar'
import '../css/Calendar.css'
import { styled } from '@mui/material/styles'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import Fade from '@mui/material/Fade'

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black
  }
}))

const Calendar = () => {
  const { daysInMon, calendarRows, selectedDate, monthNames, getNextMonth, getPrevMonth, habitaciones } = useCalendar()

  const dateClickHandler = date => {
    console.log(date)
  }

  // function Fechas (fechaEntrada, fe) {
  //   console.log(`${fechaEntrada.replace(/.{4}/g, '')}`)
  // }

  return (
    <>
      <div className='caja'>
        <p className='mes'>{`${monthNames[selectedDate.getMonth()]} - ${selectedDate.getFullYear()}`}</p>
        <table>
          <thead>
            <tr>
              <th />
              {daysInMon.map(day => (
                <th key={day.id} className='day'>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              Object.values(calendarRows).map((cols, index) => {
                return (
                  <tr key={cols.id} className={'a' + `${index}`}>
                    <td className='habitaciones'>{habitaciones[index]}
                    </td>
                    {cols.map(col => (
                      col.reserva === '0'
                        ? <BootstrapTooltip className='hover' TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={col.date}><td className='tablas' onClick={() => dateClickHandler(col.date)} /></BootstrapTooltip>
                        : col.reserva.match('-')
                          ? <BootstrapTooltip className='hover' TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={col.reserva.replace(/0,/g, '').replace(/,0/g, '')}><td className='reservado' onClick={() => dateClickHandler(col.reserva)} /></BootstrapTooltip>
                          : <td className='tablas' onClick={() => dateClickHandler(col.date)} />
                    ))}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className='buttons'>
          <button className='button' onClick={getPrevMonth}>Prev</button>
          <button className='button' onClick={getNextMonth}>Next</button>
        </div>
      </div>
    </>
  )
}

export default Calendar
