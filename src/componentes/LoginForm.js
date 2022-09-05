import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Img from '../assets/logo.png'
import '../css/login.css'

export default function LoginForm (props) {
  return (
    <>
      <div className='login'>
        <h1 className='loginTitle'>Piscis</h1>
        <img src={Img} alt='img' className='logo' />
        <Form onSubmit={props.handleSubmit} className='form'>
          <div>
            <input
              className='input'
              type='text'
              value={props.username}
              name='Username'
              placeholder='Username'
              onChange={props.handleUsernameChange}
            />
          </div>
          <div>
            <input
              className='input'
              type='password'
              value={props.password}
              name='Password'
              placeholder='Password'
              onChange={props.handlePasswordChange}
            />
          </div>
          <Button type='submit' className='button'>
            Login
          </Button>
        </Form>
      </div>
    </>
  )
}
