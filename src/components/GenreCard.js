import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./GenreCard.css"

function GenreCard({name, image}) {
  var navigate = useNavigate()

  const handleClick = () =>{
    navigate(`/genre/${name}`)
  }

  return (
    <div className='genre__card' style={{backgroundImage: `url("${image}")`}} onClick={handleClick}>
        {/* <img src={image} className='genre__image'/> */}
        <h6 className='genre__name'>{name}</h6>
    </div>
  )
}

export default GenreCard