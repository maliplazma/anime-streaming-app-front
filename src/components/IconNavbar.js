import React, {useRef, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './IconNavbar.css'
import "../font/Japanese3017-Eljn.ttf"
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@material-ui/core/IconButton";
import axios from 'axios'

export default function IconNavbar() {
   var navigate = useNavigate()
   const content = useRef()

   const [display, setDisplay]=useState([])
   const [animes, setAnimes] = useState()

   useEffect(() =>{
    const getAnimes = async(e) =>{
        try{
            const response = await axios.get(`http://localhost:8000/animes`)
            console.log(response.status)
            if(response.status===201){
                setAnimes(response.data)            
                setDisplay(response.data)

            }
        }catch(err){
            console.log(err)

        }
    }
    console.log('useEffect gotov')
    getAnimes()
}, [])
   
   const handleSignout = () =>{
       localStorage.setItem("token", null)
       localStorage.setItem("user_id", null)
       navigate('/')
  }

  const handleProfile = () =>{
      const id = localStorage.getItem("user_id")
      console.log(id)
      navigate(`/profile/${id}`)
  }

  const handleSearch = (event) =>{
    content.current.style.display="block";
    if(event.target.value.length==0){
      content.current.style.display="none";
      setDisplay(animes)
    }else{
        const filter=display.filter(a => a.english_name.toLowerCase().includes(event.target.value.toLowerCase()))
        setDisplay(filter)
    }
    
  }

  


  return (
    <div className="icon__navbar">
        <h3 className='sakura' onClick={()=>{navigate('/home')}}>SAKURA MOCHI</h3>
        
        <div className='options'>
        
        
        <div className='search'>
        <input type="text" className='search__text' placeholder="Search" onChange={handleSearch}/>
        <SearchIcon className='search__icon'/>
        <div className='search__content' ref={content}>
          {display.map(a => {
            return(
              <div onClick={() => navigate(`/anime/${a.anime_id}`)}>{a.english_name}</div>
            )
          })}
          
        </div>
        </div>
        

        <PermIdentityOutlinedIcon className='profile__icon' onClick={handleProfile}/>
        
        <div className="dropdown">
        <DensityMediumIcon className='dropdown__menu dropbtn'/>
        <div className="dropdown-content">
          <a href="/explore">Explore</a>
          <a href="/watchlist">Watchlist</a>
          <a  className='signout__dropdown' onClick={handleSignout} style={{color: "black"}}>Sign out</a>
        </div>
        </div>
        </div> 
    </div>


  )
}
