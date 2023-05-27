import React from 'react'
import './Homepage.css'
import "./font/Japanese3017-Eljn.ttf"
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const authToken =false;


export default function Homepage() {
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate('/login');
  }

  const handleClick1 = () =>{
    navigate('/signup');
  }

  return (
    <div className='homepage'>
      <div className='welcome__div'>
        <h1 className='welcome'>Welcome to <br/> Sakura Mochi</h1>
        <button onClick={handleClick} className='login__button' >
          Log in
        </button>
        <button onClick={handleClick1} className='singup__button' >
          Create Account
        </button>
      </div>
    </div>
  )
}
