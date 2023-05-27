import React from 'react'
import {useState, useRef} from 'react'
import './s.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./font/Japanese3017-Eljn.ttf"
import './images/shrine.jpg'

export default function Signup() {
  let navigate = useNavigate()
  const confirmPassword = useRef()

  const [username, setUsername]=useState(null);
  const [email, setEmail]=useState(null);
  const [password, setPassword]=useState(null);
  const [confirm_password, setConfirm_password]=useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault()
  
    try {
        if (password !== confirm_password) {
            console.log("Passwords need to match!")
            confirmPassword.current.value=""
            alert("Password is not matching")
            return
        }

        const response = await axios.post(`http://localhost:8000/signup`, { username,email, password })


        const success = response.status === 201
        if (success) {
          navigate('/')
        window.location.reload()
        }

    } catch (error) {
        console.log(error)
        alert('User already exists')
    }

}

  return (
    <div className='signup'>
        <div className='signup__box'>
        <h1 className='cretae_accout__title'>Create account</h1>
        <form className='signup__form'>
          <input type={'text'} className='input__text' placeholder='Your nickname' required name='username' onChange={(e) => setUsername(e.target.value)}/><br/>
          <input type={'email'} className='input__text' placeholder="E-mail" required name='email' onChange={(e) => setEmail(e.target.value)}/><br/>
          <input type={'password'} className='input__text' placeholder='Password' required name='password' onChange={(e) => setPassword(e.target.value)}/><br/>
          <input type={'password'} ref={confirmPassword} className='input__text' placeholder='Confirm password' required name='confirm_password' onChange={(e) => setConfirm_password(e.target.value)}/><br/>
          <button type='submit'  className='submit__signup' onClick={handleSubmit}>Sign up</button>
        </form>
        </div>
    </div>
  )
}
