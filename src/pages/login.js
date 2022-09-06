import React, { useState } from 'react'

import loginService from '../services/loginService'
import LoginForm from '../componentes/LoginForm'
import Notification from '../componentes/Notification'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setErrorMessage('Usuario o contraseña incorrectas')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  function Link () {
    return (
      window.location.href = './calendario'
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user
        ? <Link />
        : <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />}
    </div>
  )
}

export default Login
