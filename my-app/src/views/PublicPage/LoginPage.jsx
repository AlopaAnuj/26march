import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Card } from "@mui/material";
import Header from './Header';
import Footer from './Footer';

const Login = (props) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    // Set initial error values to empty
    setUserNameError('')
    setPasswordError('')

    // Check if the user has entered both fields correctly
    if ('' === userName) {
      setUserNameError('Please enter your userName')
      return
    }

    // if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userName)) {
    //   setUserNameError('Please enter a valid userName')
    //   return
    // }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
    logIn()

  }


  const logIn = () => {
    fetch('/api/userauthservice/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.acessToken) {
          localStorage.setItem('user', JSON.stringify({ userName, role: r.role, acessToken: r.acessToken }))
          props.setLoggedIn(true)
          props.setUserName(userName)
          if (r.role === 1) {
            navigate('/adminhome')

          } else if (r.role === 2) {
            navigate('/userhome')
          }
        } else {
          window.alert('Wrong username or password')
        }
      })
  }
  return (
    <div>
      <Header />
      <div className={'publicmaincontainer'}>
        <Card className='logincard'>
        <div className={'titleContainer'}>
          <Typography style={{ fontSize: "40px", fontWeight: 700, color: "#551A8B" }}>Login</Typography>
        </div>
        <br />
        <div className={'inputContainer'}>
          <label>{"Username:"}</label>
          <input
            value={userName}
            placeholder="Enter your username here"
            onChange={(ev) => setUserName(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{userNameError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <label>{"Password:"}</label>
          <input
            value={password}
            type={"password"}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={'inputContainer'} style={{marginLeft:"125px"}}>
          <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
        </div>
        </Card>
      </div>
      <Footer />
    </div>
  )
}

export default Login