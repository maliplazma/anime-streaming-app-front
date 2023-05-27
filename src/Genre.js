import React, {useState,  useEffect} from 'react'
import './Genre.css'
import IconNavbar from './components/IconNavbar'
import Loading from './components/Loading'
import axios from 'axios'
import AnimeCard from './components/AnimeCard'
import { useParams, useNavigate } from 'react-router-dom'
import MyFooter from './components/MyFooter'

function Genre() {
    var navigate = useNavigate()
    const [animes, setAnimes]=useState()
    const [loading, setLoading] = useState(true)
    const name = useParams()
    console.log(name.name)

    useEffect(() =>{
        const getAnimes = async(e) =>{
            try{
                const response = await axios.get(`http://localhost:8000/genre?id=${name.name}`)
    
                if(response.status ===200){
                  setAnimes(response.data)
                  setLoading(false)
                  console.log(response.data)
                }
                
    
            }catch(err){
              console.log(err)
            }
        }
    
        
        getAnimes()
    
      },[])

      if(loading) return <Loading/>

      const handleClick = () =>{
        navigate(`/explore`)
      }

  return (
    <div className='explore'>
        <IconNavbar/>

        <button className='seasons' onClick={handleClick}>Explore</button>

        <div className='row'>
          <p className='m-5'>{animes.length} results loaded</p>
        </div>

        <div className='wrapper'>
        <div className='row '>
          {animes.map( anime =>{
            return(
              <div className='col-3 mt-4'>
              <AnimeCard key={anime.anime_id} id={anime.anime_id} name={anime.english_name} image={anime.card_image} year={anime.year} genre={anime.genre}/>
              </div>
            )
          })}
        </div>
        </div>

        <MyFooter/>


    </div>
  )
}

export default Genre