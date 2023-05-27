import React, {useState, useRef} from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  var navigate = useNavigate()
  const inputPassword = useRef()

  const [email, setEmail]=useState(null);
  const [password, setPassword]=useState(null);
  const [wrong, setWrong]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    try {
        console.log(email, " ", password)
        const response = await axios.post(`http://localhost:8000/login`, { email, password })
        console.log(response.data.token)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user_id', response.data.user_id)
        localStorage.setItem('is_admin', response.data.is_admin);
        

        if (response.status === 200 && response.data.is_admin=="true") {
          console.log("Je li admin", response.data.is_admin)
          navigate('/admin') 
          window.location.reload()
        }

        if (response.status === 200) {
          console.log("zass je uso odje ", response.data.is_admin)
          navigate('/home')  //ide na dashboard
          //window.location.reload()
        }

    } catch (error) {
        console.log(error)
        //window.location.reload()
        inputPassword.current.value=""
        setWrong(true);
        window.location.reload()
        
    }

}

  return (
    <div className="login">
      <div className="login__form__box"> 
      <h1 className='cretae_accout__title'>Login</h1>
      {wrong &&
      <div class="alert alert-danger">
      <strong>Wrong credentials!</strong> Try again.
    </div>}
        <form className='login__form'>
          <input type={'email'} className='input__text' placeholder="E-mail" required name='email' onChange={(e) => setEmail(e.target.value)}/><br/>
          <input type={'password'} className='input__text' placeholder='Password' ref={inputPassword} required name='password' onChange={(e) => setPassword(e.target.value)}/><br/>
          <button type='submit' className='submit__login' onClick={handleSubmit}>Log in</button>
        </form>

      </div>
    </div>
  )
}
