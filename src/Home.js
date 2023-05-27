import React,{useState, useEffect} from 'react'
import './Home.css'
import GenreCard from "./components/GenreCard"
import AnimeCard from './components/AnimeCard'
import "./font/Japanese3017-Eljn.ttf"
import axios from 'axios'
import Banner from './components/Banner'
import Loading from './components/Loading'
import MyFooter from './components/MyFooter'



export default function Home() {
  const [genres, setGenres] =useState([])
  const [topGenres, setTopGenres] =useState([])
  const [animes, setAnimes] = useState([])
  const [loading_genre, setLoadingGenre] = useState(true)
  const [loading_animes, setLoadingAnimes] = useState(true)
  const [topAnime, setTopAnime] = useState()
  
  useEffect(() =>{
    const getGenres = async(e) =>{
    try{
      const response = await axios.get("http://localhost:8000/genres");
      const status=response.status
      console.log(response.data)

      if(status===201 ){
        setGenres(response.data);
      }
      var tmp=[]
      for(let i=0;i<6;i++){
        tmp.push(response.data[i])
      }
      setTopGenres(tmp)
      setLoadingGenre(false)
    }
    catch(err){
      console.log(err)
    }
  };

  getGenres()

  },[])

  useEffect(() =>{
    const getAnimes = async(e) =>{
        try{
            const response = await axios.get("http://localhost:8000/animes")

            if(response.status ===201){
              setAnimes(response.data)
            }

            setTopAnime(response.data[1])
            setLoadingAnimes(false)

        }catch(err){
          console.log(err)
        }
    }

    
    getAnimes()

  },[])

  if(loading_genre || loading_animes) return <Loading/>

  return (
    <div className='home'> 
      
      
      
      <Banner id={topAnime.anime_id} name={topAnime.original_name} image={topAnime.horizontal_image} plot={topAnime.plot}/>
      
      
      <h4 className='popular__genres'>Popular genres</h4>
      <div className='container'>
        <div className='row'>
        {topGenres.map(g => {
          return(
          <div className='col-2 mt-4'>
            <GenreCard name={g.genre} image={g.image}/>
          </div>
          )
        })}
        </div>




        <h4 className='popular__animes'>Anime novelties</h4>
        <div className='row '>
          {animes.map( anime =>{
            return(
              <div className='col-3 mt-4'>
              <AnimeCard id={anime.anime_id} name={anime.english_name} image={anime.card_image} year={anime.year} genre={anime.genre}/>
              </div>
            )
          })}

        </div>

      </div>


          <MyFooter/>

    </div>
  )
}
