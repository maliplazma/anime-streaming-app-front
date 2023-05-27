import React from 'react'
import "./GenreButton.css"
import { useNavigate } from 'react-router-dom'

function GenreButton({genre}) {
  var navigate = useNavigate()

  const handleClick = () =>{
    navigate(`/genre/${genre}`)
  }

  return (
    <button className='genre__button' onClick={handleClick}>{genre}</button>
  )
}

export default GenreButton