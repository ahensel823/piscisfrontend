import React, { useState } from 'react'

export default function ReservaForm (props) {
  const [values, setValues] = useState([{
    pasajeros: '',
    nombre: '',
    fechaEntrada: '',
    fechaSalida: '',
    habitacion: '',
    precio: ''
  }])

  const inputs = [
    {
      name: 'pasajeros',
      type: 'text',
      placeholder: 'Pasajeros'
    },
    {
      name: 'nombre',
      type: 'text',
      placeholder: 'Nombre'
    },
    {
      name: 'fechaEntrada',
      type: 'date',
      placeholder: 'Fecha de entrada'
    },
    {
      name: 'fechaSalida',
      type: 'date',
      placeholder: 'Fecha de salida'
    },
    {
      name: 'habitacion',
      type: 'text',
      placeholder: 'Habitacion'
    },
    {
      name: 'precio',
      type: 'text',
      placeholder: 'Precio'
    }
  ]

  const handleChange = (e) => {
    const value = e.target.value
    setValues({ ...values, [e.target.name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newObject = {
      pasajeros: values.pasajeros,
      nombre: values.nombre,
      fechaEntrada: values.fechaEntrada,
      fechaSalida: values.fechaSalida,
      habitacion: values.habitacion,
      precio: values.precio
    }
    props.addReserva(newObject)
    setValues({
      pasajeros: '',
      nombre: '',
      fechaEntrada: '',
      fechaSalida: '',
      habitacion: '',
      precio: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      {inputs.map((inputd, id) => (
        <input
          className='input'
          key={id}
          {...inputd}
          value={values[inputd.name]}
          onChange={handleChange}
        />
      ))}
      <button type='submit' className='submit'>ENVIAR</button>
    </form>
  )
}
