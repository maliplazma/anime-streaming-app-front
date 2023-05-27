import React from 'react'
import "./AnimeCard.css"
import {useNavigate} from 'react-router-dom'

function AnimeCard({id, name, image, year="", genre=""}) {
  var navigate = useNavigate()

  if(genre!="")
    var par = year + " " + genre[0] + ", " + genre[1] + "..."
  

  const handleClick = () =>{
    navigate(`/anime/${id}`)
  }

  return (
    <div className='anime__card' onClick={handleClick}>
        <img src={image} className='anime__image'/>
        <h6 className='text-left mb-0'>{name}</h6>
        {genre!="" && <p className='text-left mt-0 par'>{par}</p>}

    </div>
  )
}

export default AnimeCard