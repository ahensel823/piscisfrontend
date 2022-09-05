import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import Calendario from '../pages/calendario.js'

function Rutas () {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/calendario' element={<Calendario />} />
      </Routes>
    </Router>
  )
}

export default Rutas
