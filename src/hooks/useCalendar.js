import { useState, useEffect } from 'react'
import reservaService from '../services/reservaService'

const daysShortArr = [
  'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'
]

const monthNamesArr = [
  'Enero', 'Febrero', 'Marzo', 'Abril',
  'Mayo', 'Junio', 'Julio', 'Agosto',
  'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const useCalendar = (daysShort = daysShortArr, monthNames = monthNamesArr) => {
  const today = new Date()
  const todayFormatted = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String((today.getDate())).padStart(2, '0')}`
  const [selectedDate, setSelectedDate] = useState(today)
  const selectedMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)
  const daysInMonth = selectedMonthLastDate.getDate()
  const firstDayInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay()
  const [reservas, setReservas] = useState([])

  let currentMonthCounter = 1

  useEffect(() => {
    reservaService
      .getAll()
      .then(initialReservas => {
        setReservas(initialReservas)
      })
  }, [1000])

  const habitaciones = ['C1', 'C2', 'C3', 'C4', 'D1B', 'D2B', 'D3B', 'D4B', 'D1A', 'D2A', 'D3A', 'D4A']

  const rows = 12
  const cols = daysInMonth
  const calendarRows = {}

  const daysInMon = []

  let x = firstDayInMonth
  while (daysInMon.length < daysInMonth) {
    if (x === 7) {
      x = 0
    }
    daysInMon.push(daysShortArr[x])
    x++
  }

  for (let i = 1; i < rows + 1; i++) {
    for (let j = 1; j < cols + 1; j++) {
      if (!calendarRows[i]) {
        calendarRows[i] = []
      }
      if (i >= 1) {
        calendarRows[i] = [...calendarRows[i], {
          classes: '',
          date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${(currentMonthCounter < 10 ? '0' : '') + currentMonthCounter}`,
          value: `${currentMonthCounter}`,
          reserva: `${reservas.map(reserva => {
            if (reserva.habitacion === habitaciones[i - 1] && reserva.fechaEntrada <= `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${(currentMonthCounter < 10 ? '0' : '') + currentMonthCounter}` && reserva.fechaSalida >= `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${(currentMonthCounter < 10 ? '0' : '') + currentMonthCounter}`) {
              return `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${(currentMonthCounter < 10 ? '0' : '') + currentMonthCounter}`
            } else {
            return '0'
          }
})}`
        }]
      }
      if (calendarRows[i].length >= daysInMonth) {
        currentMonthCounter = 0
      }
      currentMonthCounter++
    }
  }

  const getPrevMonth = () => {
    setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, prevValue.getDate()))
  }
  const getNextMonth = () => {
    setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, prevValue.getDate()))
  }

  return {
    daysShort,
    monthNames,
    todayFormatted,
    calendarRows,
    selectedDate,
    getPrevMonth,
    getNextMonth,
    daysInMon,
    habitaciones,
    reservas
  }
}

export default useCalendar
