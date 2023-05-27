import React from 'react'
import './Banner.css'
import { useNavigate } from 'react-router-dom'
import IconNavbar from './IconNavbar'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Banner({id, name, image, plot}) {
    var navigate = useNavigate()
    const handleWatch = () =>{
        navigate(`/anime/${id}`)
    }


  return (
    <header className='banner'
        style={{
            backgroundSize: "cover",
            backgroundImage: `url(${image})`,
            backgroundPosition: "center center"

        }}
    >
        <IconNavbar/>
        <div className='banner__content'>
            <h1 className='banner__title'>{name}</h1>
            <div className='banner__buttons'>
                <button className='play' onClick={handleWatch}><PlayArrowIcon/> Watch</button>
                {/* <button className='watchlist' onCack={handlePlay}>My List</button> */}
            </div>
            <h1 className='banner__description'>{plot}</h1>
        </div>

        <div className='banner__fadeBottom'></div>
    </header>
  )
}

export default Banner