import React, { useEffect, useState } from 'react'

import reservaService from '../services/reservaService'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReservaForm from '../componentes/ReservaForm.js'
import Calendar from '../componentes/Calendar'
import '../css/home.css'

const Calendario = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [reservas, setReservas] = useState([])
  
  useEffect(() => {
    reservaService
      .getAll()
      .then(initialReservas => {
        setReservas(initialReservas)
      })
  }, [])
  
  const addReserva = (newObject) => {
    reservaService
      .create(newObject)
      .then(newReserva => {
        setReservas(reservas.concat(newReserva))
      })
  }

  return (
    <>
      <div className='containe'>
        <Calendar />
        <Button variant='primary' onClick={handleShow} className='reservar'>
          RESERVAR
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <ReservaForm addReserva={addReserva} />
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default Calendario
