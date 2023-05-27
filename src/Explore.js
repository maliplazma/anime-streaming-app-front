import React, {useState, useEffect} from 'react'
import "./Explore.css"
import IconNavbar from './components/IconNavbar'
import Loading from './components/Loading'
import AnimeCard from './components/AnimeCard'
import axios from 'axios'
import MyFooter from './components/MyFooter'

function Explore() {
    const [animes, setAnimes] = useState()
    const [displayAnimes, setDisplayAnimes] = useState(null);
    const [genres, setGenres] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(true)

    useEffect(() =>{
        const getAnimes = async(e) =>{
            try{
                const response = await axios.get("http://localhost:8000/animes")
    
                if(response.status ===201){
                  setAnimes(response.data)
                  setDisplayAnimes(response.data)

                }
                setLoading(false)
    
            }catch(err){
              console.log(err)
            }
        }
    
        
        getAnimes()
    
      },[])

    useEffect(() =>{
        const getGenres = async(e) =>{
            try{
                const response = await axios.get("http://localhost:8000/genres")
    
                if(response.status ===201){
                  setGenres(response.data)
                  console.log(response.data)
                }
                setLoading1(false)
    
            }catch(err){
              console.log(err)
            }
        }
    
        
        getGenres()
    
      },[])

    const handleGenreChange = async(event) =>{
      if(event.target.value==="All"){
        setDisplayAnimes(animes);
      }else{
      const new_animes = animes.filter(s => s.genre.some(g => g==event.target.value))//prozeriti kroz anime ima li zanr
        setDisplayAnimes(new_animes) 
        console.log(new_animes)
      }
       
    }

    const handleSortChange = async(event) =>{
      if(event.target.value=="Year"){
        let tmp=displayAnimes
        tmp.sort((a,b) => parseInt(a.year)-parseInt(b.year))
        console.log(tmp)
        setDisplayAnimes(tmp)
        console.log("Sortirani", displayAnimes)
    }
    else if(event.target.value=="Name"){
      let tmp=displayAnimes
      tmp=tmp.sort((a,b) => a.english_name -b.english_name)
      console.log(tmp)
      setDisplayAnimes(tmp)
      console.log("Sortirani", displayAnimes)
    }
    else if(event.target.value=="Popularity"){
      let tmp=displayAnimes
      tmp.sort((a,b) => parseInt(a.numb_of_likes)-parseInt(b.numb_of_likes))
      console.log(tmp)
      setDisplayAnimes(tmp)
      console.log("Sortirani", displayAnimes)       
    }
    }

  if(loading || loading1) return <Loading/>

  return (
    <div className='explore'>
        <IconNavbar/>    

       
        <div className='row'>
          <div className='col-2 mb-5'>
            <select className='seasons' onClick={handleGenreChange} name='genre'>
              <option value="All">All genres</option>
                {genres.map(s =>{
                    return(
                        <option value={s.genre}>{s.genre}</option>
                    )
                })}
            </select>
          </div>

          <div className='col-2'>
            <select className='seasons' name="sort" onClick={handleSortChange}>
                  <option value="">Sort by</option>
                  <option value="Name">Name</option>
                  <option value="Year">Year</option>
                  <option value="Popularity">Popularity</option>
            </select>
          </div>
        </div>

        <div className='wrapper'>
        <div className='row '>
          {displayAnimes.map( anime =>{
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

export default Explore